#include "main.h"

int main(int argc, char** argv){
	//initialize
	int mode = checkInput(argc, argv[1]);
	if(mode == 0){
		return(EXIT_SUCCESS);
	}else if(mode == 1){ //read from message (decode)
		unsigned int seed = promptPassword(); //get password
		srand(seed);
		seed = 0;  //reset seed in memmory
		decode(argv[2], argv[3]);
	}else if(mode == 2){ //add message (encode)
		unsigned int seed = promptPassword(); //get password
		srand(seed);
		seed = 0; //reset seed im memmory
		encode(argv[2], argv[3], argv[4]);
	}else{
		return(EXIT_FAILURE);
	}

	//clean up and terminate
	return(EXIT_SUCCESS);
}

