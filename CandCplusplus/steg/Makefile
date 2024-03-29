# Makefile

TARGET = steg
WARNING = -Wall -Wshadow --pedantic
ERROR = -Wvla #-Werror
GCC = gcc -std=c99 -g $(WARNING) $(ERROR)

TESTFLAGS = #-DTESTING #-DPRINTING 

SRCS = main.c input.c steg.c bmp.c hash.c
OBJS = $(SRCS:%.c=%.o)


VALGRIND1 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind1.log ./$(TARGET) r8.sp out11.pck 
VALGRIND2 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind2.log ./$(TARGET) r100.sp out12.pck 
VALGRIND3 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind3.log ./$(TARGET) r100h.sp out13.pck  
VALGRIND4 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind4.log ./$(TARGET) r100v.sp out14.pck 
VALGRIND5 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind5.log ./$(TARGET) r1K.sp out15.pck 
VALGRIND6 = valgrind --tool=memcheck --verbose --leak-check=full --show-leak-kinds=all --log-file=valgrind6.log ./$(TARGET) r2K.sp out16.pck 
 
$(TARGET): $(OBJS)
	$(GCC) $(TESTFLAGS) $(OBJS) -o $(TARGET)
	

testall: test1 test2 test3
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
	./$(TARGET) -e ./inImages/Rainier.bmp ./inText/bible.txt outImage1.bmp
	./$(TARGET) -d ./outImage1.bmp ./out1.txt
	diff ./inText/bible.txt ./out1.txt

test2: $(TARGET)
	./$(TARGET) --security

test3: $(TARGET)
	./$(TARGET) --help

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
