#include <stdio.h>
#include <stdlib.h>
#include "aes.h"

int main(int argc,char** argv){
	/*unsigned int i;
	unsigned char curr =0;
	unsigned char temp;
	for(i=0;i<0xff;i++){
		temp = forward[curr>>4][curr&0x0f];
		if(curr != inverse[temp>>4][temp&0x0f]){
			printf("error: %ud\n",i);
		}
	}*/

	if(argc < 2){
		return(EXIT_FAILURE);
	}
	FILE* fin = fopen(argv[1],"r");
	
	
	fclose(fin);

	return(EXIT_SUCCESS);
}

