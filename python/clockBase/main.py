#https://docs.python.org/3/tutorial/errors.html

import sys
import time

import clock
import hardware
import debug

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
#try:
if 1==1:
	if len(sys.argv) > 1 and sys.argv[1] == "-d" :
		test = debug.test(clk,dipSwitch,printer)
		retCode = 0
		while retCode != -3:
			retCode = test.run()
			if(retCode == -4):
				raise Exception('terminate')
	while 1 == 1:
		clk.updateBase(dipSwitch.readBase())
		clk.updateTime()
#		print("10:\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
		clk.convert()
#		print(str(base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
		printer.updateRegs(clk)
#		time.sleep(1)
#except:
else:
	print("exiting")
