#https://realpython.com/intro-to-python-threading/
#https://www.programiz.com/python-programming/time/sleep
#https://learn.sparkfun.com/tutorials/raspberry-gpio/all

import threading
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

class dipSwitch:
	def __init__(self,logicHigh = 0):
		self.__default = [2,3,4,17]
		if logicHigh == 0:
			self.high = GPIO.HIGH
		else:
			self.high = GPIO.LOW
		
		#set up switch for clock base
		self.__pins = []
		for i in range(len(self.__default)):
			self.__pins.append(self.__setUpPin(self.__default[i]))

	def printPins(self):
		print("dip: ",self.__pins)
	
	def printRead(self):
		temp = ""
		for i in self.__pins:
			if(GPIO.input(i) == self.high):
				temp = temp + "1"
			else:
				temp = temp + "0"
		print(temp)

	#setup pin
	def __setUpPin(self,pin):
		try:
			pin = int(pin)
			GPIO.setup(pin,GPIO.IN)
			return(pin)
		except:
			return(-1)

	#parse dip switch
	def readBase(self):
		self.__base = 0
		for i in self.__pins:
			self.__base = self.__base << 1
			if(GPIO.input(i) == self.high):
				self.__base = self.__base + 1
		if(self.__base == 0):
			self.__base = 2
		else:
			self.__base = self.__base +1
		return(self.__base)

class selector:
	def __init__(self,default):
		#set up selection pins
		self.__pins = []
		self.__pins.append(self.__setUpPin(default[0]))
		self.__pins.append(self.__setUpPin(default[1]))
		self.__pins.append(self.__setUpPin(default[2]))
		
		self.__select = {
			"0":"000",
			"1":"001",
			"2":"010",
			"3":"011",
			"4":"100",
			"5":"101",
			"6":"110",
			"7":"111"
		}
	#setup pin
	def __setUpPin(self,pin):
		try:
			pin = int(pin)
			GPIO.setup(pin,GPIO.OUT)
			return(pin)
		except:
			return(-1)
	
	#print the current pins
	def printPins(self):
		return(self.__pins)
	
	#set the selection values
	def write(self,char):
		try:
			sel = self.__select[char]
		except:
			return(-1)
		for i in range(len(sel)):
			if(sel[i] ==  '1'):
				GPIO.output(self.__pins[i],GPIO.HIGH)
			else:
				GPIO.output(self.__pins[i],GPIO.LOW)

class printer:
	def __init__(self, delay, segType):
		
		#default pins	
		#self.__busDef =[27,22,10,9,11,0,5,6]
		self.__busDef =[10,9,5,0,11,22,27,6]
		self.__selDef =[13,19,26,14,15,18,23,24,25]
		self.__clkDef = 8 
		
		#set up clock pin
		self.__clk = self.__setUpPin(self.__clkDef)

		#set up bus
		self.__bus = []
		for i in range(len(self.__busDef)):
			self.__bus.append( self.__setUpPin(self.__busDef[i]))

		self.__highSel = selector(self.__selDef[0:3])
		self.__midSel = selector(self.__selDef[3:6])
		self.__lowSel = selector(self.__selDef[6:9])

		#set up seven segment mode
		self.__delay = delay
		if(segType == 'a' or segType == 'A'):
			self.__type = 'a'
		else:
			self.__type = 'c'
		
		#set up dictionary for selection of registers
		self.__regs ={
			"base0":"500",
			"hour3":"400",
			"hour2":"300",
			"hour1":"200",
			"hour0":"100",
			"min_5":"060",
			"min_4":"050",
			"min_3":"040",
			"min_2":"030",
			"min_1":"020",
			"min_0":"010",
			"sec_5":"006",
			"sec_4":"005",
			"sec_3":"004",
			"sec_2":"003",
			"sec_1":"002",
			"sec_0":"001",
			"desel":"000"
		}

		#set up dictionary for seven segment output
		self.__dict = {
			'0' : "11111100",
			'1' : "01100000",
			'2' : "11011010",
			'3' : "11110010",
			'4' : "01100110",
			'5' : "10110110",
			'6' : "10111110",
			'7' : "11100000",
			'8' : "11111110",
			'9' : "11100110",
			'a' : "11101110",
			'b' : "00111110",
			'c' : "10011100",
			'd' : "01111010",
			'e' : "10011110",
			'f' : "10001110",
			'g' : "11110110",
			' ' : "00000000",
			0   : "11111100",
			1   : "01100000",
			2   : "11011010",
			3   : "11110010",
			4   : "01100110",
			5   : "10110110",
			6   : "10111110",
			7   : "11100000",
			8   : "11111110",
			9   : "11100110",
			10  : "11101110",
			11  : "00111110",
			12  : "10011100",
			13  : "01111010",
			14  : "10011110",
			15  : "10001110",
			16	: "11110110"
		}

		#initialize base
		self.__prevBase = ""
		self.__prevSec = ""
		self.__prevMin = ""
		self.__prevHour = ""
		self.__base = ""

	def printPins(self):
		print("bus: ",self.__bus)
		print("high: ",list(self.__highSel.printPins()))
		print("mid: ",list(self.__midSel.printPins()))
		print("low: ",list(self.__lowSel.printPins()))
		print("clk: ",self.__clk)

	#setup pin
	def __setUpPin(self,pin):
		try:
			pin = int(pin)
			GPIO.setup(pin,GPIO.OUT)
			return(pin)
		except:
			return(-1)


	#update registers
	def updateRegs(self,clk):
#		if(self.__prevBase != clk.giveBase()):
		self.updateSec(clk.baseSec)
		self.updateMin(clk.baseMin)
		self.updateHour(clk.baseHour)
		self.updateBase(clk.giveBase())
#		else:
#			if(self.__prevSec != clk.baseSec):
#				self.updateSec(clk.baseSec)
#				if(self.__prevMin != clk.baseMin):
#					self.updateMin(clk.baseMin)
#					if(self.__prevHour != clk.baseHour):
#						self.updateHour(clk.baseHour)
		self.__prevBase = clk.giveBase()
		self.__prevSec = clk.baseSec
		self.__prevMin = clk.baseMin
		self.__prevHour = clk.baseHour

	#update second registers
	def updateSec(self,second):
		for i in range(len(second)):
			if (i >= len(self.__prevSec) or i >= len(second)  or self.__prevSec[i] != second[i]):
				self.write("sec_"+str(5-i),second[i])

	#update minute registers
	def updateMin(self, minute):
		for i in range(len(minute)):
			if (i >= len(self.__prevMin) or i >= len(minute)  or self.__prevMin[i] != minute[i]):
				self.write("min_"+str(5-i),minute[i])

	#update hour registers
	def updateHour(self,hour):
		for i in range(len(hour)):
			if (i >= len(self.__prevHour) or i >= len(hour)  or self.__prevHour[i] != hour[i]):
				self.write("hour"+str(3-i),hour[i])

	#update base register
	def updateBase(self,base):
		#if (self.__prevBase != base):
		self.write("base0",base)


	#output values
	def write(self,register,character):
		#write to bus
		x = threading.Thread(target=self.__writeBus,args = (self.__dict[character],))
		x.start()

		#write selection
		if(self.writeSel(register) == -1):
			x.join
			return(-1)

		x.join()
		#run clock for update	
		self.clkLow()
		time.sleep(self.__delay)
		self.clkHigh()
		time.sleep(self.__delay)
		return(0)

	def clkHigh(self):
		GPIO.output(self.__clk,GPIO.HIGH)
	
	def clkLow(self):	
		GPIO.output(self.__clk,GPIO.LOW)

	def writeSel(self,sel):
		try:
			select = self.__regs[sel]
		except:
			return(-1)
		self.__highSel.write(select[0])
		self.__midSel.write(select[1])
		self.__lowSel.write(select[2])
		return(0)

	def __writeBus(self,segments):
		for i in range(len(segments)):
			if(self.__type == 'c'):
				if(segments[i] ==  '1'):
					GPIO.output(self.__bus[i],GPIO.HIGH)
				else:
					GPIO.output(self.__bus[i],GPIO.LOW)
			else:
				if(segments[i] == '1'):
					GPIO.output(self.__bus[i],GPIO.LOW)
				else:
					GPIO.output(self.__bus[i],GPIO.HIGH)
