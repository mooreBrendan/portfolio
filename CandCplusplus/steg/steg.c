#include <stdlib.h>
#include <stdio.h>
#include "steg.h"
#include "bmp.h"

//HW10
void decode(char* inPic, char* outMess){
	BMPImage* fIN = BMP_Open(inPic);
	if(fIN == NULL){
		return;
	}
	FILE* fOUT = fopen(outMess, "w");
	if(fOUT == NULL){
		BMP_Free(fIN);
		return;
	}
	char temp;
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
		return;
	}
	FILE* fMESS = fopen(inMess, "r");
	BMPImage* imageOut= malloc(sizeof(BMPImage));
	if(imageOut == NULL){
		BMP_Free(fIN);
		return;
	}
	imageOut->header = fIN->header;
	imageOut->data = malloc(sizeof(unsigned char)* (imageOut->header).imagesize);
	
	copyData(fIN, imageOut);
	BMP_Free(fIN);

	char temp;
	while(!feof(fMESS)){
		fscanf(fMESS, "%c", &temp);
		temp = convertFromChar(temp);
		writePixel(temp, randPixel(imageOut), imageOut);
	}
	writePixel(0, randPixel(imageOut), imageOut);
	BMP_Write(outPic, imageOut);
	BMP_Free(imageOut);
	fclose(fMESS);
}

char convertFromChar(char in){
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

char convertToChar(char in){
	char out;
	if(in == 0){
		out = 0;
	}else{
		out = in + 31;
	}
	return(out);
}
