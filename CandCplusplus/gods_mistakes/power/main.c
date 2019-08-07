#include <stdlib.h>
#include <stdio.h>

long int raise(long int base, long int power){
	return( power > 0 ? (power > 1 ?  (raise(base, power/2)) * raise(base, power/2) * ((power % 2) ? base: 1): base) : 1);
}

int main(int argc, char** argv){
	if(argc < 3){
		return(EXIT_FAILURE);
	}
	long int base = strtol(argv[1], NULL, 10);
	long int power = strtol(argv[2], NULL, 10);
	printf("%ld\n", raise(base, power));
	return(EXIT_SUCCESS);
}
