#include "main.h"

static int checkString(char*, char*, int);

static void printHelp();
static void printSecurity();
static void printUse();

/********************************************************************

function name: checkInput

function inputs: 	1) int argc: the number of input elements
									2) char** argv: the array of input strings

function purpose: checks for valid input and prints the desired statement

function return: the state the program should go to
									-1) bad input: EXIT_FAILURE
									0) good input, print string: EXIT_SUCCESS
									1) good input: decode
									2) good input: encode

********************************************************************/
int checkInput(int argc, char** argv){
	if(argc == 2 && checkString(argv[1], "--security", 10)){
		printSecurity();
		return(0);
	}else if(argc == 2 && checkString(argv[1], "--help", 6)){
		printHelp();
		return(0);
	}else if(argc == 4 && checkString(argv[2],"-d",2)) {
		return(1);
	}else if(argc == 5 && checkString(argv[2],"-e",2)) {	
		return(2);
	}else{
		printUse();
		return(-1);
	}
}

/********************************************************************

function name: checkString

function inputs: 	1) char* input: the string to be tested
									2) char* check: the string to be tested against
									3) int length: the length of the input string

function purpose: checks if two strings are equivalent

function return: bool of if they are equal

********************************************************************/
static int checkString(char* input, char* check, int length){
	int i = 0;
	while(input[i] != 0 && i < length){ //check for null terminator
		i++;
		if(input[i] != check[i]){
			return(0);
		}
	}
	return(i == length);
}

/********************************************************************

function name: printHelp

function inputs: 	1)none

function purpose: prints the help message

function return: none

********************************************************************/
static void printHelp(){
	printf("usage \"./steg $(input image) $(mode) $(message file) $(output image)\"\n\n");

	printf("\tmode:\t-e: encode\n\t\t-d: decode\n\n");
	printf("\tinput images must be bmp files\n\n");
	printf("\tmessage file must be a text file\n\n");
	printf("\tuse \"./steg --security\" to view security statement\n\n");
	
	printf("\tpurpose:   This program is intended to hide a message in a bmp image. The\n");
	printf("\tmessage will be hidden in pseudo-random pixels that are determined by the\n");
	printf("\tpassword that is entered.  The password must be less than 20 characters.\n");
	printf("\tWhile the password is being entered, it will be hidden from the screen.\n");
	printf("\tIf an error is made while inputing the password,  the backspace key can be\n");
	printf("\tused.  Additionally, if the password is less than %d characters the enter\n", STRING_SIZE);
	printf("\tkey can be used to terminate input.\n\n");
}

/********************************************************************

function name: printSecurity

function inputs: 	1) none

function purpose: print the security statement

function return: nothing

********************************************************************/
static void printSecurity(){
	printf("\tThis program is not intended to be uncrackable.  It is meant to hide the\n");
	printf("\tmessage from attackers, not to protect it.  The ultimate goal is to hide\n");
	printf("\tthe message so that the attacker will not attempt to decode it.  This\n");
	printf("\tprogram does not require an internet connection and does not retain any\n");
	printf("\tinformation.  The password, message, and images are not stored after this\n");
	printf("\tprogram exits.  If any of this behaviour is noticed, do not use this\n");
	printf("\tprogram as it has most likely been modified and is not safe.\n\n");
}

/********************************************************************

function name: printUse

function inputs: 	1) none

function purpose: prints the use statement

function return: nothing

********************************************************************/
static void printUse(){
	printf("    unknown input, use \"./steg --help\" for propper use\n");
}
