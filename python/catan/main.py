# imports
############################################
from catan import *



############################################
# Function: getNumPlayers
#	Inputs: none
# Returns: the number of players
# Purpose: takes the input number of players
############################################
def getNumPlayers:
	return 4


############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
def getTokens(numPlayers):
	tokens = []
	############
	return tokens


############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
def getPlayers:
	numPlayers = getNumPlayers()
	tokens = getTokens(numPlayers)
	players = []
	for i in tokens:
		players.append(Player(i))
	return(players)

############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
def getTiles:
	tiles = []
	
	return tiles
	
# MAIN
############################################
if __name__ == "__main__":
	print("running")

	players = getPlayers()
	
	finished = False
	while not finished:
		for i in players:
			if not finished:
				roll = diceRoll()
				if roll == 7:
					for j in players:
						j.cullCards()
					i.moveRobber
				i.buildTrade()
				if i.checkWin():
					print("Game Over, {} won".format(i.color))
					finished = True



############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################

