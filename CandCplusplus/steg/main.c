#include "main.h"

int main(int argc, char** argv){
	//initialize
	int mode = checkInput(argc, argv[1]);
	if(mode == -1){
		return(EXIT_FAILURE);
	}else if(mode == 0){
		return(EXIT_SUCCESS);
	}

	//get password
	unsigned int seed = promptPassword();
	srand(seed);
	seed = 0;

	//run program
	if(mode == 1){ //read from message (decode)
		decode(argv[2], argv[3]);
	}else if(mode == 2){ //add message (encode)
		encode(argv[2], argv[3], argv[4]);
	}else{
		return(EXIT_FAILURE);
	}

	//clean up and terminate
	return(EXIT_SUCCESS);
}

