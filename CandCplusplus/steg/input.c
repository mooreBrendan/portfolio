#include "main.h"

static int checkString(char*, char*, int);

static void printHelp();
static void printSecurity();
static void printUse();

int checkInput(int argc, char** argv){
	if(argc == 2){
		if(checkString(argv[1], "--help", 6)){
			printHelp();
			return(0);
		}else if(checkString(argv[1], "--security", 10)){
			printSecurity();
			return(0);
		}else{
			printUse();
			return(-1);
		}
	}else if(argc == 4 ){ 
		if(argv[2][0] != '-' || argv[2][1] != 'd'){
			printUse();
			return(-1);
		}else{
			return(1);
		}
	}else if(argc == 5){	
		if(argv[2][0] != '-' || argv[2][1] != 'e'){
			printUse();
			return(-1);
		}else{
			return(2);
		}
	}else{
		printUse();
		return(-1);
	}
}

static int checkString(char* input, char* check, int length){
	int i = 0;
	//char help[6] = "--help";
	while(input[i] != 0){
		if(i < length){
			i++;
		}else if(input[i] != check[i]){
			return(0);	
		}else{
			return(0);
		}
	}
	if(i < length){
		return(0);
	}
	return(1);
}

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

static void printSecurity(){
	printf("\tThis program is not intended to be uncrackable.  It is meant to hide the\n");
	printf("\tmessage from attackers, not to protect it.  The ultimate goal is to hide\n");
	printf("\tthe message so that the attacker will not attempt to decode it.  This\n");
	printf("\tprogram does not require an internet connection and does not retain any\n");
	printf("\tinformation.  The password, message, and images are not stored after this\n");
	printf("\tprogram exits.  If any of this behaviour is noticed, do not use this\n");
	printf("\tprogram as it has most likely been modified and is not safe.\n\n");
}

static void printUse(){
	printf("    unknown input, use \"./steg --help\" for propper use\n");
}
