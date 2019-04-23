#include <stdlib.h>
#include <stdio.h>
#include "hash.h"

unsigned int promptPassword(){
	char pass[20];
	int i =0;
	for(i = 0; i< 20; i++){
		pass[i] = i; //initialize string
	}
	printf("Enter Password:\n");
	scanf("%s", pass);
	
	//return seed from hash
	return(passHash(pass, 20));
}

unsigned int passHash(char* pass, int size){
  int i;
	int j=0;
	unsigned int hash = 0;
	unsigned int tempI = 0;
	char tempC = 0;
	for( i = 0; i< size  - 3; i+=4){
		tempC += (pass[i] ^ pass[i+1]) + (pass[i+3] ^ pass[i+2]);
		tempI = tempC;
		hash += tempI << 8 * j;
		j = (j + 1) % sizeof(unsigned int);
	}
	return(hash);
}
