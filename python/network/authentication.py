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

if __name__ == "__main__":
	authServ = authenticator(sys.argv[1], sys.argv[2])
	print("running")
	authServ.run()
