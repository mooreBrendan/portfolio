#include <stdlib.h>
#include <stdio.h>



long int abv(long int x){
	return(x >= 0? x: -1 * x);
}

long int add(long int x, long int y){
	return(y == 0? x: (y > 0 ? add(x, y - 1) + 1: add(x, y + 1) - 1));
}

long int sub(long int x, long int y){
	return(y == 0? x: (y > 0 ? sub(x, y - 1) - 1: add(sub(x, add(y, 1)), 1)));
}

long int mul(long int x, long int y){
	return(y == 0? 0: (y > 0 ? add(mul(x, sub(y, 1)), x): (x < 0? sub(mul(x, add(y, 1)), x) : -1 * add(abv(mul(x, add(y, 1))), x))));
}

long int mod(long int modulo, long int base){
	return(sub(modulo, mul((modulo / base), base)));
}

long int raise(long int base, long int power){
	return( power > 0 ? (power > 1 ?  (mul(mul(raise(base, power/2), raise(base, power/2)), (mod(power, 2) ? base: 1))): base) : 1);
}

//***************************************main*************************************************
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
