typedef struct testNode{
	int testVal;
	char* testMess;
	int messLength;
	struct testNode* next;
	struct testNode* messNext;
}Test;


Test* gentest(int, char*);

Test* sortTests(Test*);

Test* runTest(int, Test*);

void resetMess(Test*);

void freeTests(Test*);
