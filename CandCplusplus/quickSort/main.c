#include "stdlib.h"
#include "stdio.h"
#include "quickSort.h"

int comparison(const void* x, const void* y){
	const int* x1 = (const int*) x;
	const int* y1 = (const int*) y;
	if( *x1 < *y1){
		return(-1);
	}
		 
	return(*x1 > *y1);
}

#ifdef CHECKING 
void check(const int* a, const int length){
	int i;
	for(i = 0; i < length - 1; i++){
		if(a[i] > a[i + 1]){
			printf("failed sorting: %d\t%d", a[i], a[i+1]);
		}
	}
}
#endif
int main(int argc, char** argv){
	//init
	if(argc < 3){
		return(EXIT_FAILURE);
	}
	FILE* fIn = fopen(argv[1], "r");
	if( fIn == NULL){
		return(EXIT_FAILURE);
	}
	FILE* fOut = fopen(argv[2], "w");
	if(fOut == NULL){
		fclose(fIn);
		return(EXIT_FAILURE);
	}

	//read
	int count = 0;
	int temp;
	int read;
	do{
		read = fscanf(fIn, "%d", &temp);
		if(read == 1){
			count++;
		}
	}while(read == 1);
	int* arr = malloc(sizeof(int)* count);

	fseek(fIn, 0, SEEK_SET);
	for(temp = 0; temp < count; temp++){
		fscanf(fIn, "%d", &arr[temp]);
	}
	//sort
	quickSort(arr, count, comparison);
#ifdef CHECKING
	check(arr, count);
#endif
	//print
	for(temp = 0; temp < count; temp++){
		fprintf(fOut, "%d\n", arr[temp]);
	}
	//close
	fclose(fIn);
	fclose(fOut);
	free(arr);
	return(EXIT_SUCCESS);
}
