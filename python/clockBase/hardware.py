import time
import RPI.GPIO as GPIO

class printer:
	def __init__(self, delay, segType):
		GPIO.setmode(GPIO.BCM)
		if(len(clk) == 1):
			self.__clk = self.__setUpPin(0,clk,GPIO.OUT)
		else:
			self.__clk = self.__setUpPin(0,0,GPIO.OUT)

		self.__bus = []
		if(len(bus) == 8):
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

		self.__switch = []
		if(len(switch) == 4):
			self.__switch.append(self.__setUpPin(9,switch[0],GPIO.IN))
			self.__switch.append(self.__setUpPin(10,switch[1],GPIO.IN))
			self.__switch.append(self.__setUpPin(11,switch[2],GPIO.IN))
			self.__switch.append(self.__setUpPin(12,switch[3],GPIO.IN))
		else:
			self.__switch.append(self.__setUpPin(9,9,GPIO.IN))
			self.__switch.append(self.__setUpPin(10,10,GPIO.IN))
			self.__switch.append(self.__setUpPin(11,11,GPIO.IN))
			self.__switch.append(self.__setUpPin(12,12,GPIO.IN))

		self.__delay = delay
		if(segType == 'a' or segType == 'A'):
			self.__type = 'a'
		else:
			self.__type = 'c'
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
			' ' : "00000000"
		}
	def parse(self,clock):
		#disable output display
		for i in range(6):
			self.__write(self.__conv(clock.baseHour[i]))
			self.__write(self.__conv(clock.baseMin[i]))
			self.__write(self.__conv(clock.baseSec[i]))
		#enable output display

#setup pin
	def __setUpPin(self,default,pin,mode):
		try:
			pin = int(pin)
			GPIO.setMode(pin,mode)
			return(pin)
		except:
			GPIO.setMode(default,mode)
			return(default)

#parse dip switch
	def __readBase(self):
		self.__prevBase = self.__base
		self.__base = 0
		for i in self.__switch
			self.__base = 2 * self.__base
			if(GPIO.input(i)):
				self.__base = self.__base + 1
	def __conv(self,char):
		#convert to bits in 7 seg disp
		return(self.__dict[char])

	def __write(self,segments):
		#output the bits
		for i in range(segments):
			#write each bit
			if(self.__type == 'c'):
				if(seg ==  '1'):
					GPIO.OUTPUT(self.__bus[i],GPIO.HIGH)
				else:
					GPIO.OUTPUT(self.__bus[i],GPIO.LOW)
			else:
				if(seg == '1'):
					GPIO.OUTPUT(self.__bus[i],GPIO.LOW)
				else:
					GPIO.OUTPUT(self.__bus[i],GPIO.HIGH)
		GPIO.OUTPUT(self.__clock,GPIO.HIGH)
		time.sleep(self.__delay)
		GPIO.OUTPUT(self.__clock,GPIO.LOW)
		
#update registers
	def __updateRegs(self):
		if(self.__prevBase != self.__base):
			self.__updateSec()
			self.__updateMin()
			self.__updateHour()
			self.__updateBase()
		else:
			if(self.__prevSec != self.baseSec):
				self.__updateSec()
			if(self.__prevMin != self.baseMin):
					self.__updateMin()
			if(self.__prevHour != self.baseHour):
					self.__updateHour()


#**********************************************
#update second registers
	def __updateSec(self);
		os.sleep(1)

#update minute registers
	def __updateMin(self);
		os.sleep(1)

#update hour registers
	def __updateHour(self):
		os.sleep(1)

#update base register
	def __updateBase(self):
		os.sleep(1)
