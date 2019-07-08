# Makefile

TARGET = calc
WARNING = -Wall -Wshadow --pedantic
ERROR = -Wvla -Werror
GCC = gcc -std=c99 -g $(WARNING) $(ERROR)

TESTFLAGS = -DTEST_MAIN

SRCS = main.c

OBJS = $(SRCS:%.c=%.o)



VALGRIND1 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind1.log ./$(TARGET) 1 20  
VALGRIND2 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind2.log ./$(TARGET) 1 20 2 "even" 
VALGRIND3 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind3.log ./$(TARGET) 1 20 1 "all" 
VALGRIND4 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind4.log ./$(TARGET) 1 20 1 "all" 2 "even" 
$(TARGET): $(OBJS)
	$(GCC) $(TESTFLAGS) $(OBJS) -o $(TARGET)
	

testall: test1 test2 test3 test4 test5 test6 test7 test8 test9 test10 test11

val1:	$(TARGET)
	$(VALGRIND1)=./logfile #./$(TARGET)

val2:	$(TARGET)
	$(VALGRIND2)=./logfile #./$(TARGET)
val3: $(TARGET)
	$(VALGRIND3)=./logfile
val4: $(TARGET)
	$(VALGRIND4)=./logfile

test1: $(TARGET)
	./$(TARGET) in/1.txt > out1.txt
	diff out1.txt out/1.txt
	
test2: $(TARGET)
	./$(TARGET) in/2.txt > out2.txt
	diff out2.txt out/1.txt

test3: $(TARGET)
	./$(TARGET) in/3.txt > out3.txt
	diff out3.txt out/3.txt

test4: $(TARGET)
	./$(TARGET) in/4.txt > out4.txt
	diff out4.txt out/4.txt

test5: $(TARGET)
	./$(TARGET) in/5.txt > out5.txt
	diff out5.txt out/5.txt

test6: $(TARGET)
	./$(TARGET) in/6.txt > out6.txt
	diff out6.txt out/6.txt

test7: $(TARGET)
	./$(TARGET) in/7.txt > out7.txt
	diff out7.txt out/7.txt

test8: $(TARGET)
	./$(TARGET) in/8.txt > out8.txt
	diff out8.txt out/8.txt

test9: $(TARGET)
	./$(TARGET) in/9.txt > out9.txt
	diff out9.txt out/9.txt

test10: $(TARGET)
	./$(TARGET) in/10.txt > out10.txt
	diff out10.txt out/10.txt

test11: $(TARGET)
	./$(TARGET) in/11.txt > out11.txt
	diff out11.txt out/11.txt


.c.o:
	$(GCC) $(TESTFLAGS) -c $*.c

clean:
	rm -f $(OBJS) $(TARGET) out*.txt output??.txt valgrind?.log
	clear
