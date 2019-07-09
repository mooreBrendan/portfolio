import time

class clock():
	def __init__(self,base):
		self.base = base
	def update(self):
		self.hour = time.localtime().tm_hour
		self.min = time.localtime().tm_min
		self.sec = time.localtime().tm_sec
