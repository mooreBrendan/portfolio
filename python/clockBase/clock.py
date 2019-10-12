import time

class clock():
	def __init__(self):
		self.__dict = {
			0 : "0",
			1 : "1",
			2 : "2",
			3 : "3",
			4 : "4",
			5 : "5",
			6 : "6",
			7 : "7",
			8 : "8",
			9 : "9",
			10 : "a",
			11 : "b",
			12 : "c",
			13 : "d",
			14 : "e",
			15 : "f"
		}
		self.__base = 10
		self.__prevBase = "-1"
		self.__prevHour = "-1"
		self.__prevMin = "-1"
		self.__prevSec = "-1"

	#update base
	def updateBase(self,base):
		self.__base = base
	
	def updateSec(self,secVal):
		self.sec = secVal
	
	def updateMin(self,minVal):
		self.min = minVal
	
	def updateHour(self,hourVal):
		self.hour = hourVal
	
	def giveBase(self):
		return(self.__base)

	#update clock values
	def updateTime(self):
		self.updateHour( time.localtime().tm_hour%12)
		self.updateMin( time.localtime().tm_min)
		self.updateSec( time.localtime().tm_sec)

	#convert to base
	def convert(self):
		if(self.sec != self.__prevSec):
			self.baseHour = ""
			self.baseMin = ""
			self.baseSec = ""
			self.tempHour = self.hour
			self.tempMin = self.min
			self.tempSec = self.sec
			while self.tempSec >0:
				self.baseSec = self.__dict[self.tempSec % self.__base] + self.baseSec
				self.tempSec = int((self.tempSec - (self.tempSec % self.__base) ) / self.__base)
			if self.baseSec == "":
				self.baseSec = "0"
			while len(self.baseSec) < 6:
				self.baseSec = " " + self.baseSec
			if(self.min != self.__prevMin):
				while self.tempMin >0:
					self.baseMin = self.__dict[self.tempMin % self.__base] + self.baseMin
					self.tempMin = int((self.tempMin - (self.tempMin % self.__base) ) / self.__base)
				if self.baseMin == "":
					self.baseMin = "0"
				while len(self.baseMin) < 6:
					self.baseMin = "0" + self.baseMin
				if(self.hour != self.__prevHour):
					while self.tempHour >0:
						self.baseHour = self.__dict[self.tempHour % self.__base] + self.baseHour
						self.tempHour = int((self.tempHour - (self.tempHour % self.__base) ) / self.__base)
						if self.baseHour == "":
							self.baseHour = "0"
					while len(self.baseHour) < 4:
						self.baseHour = "0" + self.baseHour
