#include "main.h"
#include <unistd.h>
#include <termios.h>

static unsigned int passHash(char*, int);
static int getch();

/********************************************************************

function name: promptPassword

function inputs: 	1) none

function purpose: prompts the user to enter the password and calls hashing function

function return: the seed to be used for random generation

********************************************************************/
unsigned int promptPassword(){
	char pass[STRING_SIZE + 4];
	int i;
	for(i = 3; i< STRING_SIZE +4; i++){
		pass[i] = i; //initialize string
	}
	printf("Enter Password: ");
	
	//just give some basic variables to give some interesting behaviour
	pass[0] = 'e';
	pass[1] = 9;
	pass[2] = 10;

	//get password
	i = 3;
	while(i < STRING_SIZE+3){
		pass[i] = getch();
		if(pass[i] == 127){ //backspace char
			if(i > 3){
				pass[i] = i;
				i--;
			}
		}else	if(pass[i] == 10){ //enter char
			i = STRING_SIZE + 3;
		}else{ //increment
			i++;
		}
	}

	printf("\n");
	
	pass[STRING_SIZE+3] = '\0';//null terminate string

	//return seed from hash
	return(passHash(pass, STRING_SIZE));
}

/********************************************************************

function name: passHash

function inputs: 	1) char* pass: the password string
									2) int size: the length of the password

function purpose: hashes the password to generate a "unique" seed (not guaranteed to have
									no collisions, but thats fine because it is meant to hide not protect)

function return: the seed from the hashed password

********************************************************************/
static unsigned int passHash(char* pass, int size){
  int i, j = 0;
	unsigned int hash = 0;
	unsigned int tempI = 0;
	char tempC = 0;

	//hash the pasword
	for( i = 0; i< size  - 3; i+=4){
		tempC += ((pass[i] ^ pass[i+2]) + (pass[i+3])) ^ pass[i+1];
		tempI = tempC;
		hash += tempI << 8 * j;
		j = (j + 1) % sizeof(unsigned int);
	}

	while(i !=  size){ //use entries at the end
	  tempI = pass[i];
		hash ^= tempI << (size - i);
	}

	//hide the password artifacts
	for(i = 0;i<size;i++){
		pass[i] = 0;
	}

	return(hash);
}

/********************************************************************

function name: getch

function inputs: 	1) none

function purpose: gets the input characters from the user without showing
									the password. From Delan Azabani, https://stackoverflow.com/questions/6856635/hide-password-input-on-terminal)

function return: the character received

********************************************************************/
static int getch(){
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
