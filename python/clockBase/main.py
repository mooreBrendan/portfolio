import time

import clock
import printer

#define constants
printDelay = .001

#initialize variable
base = 16

#create objects
clk = clock.clock(base)
prntr = printer.printer(printDelay,"c")

#run the clock
try:
	while 1 == 1:
		clk.update(base)
		print("10:\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
		clk.convert()
		print(str(base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
		time.sleep(1)
except:
	print("exiting")
