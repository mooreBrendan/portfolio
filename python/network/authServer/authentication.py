import sys
import socket

class authenticator:
	def __init__(self, socketNum, commandServer):
		self.__socketNum = socketNum
		self.__commandServer = self.__authenticate(commandServer)

	def handleCommand(self, command):
		parsedCommand = command.split("\0")
		if parsedCommand[0] == "auth":
			print("text")
		else:
			if self.__verifyToken(parsedCommand[1]):
				response = self.__passCommand(parsedCommand[2])
				self.__passResponse(response)
			else:
				self.__respondError()

	def run(self):
		threads = []
		while 1 == 1:
			command = self.__listen(self, portnum)
			#TODO:
			#spawn thread and run

if __name__ == "__main__":
	authServ = authenticator(sys.argv[1], sys.argv[2])
	print("running")
	authServ.run()
