#include "main.h"

static unsigned char convertFromChar(unsigned char);

static unsigned char convertToChar(unsigned char);

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
	unsigned char temp;
	do{
		temp = readPixel(fIN, randPixel(fIN));
		temp = convertToChar(temp);
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
		free(imageOut);
		return;	
	}
	copyData(fIN, imageOut);

	unsigned char temp;
	while(!feof(fMESS)){
		fscanf(fMESS, "%c", &temp);
		temp = convertFromChar(temp);
		writePixel(temp, randPixel(imageOut), imageOut);
	}
	BMP_Write(outPic, imageOut);
	BMP_Free(fIN);
	BMP_Free(imageOut);
	fclose(fMESS);
}

static unsigned char convertFromChar(unsigned char in){
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
}
