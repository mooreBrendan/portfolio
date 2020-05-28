#include "main.h"


/********************************************************************

function name: decode

function inputs: 	1) char* inPic: the character string of the name of the input image file
									2) char* outMess: the character string of the name of the output text file

function purpose: decodes the given image to reveal the hidden message

function return: nothing

********************************************************************/
void decode(char* inPic, char* outMess){
	//initialize files
	BMPImage* fIN = BMP_Open(inPic);
	if(fIN == NULL){
		printf("Couldn't open input file\n");
		return;
	}
	FILE* fOUT = fopen(outMess, "w");
	if(fOUT == NULL){
		printf("couldn't open output file\n");
		BMP_Free(fIN);
		return;
	}
	
	//initialize list of pixels
	unsigned char* pixels = malloc(sizeof(char) * fIN->header.imagesize);
	if(pixels == NULL){
		fclose(fOUT);
		BMP_Free(fIN);
		return;
	}
	int i;
	for(i =0; i< fIN->header.imagesize;i++){
		pixels[i] = 0;
	}

	//read image
	unsigned char temp;
	unsigned int index;
	unsigned char readNum;
	do{
		index = randPixel(fIN, pixels);
		if(index == 0){
			printf("failed to find available pixel\n");
			temp = 0;
		}else{
			readNum = readPixel(fIN, index*3, &temp);
			if(readNum != 1){
				printf("read invalid pixel\n");
				temp = 0;
			}else if(temp != 0){
				fprintf(fOUT, "%c", temp);
			}
		}
	}while(temp != 0);
	
	//cleanup
	free(pixels);
	BMP_Free(fIN);
	fclose(fOUT);
}

/********************************************************************

function name: encode

function inputs: 	1) char* inPic: the name of the input image file
									2) char* inMess: the name of the input text file
									3) char* outPic: the name of the output image file

function purpose: encodes the given text file into the given image and puts it into
									the output image file

function return: nothing

********************************************************************/
void encode(char* inPic, char* inMess, char* outPic){
	//initialize files
	BMPImage* fIN = BMP_Open(inPic);
	if(fIN == NULL){
		printf("Couldn't open input image\n");
		return;
	}
	FILE* fMESS = fopen(inMess, "r");
	if(fMESS == NULL){
		printf("Couldn't open input text\n");
		BMP_Free(fIN);
		return;
	}
	BMPImage* imageOut= malloc(sizeof(BMPImage));
	if(imageOut == NULL){
		BMP_Free(fIN);
		fclose(fMESS);
		return;
	}

	//initialize output image
	imageOut->header = fIN->header;
	imageOut->data = malloc(sizeof(unsigned char)* (imageOut->header).imagesize);
	if(imageOut->data == NULL){
		BMP_Free(fIN);
		fclose(fMESS);
		BMP_Free(imageOut);
		return;	
	}
	copyData(fIN, imageOut);

	//remove file that is no longer needed
	BMP_Free(fIN);

	//initialize list of pixels
	unsigned char* pixels = malloc(sizeof(char) * imageOut->header.imagesize);
	if(pixels == NULL){
		fclose(fMESS);
		BMP_Free(imageOut);
		return;
	}
	int i;
	for(i = 0; i< imageOut->header.imagesize;i++){
		pixels[i] = 0;
	}

	//write the pixels
	unsigned char temp;
	unsigned int index;
	while(!feof(fMESS)){
		fscanf(fMESS, "%c", &temp);
		if(!feof(fMESS)){
			index = randPixel(imageOut, pixels);
			if(index != 0){
				writePixel(temp, &(imageOut->data[index*3]));
			}else{
				printf("could not find new pixel\n");
				fseek(fMESS, 0, SEEK_END);
			}
		}
	}

	//encode the stop character
	index = randPixel(imageOut, pixels);
	if(index != 0){
		writePixel(0, &(imageOut->data[index*3]));
	}else{
		printf("could not find new pixel\n");
		fseek(fMESS, 0, SEEK_END);
	}
	
	//clean up
	BMP_Write(outPic, imageOut);
	BMP_Free(imageOut);
	fclose(fMESS);
	free(pixels);
}

