#include <stdlib.h>
#include <stdio.h>

long int raise(long int base, long int power){
	return( power > 0 ? (power > 1 ?  (raise(base, power/2)) * raise(base, power/2) * ((power % 2) ? base: 1): base) : 1);
}

long int add(long int x, long int y){
	return(y == 0? x: (y > 0 ? add(x, y - 1) + 1: add(x, y+1) - 1));
}

long int sub(long int x, long int y){
	return(y == 0? x: (y > 0 ? sub(x, y - 1) - 1: sub(x, y+1) + 1));
}
long int mul(long int x, long int y){
	if( y == 0){
		return(x);
	}
	return(mul(x,y-1) + x);
}

int main(int argc, char** argv){
	if(argc < 4){
		return(EXIT_FAILURE);
	}
	long int x = strtol(argv[1], NULL, 10);
	char op = argv[2][0];
	long int y = strtol(argv[3], NULL, 10);
	switch(op){
		case '+': printf("%ld\n", add(x,y));
							break;
		case '-': printf("%ld\n", sub(x,y));
							break;
		case '*':
		case 'x':
		case 'X': printf("%ld\n", mul(x,y));
							break;
		case '^': printf("%ld\n", raise(x,y));
							break;
		default: 	printf("Error\n"); 
							return(EXIT_FAILURE);
	}
	return(EXIT_SUCCESS);
}