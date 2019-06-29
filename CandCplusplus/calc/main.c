#include <stdlib.h>
#include <stdio.h>

long int raise(long int base, long int power){
	if(power == 0){
		return(1);
	}else if(power == 1){
		return(base);
	}else{
		long int temp = raise(base, power / 2);
		return(power % 2 ? temp * temp * base : temp * temp);
	}
}

int calculate(FILE** fp, long int* returnVal){
	long int calc;
	long int store;
	char temp = ' ';
	while(temp != '\n' && !feof(*fp)){
		calc = 0;
		store = 0;
		temp = ' ';
		if(!fscanf(*fp, "%ld", &calc)){
			fscanf(*fp, "%c",&temp);
			if(temp != '('){
				return(-1);
			}else{
				if(calculate(fp, &store)==-1){
					return(-1);
				}else{
					*returnVal += store;
				}
			}
		}else{
			do{
				fscanf(*fp, "%c", &temp);
			}while(!feof(*fp) && temp == ' ');
		}
		if(temp != '\n' && !feof(*fp)){
			if(temp == '+'){
				*returnVal += calc;
			}else if(temp == '-'){
				*returnVal -= calc;
			}else if(temp == '*' || temp == '('){
				if(calculate(fp, &store) != -1){
					*returnVal += calc * store;
				}else{
					return(-1);
				}
			}else if(temp == '/'){
				if(calculate(fp, &store) != -1){
					*returnVal += calc / store;
				}else{
					return(-1);
				}
			}else if(temp == ')'){
				return(0);
			}else if(temp == '^'){
				if(calculate(fp, &store) != -1){
					*returnVal += raise(calc, store);
				}else{
					return(-1);
				}
			}else{
				return(-1);
			}
		}
	}
	*returnVal += calc;
	return(0);
}

int main(int argc, char** argv){
	if(argc < 2){
		return(EXIT_FAILURE);
	}
	FILE* fp = fopen(argv[1], "r");
	
	long int calc = 0;
	if(calculate(&fp, &calc) == -1){
		printf("INVALID FORMAT\n");
	}else{
		printf("%ld\n",calc);
	}
	fclose(fp);
	return(EXIT_SUCCESS);
}
