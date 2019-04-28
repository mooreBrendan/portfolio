#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <termios.h>
#include <string.h>
#include "hash.h"

#define STRING_SIZE 20

unsigned int promptPassword(){
	char pass[STRING_SIZE + 4];
	int i;
	for(i = 3; i< STRING_SIZE +4; i++){
		pass[i] = i; //initialize string
	}
	printf("Enter Password: ");
	pass[0] = 'e';
	pass[1] = 9;
	pass[2] = 10;
	i = 3;
	while(i < STRING_SIZE){
		pass[i] = getch();
		//printf("%d ", pass[i]);
		if(pass[i] == 127){ //backspace
			if(i > 3){
				pass[i] = i;
				i--;
			}
		}else	if(pass[i] == 10){ //enter
			i = STRING_SIZE;
		}else{ //increment
			i++;
		}
	}
	printf("\n");
	pass[STRING_SIZE] = '\0';
	//return seed from hash
	return(passHash(pass, STRING_SIZE));
}

unsigned int passHash(char* pass, int size){
  int i;
	int j=0;
	unsigned int hash = 0;
	unsigned int tempI = 0;
	char tempC = 0;
	for( i = 0; i< size  - 3; i+=4){
		tempC += ((pass[i] ^ pass[i+2]) + (pass[i+3])) ^ pass[i+1];
		tempI = tempC;
		hash += tempI << 8 * j;
		j = (j + 1) % sizeof(unsigned int);
	}
	return(hash);
}

int getch(){
	struct termios oldt, newt;
	int ch;
	tcgetattr(STDIN_FILENO, &oldt);
	newt = oldt;
	newt.c_lflag &= ~(ICANON | ECHO);
	tcsetattr(STDIN_FILENO, TCSANOW, &newt);
	ch = getchar();
	tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
	return ch;
}
