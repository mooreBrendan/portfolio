#include <stdlib.h>
#include <stdio.h>
#include "steg.h"

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
	return(out;
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
