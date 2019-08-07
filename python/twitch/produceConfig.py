import configparser

configFileName = 'config2.ini'
config = configparser.ConfigParser()
config['DEFAULT'] = {'user': '', 'client_id': '', 'oauth_token': ''}

with open(configFileName, 'w') as configfile:
	config.write(configfile)
