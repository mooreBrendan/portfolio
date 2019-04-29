#include <stdlib.h>
#include <stdio.h>

static void infMonkey(char*, int, int);
static void printArray(char*, int);

int main(int argc, char** argv){
	if(argc < 2){
		return(EXIT_FAILURE);
	}
	int size = strtol(argv[1], NULL, 10); 
	char* strng = malloc(sizeof(char) * size);
	if(strng == NULL){
		return(EXIT_FAILURE);
	}
	infMonkey(strng, 0, size);

	free(strng);
	return(EXIT_SUCCESS);
}




static void infMonkey(char* strng, int count, int size){
	int i;
	if(count >= size || count < 0 || size <= 0){
		return;
	}
	if(count + 1 == size){
		strng[count] = 32;
		printArray(strng, size);
		for(i = 0; i< 26;i++){
			strng[count] = 65+ i;
			printArray(strng, size);
		}
	}else{
		strng[count] = 32;
		infMonkey(strng, count +1, size);
		for(i = 0; i< 26; i++){
			strng[count] = 65 + i;
			infMonkey(strng, count + 1, size);
		}
	}


}

static void printArray(char* strng, int size){
	int i;
	for(i = 0; i< size; i++){
		printf("%c",strng[i]); 
	}
	printf("\n");
}
