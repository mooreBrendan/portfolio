# Makefile

TARGET = raise
WARNING = -Wall -Wshadow --pedantic
ERROR = -Wvla -Werror
GCC = gcc -std=c99 -g $(WARNING) $(ERROR)

TESTFLAGS = -DTEST_MAIN -DCHECKING

SRCS = main.c

OBJS = $(SRCS:%.c=%.o)



VALGRIND1 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind1.log ./$(TARGET) 1 20  
VALGRIND2 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind2.log ./$(TARGET) 1 20 2 "even" 
VALGRIND3 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind3.log ./$(TARGET) 1 20 1 "all" 
VALGRIND4 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind4.log ./$(TARGET) 1 20 1 "all" 2 "even" 
$(TARGET): $(OBJS)
	$(GCC) $(TESTFLAGS) $(OBJS) -o $(TARGET)
	

testall: test1 test2 test3 test4

val1:	$(TARGET)
	$(VALGRIND1)=./logfile #./$(TARGET)

val2:	$(TARGET)
	$(VALGRIND2)=./logfile #./$(TARGET)
val3: $(TARGET)
	$(VALGRIND3)=./logfile
val4: $(TARGET)
	$(VALGRIND4)=./logfile

test1: $(TARGET)
	./$(TARGET) inputs/test1.txt output1.txt 
	
test2: $(TARGET)
	./$(TARGET) inputs/test2.txt output2.txt 

test3: $(TARGET)
	./$(TARGET) inputs/test3.txt output3.txt

test4: $(TARGET)
	./$(TARGET) inputs/test4.txt output4.txt


test5: $(TARGET)
	./$(TARGET) 1 20 1 "all" 2 "even" 3 "threes"

test6: $(TARGET)
	./$(TARGET) 1 20 3 "Fizz" 5 "Buzz"

test7: $(TARGET)
	./$(TARGET) 1 0 3 "threes"

test8: $(TARGET)
	./$(TARGET) 1 1000 2 "even"
.c.o:
	$(GCC) $(TESTFLAGS) -c $*.c

clean:
	rm -f $(OBJS) $(TARGET) output?.txt output??.txt valgrind?.log
	clear
