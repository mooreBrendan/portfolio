#https://docs.python.org/3/tutorial/errors.html

import sys
import time

import clock
import hardware
import debug

#define constants
test = True
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
#try:
if 1==1:
	while 1 == 1:
		if len(sys.argv) > 1 and sys.argv[1] == "-d" :
			retCode = debug.test(clk,dipSwitch,printer)
			if(retCode == -3):
				test = False
			if(retCode == -4):
				raise Exception('terminate')
		else:
			clk.updateBase(dipSwitch.readBase())
			clk.updateTime()
#			print("10:\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
			clk.convert()
#			print(str(base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
			printer.updateRegs(clk)
#			time.sleep(1)
#except:
else:
	print("exiting")
