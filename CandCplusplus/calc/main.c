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

long int calc(long int calc1, short int state, long int calc2){
	switch(state){
		case 0:		return(0);
		case 1:		return(calc1 + calc2);
		case 2:		return(calc1 - calc2);
		case 3:		return(calc1 * calc2);
		case 4:		return(calc1 / calc2);
		case 5:		return(raise(calc1, calc2));
		default:	return(-1);
	}
}

short int conv(char input){
	switch(input){
		case '+': return(1);
		case '-': return(2);
		case '*': 
		case 'x':
		case 'X': return(3);
		case '/': return(4);
		case '^': return(5);
		default: return(-1);
	}
}

long int calculate(FILE** fp, long int* finalVal){
	long int calc1;				//first operator
	long int calc2;				//second operator
	short int state;			//operand value
	short int returnVal;	//return vlaue
	char temp;						//store variable for parenthesis
	
	//get first operator
	if(fscanf(*fp,"%ld",&calc1) != 1){ //try and get first operator
		do{
			temp = 0;
			if( fscanf(*fp,"%c",&temp) == 1 && temp == '('){ //check if open par.
				state = calculate(fp, &calc1); //get operator and operand
			}else if(temp != ' '){ //if not par
				return(-1); //return error
			}
		}while( temp != '(' && temp != ' '); //move past spaces
	} else{
		//get operand
		do{
			temp = ' ';
			fscanf(*fp, "%c",&temp); 
		}while(temp == ' ');
		if(temp == '('){
			state = calculate(fp, &calc2);
			calc1 *= calc2;
		}else{
			state = conv(temp);
		}
	}

	//read in rest of file
	do{
		//get second operator
		returnVal = calculate(fp, &calc2);
	
		//perform operation
		calc1 = calc(calc1, state, calc2);
	}while(returnVal >0);

	*finalVal = calc1;

	//return if additional operations are needed
	return(returnVal);
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
