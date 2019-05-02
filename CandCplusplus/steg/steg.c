#include "main.h"

/*
static unsigned char convertFromChar(unsigned char);
static unsigned char convertToChar(unsigned char);
*/

void decode(char* inPic, char* outMess){
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
	unsigned char temp;
	unsigned int index;
	unsigned char readNum;
	do{
		index = randPixel(fIN, pixels);
		readNum = readPixel(fIN, index*3, &temp);
		if(temp != 0){
			fprintf(fOUT, "%c", temp);
		}
	}while(temp != 0);
	BMP_Free(fIN);
	fclose(fOUT);
}

void encode(char* inPic, char* inMess, char* outPic){
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
	imageOut->header = fIN->header;
	imageOut->data = malloc(sizeof(unsigned char)* (imageOut->header).imagesize);
	if(imageOut->data == NULL){
		BMP_Free(fIN);
		fclose(fMESS);
		BMP_Free(imageOut);
		return;	
	}
	copyData(fIN, imageOut);

	BMP_Free(fIN);
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

	unsigned char temp;
	unsigned int index;
	while(!feof(fMESS)){
		fscanf(fMESS, "%c", &temp);
		index = randPixel(imageOut, pixels);
		if(index != 0){
			pixels[index] = 1;
			writePixel(temp, index*3, imageOut);
		}else{
			printf("could not write\n");
			fseek(fMESS, 0, SEEK_END);
		}
	}
	BMP_Write(outPic, imageOut);
	//BMP_Free(fIN);
	BMP_Free(imageOut);
	fclose(fMESS);
	free(pixels);
}

/*static unsigned char convertFromChar(unsigned char in){
	char out;
	if(in >= 32 ){
		if(in <91){
			out = 1 + (in - 32);
		}else	if(in >= 97 && in < 123){
			out = 34 + (in - 97);
		}
		else{
			out = 0;
		}
	}else{
		out = 0;
	}
	return(out);
}

static unsigned char convertToChar(unsigned char in){
	char out;
	if(in == 0){
		out = 0;
	}else{
		out = in + 31;
	}
	return(out);
}*/
