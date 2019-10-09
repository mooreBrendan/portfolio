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
		#set up switch for clock base
		self.__pins = []
		if(type(switch) == list and len(switch) == 4):
			self.__pins.append(self.__setUpPin(9,switch[0],GPIO.IN))
			self.__pins.append(self.__setUpPin(10,switch[1],GPIO.IN))
			self.__pins.append(self.__setUpPin(11,switch[2],GPIO.IN))
			self.__pins.append(self.__setUpPin(12,switch[3],GPIO.IN))
		else:
			self.__pins.append(self.__setUpPin(9,9,GPIO.IN))
			self.__pins.append(self.__setUpPin(10,10,GPIO.IN))
			self.__pins.append(self.__setUpPin(11,11,GPIO.IN))
			self.__pins.append(self.__setUpPin(12,12,GPIO.IN))

	#setup pin
	def __setUpPin(self,default,pin,mode):
		try:
			pin = int(pin)
			GPIO.setup(pin,mode)
			return(pin)
		except:
			GPIO.setup(default,mode)
			return(default)
	
	#parse dip switch
	def readBase(self):
		self.__prevBase = self.__base
		self.__base = 0
		for i in self.__pins:
			self.__base = 2 * self.__base
			if(GPIO.input(i)):
				self.__base = self.__base + 1
		if(self.__base < 2):
			self.__base = 2
		return(self.__base)



class printer:
	def __init__(self, delay, segType,clk,bus,select):
#		GPIO.setmode(GPIO.BCM)
		
		#set up clock pin
		if(type(clk) == int):
			self.__clk = self.__setUpPin(0,clk,GPIO.OUT)
		else:
			self.__clk = self.__setUpPin(0,0,GPIO.OUT)

		#set up bus
		self.__bus = []
		if(type(bus) == list and len(bus) == 8):
			self.__bus.append( self.__setUpPin(1,bus[0],GPIO.OUT))
			self.__bus.append( self.__setUpPin(2,bus[1],GPIO.OUT))
			self.__bus.append( self.__setUpPin(3,bus[2],GPIO.OUT))
			self.__bus.append( self.__setUpPin(4,bus[3],GPIO.OUT))
			self.__bus.append( self.__setUpPin(5,bus[4],GPIO.OUT))
			self.__bus.append( self.__setUpPin(6,bus[5],GPIO.OUT))
			self.__bus.append( self.__setUpPin(7,bus[6],GPIO.OUT))
			self.__bus.append( self.__setUpPin(8,bus[7],GPIO.OUT))
		else:
			self.__bus.append( self.__setUpPin(1,1,GPIO.OUT))
			self.__bus.append( self.__setUpPin(2,2,GPIO.OUT))
			self.__bus.append( self.__setUpPin(3,3,GPIO.OUT))
			self.__bus.append( self.__setUpPin(4,4,GPIO.OUT))
			self.__bus.append( self.__setUpPin(5,5,GPIO.OUT))
			self.__bus.append( self.__setUpPin(6,6,GPIO.OUT))
			self.__bus.append( self.__setUpPin(7,7,GPIO.OUT))
			self.__bus.append( self.__setUpPin(8,8,GPIO.OUT))


		#set up selection pins
		self.__select = []
		if(type(select) == list and len(select) == 9):
			self.__select.append(self.__setUpPin(13,select[0],GPIO.OUT))
			self.__select.append(self.__setUpPin(14,select[1],GPIO.OUT))
			self.__select.append(self.__setUpPin(15,select[2],GPIO.OUT))
			self.__select.append(self.__setUpPin(16,select[3],GPIO.OUT))
			self.__select.append(self.__setUpPin(17,select[4],GPIO.OUT))
			self.__select.append(self.__setUpPin(18,select[5],GPIO.OUT))
			self.__select.append(self.__setUpPin(19,select[6],GPIO.OUT))
			self.__select.append(self.__setUpPin(20,select[7],GPIO.OUT))
			self.__select.append(self.__setUpPin(21,select[8],GPIO.OUT))
		else:
			self.__select.append(self.__setUpPin(13,13,GPIO.OUT))
			self.__select.append(self.__setUpPin(14,14,GPIO.OUT))
			self.__select.append(self.__setUpPin(15,15,GPIO.OUT))
			self.__select.append(self.__setUpPin(16,16,GPIO.OUT))
			self.__select.append(self.__setUpPin(17,17,GPIO.OUT))
			self.__select.append(self.__setUpPin(18,18,GPIO.OUT))
			self.__select.append(self.__setUpPin(19,19,GPIO.OUT))
			self.__select.append(self.__setUpPin(20,20,GPIO.OUT))
			self.__select.append(self.__setUpPin(21,21,GPIO.OUT))

		#set up seven segment mode
		self.__delay = delay
		if(segType == 'a' or segType == 'A'):
			self.__type = 'a'
		else:
			self.__type = 'c'
		
		#set up dictionary for selection of registers
		self.__regs ={
			"base0":"100000000",
			"hour3":"010000000",
			"hour2":"001000000",
			"hour1":"000111000",
			"hour0":"000110000",
			"min_5":"000101000",
			"min_4":"000100000",
			"min_3":"000011000",
			"min_2":"000010000",
			"min_1":"000001000",
			"min_0":"000000111",
			"sec_5":"000000110",
			"sec_4":"000000101",
			"sec_3":"000000100",
			"sec_2":"000000011",
			"sec_1":"000000010",
			"sec_0":"000000001"
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
		self.__prevBase = "-1"
		self.__prevSec = "-1"
		self.__prevMin = "-1"
		self.__prevHour = "-1"
		self.__base = "-1"

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
		if(self.__prevBase != clk.base):
			self.updateSec(clk.baseSec)
			self.updateMin(clk.baseMin)
			self.updateHour(clk.baseHour)
			self.updateBase(clk.base)
		else:
			if(self.__prevSec != clk.baseSec):
				self.updateSec(clk.baseSec)
				if(self.__prevMin != clk.baseMin):
					self.updateMin(clk.baseMin)
					if(self.__prevHour != clk.baseHour):
						self.updateHour(clk.baseHour)
		self.__prevBase = clk.base
		self.__prevSec = clk.baseSec
		self.__prevMin = clk.baseMin
		self.__prevHour = clk.baseHour

	#update second registers
	def updateSec(self,second):
		for i in range(len(second)):
			if (self.__prevSec[i] != second[i]):
				self.write(self.__regs("sec_"+str(i),second[i]))

	#update minute registers
	def updateMin(self, minute):
		for i in range(len(minute)):
			if (self.__prevMin[i] != minute[i]):
				self.write(self.__regs("min_"+str(i),minute[i]))

	#update hour registers
	def updateHour(self,hour):
		for i in range(len(hour)):
			if (self.__prevHour[i] != hour[i]):
				self.write(self.__regs("hour"+str(i),hour[i]))

	#update base register
	def updateBase(self,base):
		if (self.__prevBase != base):
			self.write(self.__regs("base0",base))


	#output values
	def write(self,register,character):
		#write selection
		try:
			select = self.__regs[register]
		except:
			return(-1)
#		self.__writeSel(select)
		x = threading.Thread(target=self.__writeSel,args = (select,))
#		threads.append(x)
		x.start()

		#write to bus
		segments = self.__dict[character]
		self.__writeBus(segments)

		x.join()
		#run clock for update	
		GPIO.output(self.__clk,GPIO.HIGH)
		time.sleep(self.__delay)
		GPIO.output(self.__clk,GPIO.LOW)
		time.sleep(self.__delay)
		return(0)

	def __writeSel(self,sel):
		for i in range(len(sel)):
			if(sel[i] ==  '1'):
				GPIO.output(self.__select[i],GPIO.HIGH)
			else:
				GPIO.output(self.__select[i],GPIO.LOW)


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
