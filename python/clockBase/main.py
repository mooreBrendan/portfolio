import time

import clock
import hardware

#define constants
printDelay = .001


#create objects
clk = clock.clock(base)
printer = hardware.printer(printDelay,"c")

#run the clock
try:
	while 1 == 1:
		clk.updateBase(printer.readBase())
		clk.updateTime()
		print("10:\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
		clk.convert()
		print(str(base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
		printer.updateRegs()
		time.sleep(1)
except:
	print("exiting")
