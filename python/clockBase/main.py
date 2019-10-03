import time

import clock
import hardware

#define constants
printDelay = .001
clkPin = 0
busPins = []
switchPins = []
selectionPins =[]


#create objects
clk = clock.clock()
dipSwitch = hardware.dipSwitch(switchPins)
printer = hardware.printer(printDelay,"c",clkPin,busPins,selectionPins)

#run the clock
try:
	while 1 == 1:
		clk.updateBase(dipSwitch.readBase())
		clk.updateTime()
#		print("10:\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
		clk.convert()
#		print(str(base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
		printer.updateRegs(clk)
#		time.sleep(1)
except:
	print("exiting")
