# imports
############################################
from catan import *



############################################
# Function: getNumPlayers
#	Inputs: none
# Returns: integer number of players
# Purpose: takes the input number of players
############################################
def getNumPlayers:
	#TODO:
	#prompt number of players
	return 4


############################################
# Function: getTokens
#	Inputs: numPlayer, the number of players in the game
# Returns: the list of tokens for identifying players
# Purpose: for getting initial assignment of each user
############################################
def getTokens(numPlayers):
	tokens = []
	#TODO:
	#wait for number of players to join
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
	for token in tokens:
		color = promptColor(token)
		players.append(Player(token, color))
	return(players)

############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################
def getTiles(mode):
	tiles = []
	if mode == "standard":
		tiles = []
	elif mode == "random":
		tiles = []
	else:
		tiles = []
	return tiles
	
# MAIN
############################################
if __name__ == "__main__":
	print("running")

	players = getPlayers()
	
	#initial city placement
	for i in players:
		i.placeCity()

	#first road placement
	for i in players:
		i.placeRoad()

	#main game loop
	finished = False
	index = 0
	while not finished:
		if not finished:
			dice1, dice2 = diceRoll()
			for j in players:
				j.showDice(dice1, dice2)

			roll = dice1 + dice2
			if roll == 7:
				for j in players:
					j.cullCards()
				players[index].moveRobber()
			else:
				for j in tiles[roll-2]:
					j.giveResources()
			players[index].buildTrade()

			if players[index].checkWin():
				print("Game Over, {} won".format(players[index].color))
				finished = True
		index = (index + 1) % numplayers


############################################
# Function:
#	Inputs:
# Returns:
# Purpose:
############################################

