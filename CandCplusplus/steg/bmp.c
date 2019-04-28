#include "bmp.h"


int Is_BMPHeader_Valid(BMPHeader* header, FILE *fptr) {
  if(header->offset != BMP_HEADER_SIZE) {
    return(0);
  }
  if(header->DIB_header_size != DIB_HEADER_SIZE) {
    return(0);
  }
  if(header->planes != 1) {
    return(0);
  }
  if(header->compression != 0) {
    return(0);
  }
  if(header->ncolours != 0 || header->importantcolours != 0) {
    return(0);
  }
  if(!(header -> bits==16 || header -> bits ==24))
  {
    return(0);
  }
  if(header->imagesize != header->size - header->offset) {
    return(0);
  }
  int file_pos = ftell(fptr);
  if(fseek(fptr, 0, SEEK_END) != 0)
  {
    return(0);
  }
  int file_size= ftell(fptr);
  if(fseek(fptr, file_pos, SEEK_SET) != 0) {
    return(0);
  }
  if(file_size != header->size) {
    return(0);
  }
  int rows = (header->width * header->bits)/8;
  if(rows * header->height != header->imagesize)
  {
    return(0);
  }
	return(1);
}


BMPImage *BMP_Open(const char *filename) {
  //open file
  //read file
  FILE *fptr = fopen(filename,"r");
	
  //Allocate memory for BMPImage*;
  BMPImage *bmpImage = (BMPImage *)malloc(sizeof(BMPImage));
  
  //check for memory allocation errors
  if(bmpImage == NULL)
  {
    fclose(fptr);
    return(NULL);
  }
	
  //Read the first 54 bytes of the source into the header
  int read_size = fread(&(bmpImage->header), sizeof(char), 54, fptr);

  //Compute data size, width, height, and bytes per pixel;
  //check for any error while reading
  if(read_size < 54)
  {
    fclose(fptr);
    return(NULL);
  }
  //check if the header is valid

  Is_BMPHeader_Valid(&(bmpImage->header), fptr);
  
  int size = sizeof(unsigned char)*((int)(bmpImage->header).imagesize);
  bmpImage->data = (unsigned char*)malloc(size);
  if(bmpImage->data==NULL)
  {
    fclose(fptr);
    return(NULL);
  }
  // read in the image data
  int read_length = fread(bmpImage->data, size,1,fptr);
  fclose(fptr); 
  //check for error	
  if(read_length != 1)
  {
    return(NULL);
  }
  //free(bmpImage->data);
  return bmpImage;
}


int BMP_Write(const char * outfile, BMPImage* image)
{
  //open file and check for error
  FILE *fptr = fopen(outfile, "w");
	
  //check error for writing
  if(fptr == NULL)
  {
    return(EXIT_FAILURE);
  }

  int writeLength = fwrite(&(image->header), sizeof(BMPHeader), 1, fptr);
  if(writeLength != 1)
  {
    fclose(fptr);
    return(EXIT_FAILURE);
  }
  writeLength= fwrite(image->data, sizeof(unsigned char), image->header.imagesize, fptr);
  if(writeLength != (image->header).imagesize)
  {
    fclose(fptr);
    return(EXIT_FAILURE);
  }
  fclose(fptr);
  return 1;
}

void BMP_Free(BMPImage* image) {
	//free image if image is true
  if(image!=NULL)
  {
    if(image->data!=NULL)
    {
      free(image->data);
    }
    free(image);
  }
}


//*************PIXEL*MANIPULATION**************
int randPixel(BMPImage* image){ //return a random pixel
	int height = rand() % (image ->header).height;
	int width = rand() % (image ->header).width;
	return(height* width * 3);
}

char readPixel(BMPImage* image, int read){ //read in the pixel
	char out = 0;
	char temp = 0;
	int i;
	for( i = 2; i >= 0; i--){
		temp = image->data[read+(2-i)];
		temp = temp % 4; //get last 2 bits
		out = out | (temp << (i *2 + 1));
	}
	return(out);
}

void copyData(BMPImage* inImage, BMPImage* outImage){
	int i;
	for(i = 0; i< 3 *(inImage->header).height * (inImage->header).width; i++){
		outImage->data[i] = inImage->data[i];
	}
}

void writePixel(char inChar, int read, BMPImage* outImage){ //write to the pixel
	int i;
	char temp;
	for(i = 2; i>=0;i--){
		temp = ((3<<(2*i)) & inChar)>>(2*i); //get 2 bits of the in char
		outImage->data[read+(2-i)] -= outImage->data[read+(2-i)] % 4; //remove last 2 bits
		outImage->data[read+(2-i)] = outImage->data[read+(2-i)] | temp; //copy in last 2 bits
	}
}

