# imports
############################################
from enum import Enum


# Global variables
############################################
winValue = 10

############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
def diceRoll:
	dice1 = random(1,6)
	dice2 = random(1,6)
	return(dice1 + dice2)


############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
class Terrains(Enum):
	Mountains = "ore"
	Hills = "brick"
	Plains = "sheep"
	Forests = "wood"
	Fields = "wheat"
	Desert = "none"


############################################
# Class:
#	Inputs:
# Methods:
# Purpose:
############################################
class Player:
	def __init__(self,token):
		self.__cards = []
		self.__ore = 0
		self.__brick = 0
		self.__sheep = 0
		self.__wood = 0
		self.__wheat = 0
		self.__nodes = []
		self.__edges = []
		self.__victoryPoints = 0
		self.sessionToken = token
	def cullCards(self):
		if len(self.__cards) > 7:
			#choose cards to remove
			needToRemove = int(self.__cards /2)
			numRemoved = 0
			while numRemoved < needToRemove:
				#ask cards to remove
				#cardRemoved = getRemoved()
				self.__cards.remove(1)
				numRemoved += 1

	def buildTrade(self):
		choice = ""
		while choice != "end":
			choice = self.getChoice()
			if choice == "trade":
				print("trade")
			elif choice == "build":
				print("build")
			elif choice != "end":
				print("Error: choice not recognized")

	def getChoice(self):
		choice = "end"
		##########
		return choice

	def checkWin(self):
		return (self.__victoryPoints >= winValue) 


############################################
# Class:
#	Inputs:
# Methods:
# Purpose:
############################################
class Node:
	def __init__(self,edges):
		self.__owner = None
		self.__edges = edges


############################################
# Class:
#	Inputs:
# Methods:
# Purpose:
############################################
class Edge:
	def __init__(self,tiles):
		self.__owner = None
		self.__tiles = tiles

	def setOwner(self,player):
		self.__owner = player
	
	def giveResource(self,resource):
		if self.owner != None:
			self.owner[resource] += 1



############################################
# Class:
#	Inputs:
# Methods:
# Purpose:
############################################
class Tile:
	def __init__(self,number,terrain):
		self.number = number
		self.terrain = terrain
		self.resource = Terrains(terrain)
		self.edges = self.genEdges()

	def genEdges(self):
		edges = []
		for i in range(6):
			edges.append(Edge([]))
		return edges

	def giveResources(self):
		for i in self.edges:
			i.giveResource(self.resource)
