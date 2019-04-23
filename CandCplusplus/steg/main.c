#include <stdlib.h>
#include <stdio.h>
#include "steg.h"
#include "hash.h"

int main(int argc, char** argv){
	//initialize
	if(argc < 3){ //0: call, 1: input file, 2: mode (add/read), 3: message, 4: outfile
		return(EXIT_FAILURE);
	}
	if(argv[2][0] != '-'){
		return(EXIT_FAILURE);
	}
	if(argv[2][1] == 'e' && argc < 5){
		return(EXIT_FAILURE);
	}
	unsigned int seed = promptPassword();
	printf("seed: %d\n", seed);
	srand(seed);
	/*
	//run program
	if(argv[2][1] == 'd'){//read from message
		decode(argv[1], argv[3]);
	}else if(argv[2][1] == 'e'){ //add message
		if(argc < 6){
			return(EXIT_FAILURE);
		}
		encode(argv[1], argv[3], argv[4]);
	}else{
		return(EXIT_FAILURE);
	}
	*/
	
	//clean up and terminate
	return(EXIT_SUCCESS);
}
