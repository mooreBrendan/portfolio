#include "main.h"

static void getSections(unsigned char, unsigned char*, unsigned char*, unsigned char*);


/********************************************************************

function name: Is_BMPHeader_Valid

function inputs: 	1) BMPHeader* header: the bmp header to be checked
									2) FILE* fptr: the image file for checking

function purpose: checks if the file is a valid bmp image

function return: bool if valid

********************************************************************/
static int Is_BMPHeader_Valid(BMPHeader* header, FILE *fptr) {
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


/********************************************************************

function name: BMP_Open

function inputs: 	1) char* filename: the input bmp file to be opened

function purpose: opens the bmp file

function return: struct of the bmp image

********************************************************************/
BMPImage *BMP_Open(const char *filename) {
  //open file
  //read file
  FILE *fptr = fopen(filename,"r");
	if(fptr == NULL){
		return(NULL);
	}

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
		free(bmpImage);
    return(NULL);
  }
  //check if the header is valid

  if(!Is_BMPHeader_Valid(&(bmpImage->header), fptr)){	
    fclose(fptr);
		free(bmpImage);
		return(NULL);
	}
  
  int size = sizeof(unsigned char)*((int)(bmpImage->header).imagesize);
  bmpImage->data = (unsigned char*)malloc(size);
  if(bmpImage->data==NULL)
  {
    fclose(fptr);
		free(bmpImage);
    return(NULL);
  }
  // read in the image data
  int read_length = fread(bmpImage->data, size,1,fptr);
  fclose(fptr); 
  //check for error	
  if(read_length != 1)
  {
		free(bmpImage);
    return(NULL);
  }
  //free(bmpImage->data);
  return bmpImage;
}


/********************************************************************

function name: BMP_Write

function inputs: 	1) char* outfile: the output file to be written to
									2) BMPImage* image: the image that will be written

function purpose: writes the bmp image to the output file

function return: success value

********************************************************************/
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

/********************************************************************

function name: BMP_Free

function inputs: 	1) BMPImage* image: the image to be freed

function purpose: frees the bmp image

function return: nothing

********************************************************************/
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


//****************************************PIXEL*MANIPULATION*****************************************

/********************************************************************

function name: copyData

function inputs: 	1) BMPImage* inImage: the original image
									2) BMPImage* outImage: the image to be made into a copy

function purpose: copys the image from input into output

function return: nothing

********************************************************************/
void copyData(BMPImage* inImage, BMPImage* outImage){
	int i;
	for(i = 0; i< 3 *(inImage->header).height * (inImage->header).width; i++){
		outImage->data[i] = inImage->data[i];
	}
}


/********************************************************************

function name: randPixel

function inputs: 	1) BMPImage* image: the image file
									2) unsigned char* pixels: the array of pixels that have been edited

function purpose: finds a random pixel that has not previously been chose

function return: a random pixel

********************************************************************/
unsigned int randPixel(BMPImage* image, unsigned char* pixels){ //return a random pixel
	unsigned int index;
	int tries = 0;
	
	do{
		tries++;
		unsigned int height = rand() % (image ->header).height;
		unsigned int width = rand() % (image ->header).width;
		index = height * (image->header).width + width;
	}while(pixels[index] != 0 && tries != ATTEMPT_LIMIT);
	
	if(tries != ATTEMPT_LIMIT){
		pixels[index] = 1;
		return(index);	
	}else{
		return(0);
	}
}

/********************************************************************

function name: readPixel

function inputs: 	1) BMPImage* image: the image file to be read from
									2) unsigned int read: the pixel index to be read
									3) unsigned char* out: the character that was read

function purpose: reads the character encoded in the given pixel

function return: the character that was read fromt the pixel

********************************************************************/
unsigned char readPixel(BMPImage* image, unsigned int read, unsigned char* out){ //read in the pixel
	unsigned char temp = 0;
	unsigned char mask = 0x07;
	*out = 0;
	
	int i;
	for( i = 2; i >= 0; i--){
		temp = mask & image->data[read+i]; //get last 3 bits
		*out |= (temp << ((2-i) *3)); //move parity bit into position
	}
	temp >>= 2; //get just parity bit
	return(temp);//return read status (1: read, 0: didn't read)
}

/********************************************************************

function name: writePixel

function inputs: 	1) unsigned char inChar: the character to write to the file
									2) unsigned int read: the pixel index that will be written to
									3) BMPImage* outImage: the image file

function purpose: writes the given character into the given pixel

function return: nothing

********************************************************************/
void writePixel(unsigned char inChar, unsigned int read, BMPImage* outImage){ //write to the pixel
	int i;
	unsigned char red = 0;
	unsigned char green = 0;
	unsigned char blue = 0;
	getSections(inChar, &red, &green, &blue);
	for(i = 0; i< 3;i++){
		outImage->data[read + i] -= (outImage->data[read + i]) % 8;//remove last 3 bits
	}
	outImage->data[read] += red; //add in each section
	outImage->data[read+1] += green;
	outImage->data[read+2] += blue;
}

/********************************************************************

function name: getSections

function inputs: 	1) unsigned char inChar: the input character to be split up
									2) unsigned char* red: the red section
									3) unsigned char* green: the green section
									4) unsigned char* blue: the blue section

function purpose: splits up the input character into three sections

function return: nothing

********************************************************************/
static void getSections(unsigned char inChar, unsigned char* red, unsigned char* green, unsigned char* blue){
	unsigned char mask = 0xc0;
	(*red) = mask & inChar; //get 2 most significant bits
	(*red) >>= 6;//move to least significant
	(*red) |= 0x04; //move parity to position

	mask = 0x38; //get 3 middle bits
	(*green) = mask & inChar; //copy bits
	(*green) >>= 3; //move to least significan

	mask = 0x07; //get 3 least significant
	(*blue) = mask & inChar; //copy bits
}
