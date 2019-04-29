#include "main.h"

#include <unistd.h>
#include <termios.h>

static unsigned int passHash(char*, int);
static int getch();

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
	
	pass[STRING_SIZE+3] = '\0';//end string

	//return seed from hash
	return(passHash(pass, STRING_SIZE));
}

static unsigned int passHash(char* pass, int size){
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
