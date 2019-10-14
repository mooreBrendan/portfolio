#https://realpython.com/intro-to-python-threading/
#https://www.programiz.com/python-programming/time/sleep
#https://learn.sparkfun.com/tutorials/raspberry-gpio/all

import threading
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

class dipSwitch:
	def __init__(self,switch):
		self.__default = [9,10,11,12]
	
		#set up switch for clock base
		self.__pins = []
		if(type(switch) == list and len(switch) == 4):
			for i in range(len(self.__default)):
				self.__pins.append(self.__setUpPin(self.__default[i],switch[i]))
		else:
			for i in range(len(self.__default)):
				self.__pins.append(self.__setUpPin(self.__default[i],self.__default[i]))

	#setup pin
	def __setUpPin(self,default,pin):
		try:
			pin = int(pin)
			GPIO.setup(pin,GPIO.IN)
			return(pin)
		except:
			GPIO.setup(default,GPIO.IN)
			return(default)

	#parse dip switch
	def readBase(self):
		self.__base = 0
		for i in self.__pins:
			self.__base = 2 * self.__base
			if(GPIO.input(i)):
				self.__base = self.__base + 1
		if(self.__base == 0):
			self.__base = 2
		else:
			self.__base = self.__base +1
		return(self.__base)

class selector:
	def __init__(self,default,pins):
		#set up selection pins
		self.__pins = []
		if(type(pins) == list and len(pins) == 3):
			self.__pins.append(self.__setUpPin(default[0],pins[0]))
			self.__pins.append(self.__setUpPin(default[1],pins[1]))
			self.__pins.append(self.__setUpPin(default[2],pins[2]))
		else:
			self.__pins.append(self.__setUpPin(default[0],default[0]))
			self.__pins.append(self.__setUpPin(default[1],default[1]))
			self.__pins.append(self.__setUpPin(default[2],default[2]))
		
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
	def __setUpPin(self,default,pin):
		try:
			pin = int(pin)
			GPIO.setup(pin,GPIO.OUT)
			return(pin)
		except:
			GPIO.setup(default,GPIO.OUT)
			return(default)
		
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
	def __init__(self, delay, segType,clk,bus,select):
#		GPIO.setmode(GPIO.BCM)
		
		#default pins	
		self.__busDef =[1,2,3,4,5,6,7,8]
		self.__selDef =[13,14,15,16,17,18,19,20,21]
		
		#set up clock pin
		if(type(clk) == int):
			self.__clk = self.__setUpPin(0,clk,GPIO.OUT)
		else:
			self.__clk = self.__setUpPin(0,0,GPIO.OUT)

		#set up bus
		self.__bus = []
		if(type(bus) == list and len(bus) == 8):
			for i in range(len(self.__busDef)):
				self.__bus.append( self.__setUpPin(self.__busDef[i],bus[i],GPIO.OUT))
		else:
			for i in range(len(self.__busDef)):
				self.__bus.append( self.__setUpPin(self.__busDef[i],self.__busDef[i],GPIO.OUT))

		if(type(select) == list and len(select) == 9):
			self.__highSel = selector(self.__selDef[0:3],select[0:2])
			self.__midSel = selector(self.__selDef[3:6],select[3:5])
			self.__lowSel = selector(self.__selDef[6:9],select[6:8])
		else:
			self.__highSel = selector(self.__selDef[0:3],self.__selDef[0:3])
			self.__midSel = selector(self.__selDef[3:6],self.__selDef[3:6])
			self.__lowSel = selector(self.__selDef[6:9],self.__selDef[6:9])

		#set up seven segment mode
		self.__delay = delay
		if(segType == 'a' or segType == 'A'):
			self.__type = 'a'
		else:
			self.__type = 'c'
		
		#set up dictionary for selection of registers
		self.__regs ={
			"base0":"300",
			"hour3":"200",
			"hour2":"100",
			"hour1":"070",
			"hour0":"060",
			"min_5":"050",
			"min_4":"040",
			"min_3":"030",
			"min_2":"020",
			"min_1":"010",
			"min_0":"007",
			"sec_5":"006",
			"sec_4":"005",
			"sec_3":"004",
			"sec_2":"003",
			"sec_1":"002",
			"sec_0":"001"
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
			15  : "10001110"
		}

		#initialize base
		self.__prevBase = ""
		self.__prevSec = ""
		self.__prevMin = ""
		self.__prevHour = ""
		self.__base = ""

	#setup pin
	def __setUpPin(self,default,pin,mode):
		try:
			pin = int(pin)
			GPIO.setup(pin,mode)
			return(pin)
		except:
			GPIO.setup(default,mode)
			return(default)


	#update registers
	def updateRegs(self,clk):
		if(self.__prevBase != clk.giveBase()):
			self.updateSec(clk.baseSec)
			self.updateMin(clk.baseMin)
			self.updateHour(clk.baseHour)
			self.updateBase(clk.giveBase())
		else:
			if(self.__prevSec != clk.baseSec):
				self.updateSec(clk.baseSec)
				if(self.__prevMin != clk.baseMin):
					self.updateMin(clk.baseMin)
					if(self.__prevHour != clk.baseHour):
						self.updateHour(clk.baseHour)
		self.__prevBase = clk.giveBase()
		self.__prevSec = clk.baseSec
		self.__prevMin = clk.baseMin
		self.__prevHour = clk.baseHour

	#update second registers
	def updateSec(self,second):
		for i in range(len(second)):
			if (i >= len(self.__prevSec) or i >= len(second)  or self.__prevSec[i] != second[i]):
				self.write("sec_"+str(i),second[i])

	#update minute registers
	def updateMin(self, minute):
		for i in range(len(minute)):
			if (i >= len(self.__prevMin) or i >= len(minute)  or self.__prevMin[i] != minute[i]):
				self.write("min_"+str(i),minute[i])

	#update hour registers
	def updateHour(self,hour):
		for i in range(len(hour)):
			if (i >= len(self.__prevHour) or i >= len(hour)  or self.__prevHour[i] != hour[i]):
				self.write("hour"+str(i),hour[i])

	#update base register
	def updateBase(self,base):
		if (self.__prevBase != base):
			self.write("base0",base)


	#output values
	def write(self,register,character):
		#write to bus
		x = threading.Thread(target=self.__writeBus,args = (self.__dict[character],))
		x.start()
	#	segments = self.__dict[character]
	#	self.__writeBus(segments)


		#write selection
		try:
			select = self.__regs[register]
		except:
			return(-1)
		self.__writeSel(select)
		

		x.join()
		#run clock for update	
		GPIO.output(self.__clk,GPIO.HIGH)
		time.sleep(self.__delay)
		GPIO.output(self.__clk,GPIO.LOW)
		time.sleep(self.__delay)
		return(0)

	def __writeSel(self,sel):
		self.__highSel.write(sel[0])
		self.__midSel.write(sel[1])
		self.__lowSel.write(sel[2])

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
