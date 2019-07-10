import time

class clock():
	def __init__(self,base):
		base = int(base)
		if(base < 2):
			self.base = 2
		elif(base >16):
			self.base = 16
		else:
			self.base = base
	def update(self, base):
		self.hour = time.localtime().tm_hour
		self.min = time.localtime().tm_min
		self.sec = time.localtime().tm_sec
		self.base = base
	def convert(self):
		self.baseHour = ""
		self.baseMin = ""
		self.baseSec = ""
		while self.hour >0:
			self.baseHour = str(self.hour % self.base) + self.baseHour
			self.hour = int((self.hour - (self.hour % self.base) ) / self.base)
		while self.min >0:
			self.baseMin = str(self.min % self.base) + self.baseMin
			self.min = int((self.min - (self.min % self.base) ) / self.base)
		while self.sec >0:
			self.baseSec = str(self.sec % self.base) + self.baseSec
			self.sec = int((self.sec - (self.sec % self.base) ) / self.base)
