from enum import Enum

def diceRoll:
	dice1 = random(1,6)
	dice2 = random(1,6)
	return(dice1 + dice2)

class Terrains(Enum):
	Mountains = "ore"
	Hills = "brick"
	Plains = "sheep"
	Forests = "wood"
	Fields = "wheat"
	Desert = "none"

class Player:
	def __init__(self):
		self.__cards = []
		self.__ore = 0
		self.__brick = 0
		self.__sheep = 0
		self.__wood = 0
		self.__wheat = 0
		self.__nodes = []
		self.__edges = []
		self.__victoryPoints = 0

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
		return "end"


class Node:
	def __init__(self,edges):
		self.__owner = None
		self.__edges = edges

class Edge:
	def __init__(self,tiles):
		self.__owner = None
		self.__tiles = tiles

