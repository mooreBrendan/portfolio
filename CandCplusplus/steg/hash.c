#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <termios.h>
#include <string.h>
#include "hash.h"

#define STRING_SIZE 20

unsigned int promptPassword(){
	char pass[STRING_SIZE + 4];
	int i =3;
	/*for(i = 0; i< STRING_SIZE; i++){
		pass[i] = i; //initialize string
	}*/
	printf("Enter Password:\n");
	pass[0] = 'e';
	pass[1] = 9;
	pass[2] = 10;
	while(i < STRING_SIZE){
		pass[i] = getch();
		if(pass[i] < 32){
			i = STRING_SIZE;
		}else{
			i++;
		}
	}
	pass[STRING_SIZE] = '\0';
	//fgets(pass, sizeof(pass), stdin);
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
