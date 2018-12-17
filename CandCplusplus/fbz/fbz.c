#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "fbz.h"

int main(int argc, char **argv){
	if (argc < 3){
		return(EXIT_FAILURE);
	}
	int start = (int)strtol(argv[1], NULL, 10);
	int end = (int)strtol(argv[2], NULL, 10);

	//create tests
	int testCount = 0;
	Test* head = NULL;
	Test* currNode;
	if(argc >= 5){
		head = gentest((int)strtol(argv[3], NULL, 10), argv[4]);
		currNode = head; 
		testCount = 1;
	}
	while( argc - (3 + testCount * 2) > 1){
		currNode-> next = gentest((int)strtol(argv[3 + 2* testCount], NULL, 10), argv[4+ 2*testCount]);
		currNode = currNode-> next; 	
		testCount++;
	}

	//loop through values
	int curr;
	Test* messHead;
	Test* messCurr;
	int i;
	for(curr = start; curr <= end; curr++){
		currNode = head;
		messHead = NULL;
		messCurr = messHead;
		//test all
		for(i = 0; i < testCount; i++){
			if(messHead == NULL){
				messHead = runTest(curr, currNode);
				messCurr = messHead;
			}
			else{
				messCurr->messNext = runTest(curr, currNode);
				if(messCurr-> messNext != NULL){
					messCurr = messCurr -> messNext;
				}
			}
			currNode = currNode-> next; 
		} 
		if(messHead == NULL){
			//print number
			printf("%d\n", curr);
		}
		else{
			//print message
			messCurr = messHead;
			do{
				printf("%s ", messCurr->testMess);
				messCurr = messCurr->messNext;
			}while( messCurr != NULL);
			printf("\n");

			//reset path
			resetMess(head);
		}
	}

	//free
	freeTests(head);
	return(EXIT_SUCCESS);
}

Test* gentest(int val, char* text){
	//create node
	Test* testCase = malloc(sizeof(Test));
	if(testCase == NULL){
		return(NULL);
	}

	//assign val
	testCase-> testVal = val;
	testCase->next = NULL;
	testCase->messNext = NULL;
	/*
	//find length of text
	char* temp = text;
	int messLength = 0;
	while(temp != NULL && temp != "\n"){
		temp++;
		messLength++;
	}
	//duplicate
	testCase-> testMess = malloc(sizeof(char)* messLength);
	if(testCase-> testMess ==NULL){
		return;
	}
	int i;
	for(i=0; i< messLength;i++){
		testCase->testMess[i] = text[i];
	}

	//assign mess length
	testCase->messLength = messLength;
	*/
	testCase->testMess = text;
	return(testCase);
}

Test* runTest(int val, Test* testCase){
	if(val % (testCase -> testVal) == 0){
		return(testCase);
	}
	else{
		return(NULL);
	}
}

void resetMess(Test* head){
	Test* temp;
	if(head -> messNext != NULL){
		temp = head;
		head = head -> messNext;
		temp ->messNext = NULL;
	}
	else{
		head = head -> next;
	}
}

void freeTests(Test* head){
	Test* temp;
	while(head != NULL){
		temp = head;
		head = head -> next;
		free(temp);
	}
}
