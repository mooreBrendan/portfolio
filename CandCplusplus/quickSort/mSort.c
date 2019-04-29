#include <stdlib.h>
#include <stdio.h>
#include "fbz.h"
#include "mSort.h"

void mSort(Test** head){
	Test* temp = *head;
	int count = 0;
	while(temp != NULL){
		count++;
		temp = temp ->next;
	}
	if(count < 2){
		return;
	}
	temp = (*head) -> next;
	Test* prev = *head;
	int i;
	for(i = 1; i < count / 2; i++){
		temp = temp -> next;
		prev = prev -> next;
	}
	prev -> next = NULL;
	if(*head !=  temp){
		mSort(&temp);
		mSort(head);
	}
	*head = merge(*head, temp);
}

Test* merge(Test* left, Test* right){
	Test* head;
	if(left == NULL && right == NULL){
		return(NULL);
	}
	else{
		if(left == NULL){
			head = right;
			right = right -> next;
		}
		else if (right == NULL){
			head = left;
			left = left -> next;
		}
		else {
			if(left -> testVal < right -> testVal){
				head = left;
				left = left ->next;
			}
			else{
				head = right;
				right = right ->next;
			}
		}
	}
	Test* temp = head;
	while(left != NULL || right != NULL){
		if(left == NULL){
			temp -> next = right;
			right = right ->next;
		}
		else if( right == NULL){
			temp -> next = left;
			left = left -> next;
		}
		else{
			if(left -> testVal < right -> testVal){
				temp -> next = left;
				left = left ->next;
			}
			else{
				temp -> next = right;
				right = right ->next;
			}
		}
		temp = temp -> next;
	}
	return(head);
}
