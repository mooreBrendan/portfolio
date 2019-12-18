#include "aes.h"


void subBytes(char** state){
	int i;
	for(i=0;i<16;i++){
		temp = state[i/4][i%4];
		state[i/4][i%4] = forward[temp>>4][temp&0x0f];
	}
}

void invSubBytes(char** state){
	int i;
	for(i=0;i<16;i++){
		temp = state[i/4][i%4];
		state[i/4][i%4] = inverse[temp>>4][temp&0x0f];
	}
}

void shiftRows(char** state){
	int i,j;
	for(i=1;i<4;i++){	//from 1 to 3
		for(j=0;j<i;j++){
			shift(state[i]);
		}
	}
}

void shift(char* row){
	int i;
	char temp=row[0];
	row[0]=row[1];
	row[1]=row[2];
	row[2]=row[3];
	row[3]=temp;
}


void mixColumnsStep(char** state, char** mix){
	int i;
	for(i = 0;i<4;i++){ //columns
		mixCol(state[i],mix);
	}
}

void mixCol(char* colState, char** mix){
	int j,k;
	int temp
	char b[4];
	for(j=0;j<4;j++){ //mix col
		temp = 0;
		for(k=0;k<4;k++){
			temp += colState[k]*mix[j][k];
		}
		b[j]=temp;
	}
	for(j = 0;j<4;j++){
		colState[j]=b[j];
	}
}

void addRoundKey(char** state, char** key){
	int i;
	for(i=0;i<16;i++){
		state[i/4][i%4] = state[i/4][i%4] ^ key[i/4][i%4];
	}
}

void AES(char** state,char** key){
	char mix[4][4]={
		{2,3,1,1},
		{1,2,3,1},
		{1,1,2,3},
		{3,1,1,2}
	}

//initial
	addRoundKey(state, key);

//rounds
	int i;
	int rounds;
	if(AES_SIZE == 128){
		rounds = 9;
	}else if(AES_SIZE == 192){
		rounds = 11;
	}else if(AES_SIZE == 256){
		rounds = 13;
	}else {
		rounds = 9;
	}

	for(i=0;i<rounds;i++){
		subBytes(state);
		shiftRows(state);
		mixColumnStep(state,mix);
		addRoundKey(state,key);
	}

//final
	subBytes(state);
	shiftRows(state);
	addRoundKey(state,key);
}
