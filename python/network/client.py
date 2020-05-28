import sys
import socket

class client:
	def __init__(self, socketNum):
		self.__socketNum = socketNum

	def __sendCommand(self, command):
		print(command)

	def __authenticate(self, portNum):
		return 0

	def run()
		#connect to authentication server
		response = 0
		while response != 1:
			port = input("server port num: ")
			try:
				response = self.__authenticate(int(port))
			except:
				print("invalid port")
		self.authServer = port

		#command prompt
		while 1 == 1:
			command = input("cmd: ")
			cmd = self.__validateCmd(command)
			if cmd != ""
				self.__sendCommand(cmd)

if __name__ == "__main__":
	cl = client(sys.argv[1])
	print("running")
	cl.run()
