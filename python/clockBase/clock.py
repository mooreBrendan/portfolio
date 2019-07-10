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
		self.baseHour = []
		self.baseMin = []
		self.baseSec = []
		while self.hour >0:
			self.baseHour.prepend(self.hour %base)
			self.hour = (self.hour - (self.hour %base))/base
		while self.min >0:
			self.baseMin.prepepend(self.min %base)
			self.min = (self.min - (self.min %base))/base
		while self.sec >0:
			self.baseSec.prepend(self.sec %base)
			self.sec = (self.sec - (self.sec %base))/base
