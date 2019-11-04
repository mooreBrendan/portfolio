#https://docs.python.org/3/tutorial/errors.html

import sys
import time

import clock
import hardware
import debug

#define constants
printDelay = .001
clkPin = -1
busPins = []
switchPins = []
selectionPins =[]


#create objects
clk = clock.clock()
dipSwitch = hardware.dipSwitch(switchPins,logic = 1)
printer = hardware.printer(printDelay,"c",clkPin,busPins,selectionPins)

#run the clock
try:
#if 1==1:
	if len(sys.argv) > 1 and sys.argv[1] == "-d" :
		if len(sys.argv) > 2 and sys.argv[2] == "-v":
			verbose = True
		else:
			verbose = False
		test = debug.test(clk,dipSwitch,printer,verbose)
		retCode = 0
		while retCode != -3:
			retCode = test.run()
			if(retCode == -4):
				raise Exception('terminate')
	print("running clock")
	while 1 == 1:
		clk.updateBase(dipSwitch.readBase())
		clk.updateTime()
		clk.convert()
		printer.updateRegs(clk)
#		time.sleep(1)
except:
#else:
	print("\nexiting")
