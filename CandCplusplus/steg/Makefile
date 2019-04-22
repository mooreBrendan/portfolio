# Makefile

TARGET = pa6
WARNING = -Wall -Wshadow --pedantic
ERROR = -Wvla #-Werror
GCC = gcc -std=c99 -g $(WARNING) $(ERROR)

TESTFLAGS = #-DTESTING #-DPRINTING 

SRCS = pa6.c seqpair.c
OBJS = $(SRCS:%.c=%.o)


VALGRIND1 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind1.log ./$(TARGET) r8.sp out11.pck 
VALGRIND2 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind2.log ./$(TARGET) r100.sp out12.pck 
VALGRIND3 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind3.log ./$(TARGET) r100h.sp out13.pck  
VALGRIND4 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind4.log ./$(TARGET) r100v.sp out14.pck 
VALGRIND5 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind5.log ./$(TARGET) r1K.sp out15.pck 
VALGRIND6 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind6.log ./$(TARGET) r2K.sp out16.pck 
 
$(TARGET): $(OBJS)
	$(GCC) $(TESTFLAGS) $(OBJS) -o $(TARGET)
	

testall: test1 test2 test3 test4 test5 test6
valall: val1 val2 val3 val4 val5 val6


val1:	$(TARGET)
	$(VALGRIND1)=./logfile #./$(TARGET)

val2:	$(TARGET)
	$(VALGRIND2)=./logfile #./$(TARGET)

val3:	$(TARGET)
	$(VALGRIND3)=./logfile #./$(TARGET)

val4:	$(TARGET)
	$(VALGRIND4)=./logfile #./$(TARGET)

val5:	$(TARGET)
	$(VALGRIND5)=./logfile #./$(TARGET)

val6:	$(TARGET)
	$(VALGRIND6)=./logfile #./$(TARGET)


test1: $(TARGET)
	./$(TARGET) r8.sp out1.pck
	diff r8.pck out1.pck

test2: $(TARGET)
	./$(TARGET) r100.sp out2.pck
	diff out2.pck r100.pck

test3: $(TARGET)
	./$(TARGET) r100h.sp out3.pck
	diff out3.pck r100h.pck

test4: $(TARGET)
	./$(TARGET) r100v.sp out4.pck
	diff out4.pck r100v.pck

test5: $(TARGET)
	./$(TARGET) r1K.sp out5.pck

test6: $(TARGET)
	./$(TARGET) r2K.sp out6.pck


.c.o:
	$(GCC) $(TESTFLAGS) -c $*.c

clean:
	rm -f $(OBJS) $(TARGET) out* valgrind*.log
	clear
