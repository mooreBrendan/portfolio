#include <stdlib.h>
#include <stdio.h>
#include "steg.h"
#include "bmp.h"

//HW10
void decode(char* inPic, char* outMess){
	/*BMPImage* fIn = BMP_Open(inPic);
	if(Is_BMPHeader_Valid(fIn ->header, fIn)){
		return;
	}
	FILE* fOut = fopen(outMess, "w");
	if(fOut == NULL){
		BMP_free(fIn);
		return;
	}

	char temp;
	do{
		temp = read(randPixel());
		temp = convertFromChar(temp);
	}while(temp != 0);
	*/
}

void encode(char* inPic, char* inMess, char* outPic){

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
