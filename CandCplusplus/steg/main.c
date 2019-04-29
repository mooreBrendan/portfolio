#include <stdlib.h>
#include <stdio.h>
#include "input.h"
#include "steg.h"
#include "hash.h"


int main(int argc, char** argv){
	//initialize
	int state = checkInput(argc, argv);
	if(state == -1){
		return(EXIT_FAILURE);
	}else if(state == 0){
		return(EXIT_SUCCESS);
	}

	unsigned int seed = promptPassword();
	printf("seed: %d\n", seed);
	srand(seed);
	
	//run program
	if(state == 1){//read from message
		decode(argv[1], argv[3]);
	}else if(state == 2){ //add message
		encode(argv[1], argv[3], argv[4]);
	}else{
		return(EXIT_FAILURE);
	}

	//clean up and terminate
	return(EXIT_SUCCESS);
}

