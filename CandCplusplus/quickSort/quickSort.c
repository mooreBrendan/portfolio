#include "stdlib.h"
#include "stdio.h"
#include "quickSort.h"

void quickSort(int* base, size_t nitems, int(*compar)(const void*, const void*)){
	if(nitems > 1){
		int pi = partition(base, nitems, compar);
		int lowNum = pi ;
		int highNum = nitems - (pi + 1);

		quickSort(base, lowNum, compar);
		quickSort(&(base[pi + 1]), highNum, compar); 
	}
	return;
}

int partition(int* arr,size_t nitems, int(*compar)(const void*, const void*)){
	int i = nitems;
	int j; 
	//typedef unsigned char newType[size];
	int temp;
	int pivot = arr[0]; 
	for(j = nitems - 1; j >= 0; j--){
		int test = compar(&(arr[j]), &pivot);
		if(test > 0){
			i--;
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	temp = arr[i - 1];
	arr[ i - 1] = arr[0];
	arr[0] = temp;

	return(i - 1);

}
