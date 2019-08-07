import configparser
import twitch
from time import sleep

config = configparser.ConfigParser()
config.read('config.ini')
print(config['credentials']['user'])
print(config['credentials']['client_id'])
print(config['credentials']['oauth_token'])

client = twitch.TwitchClient(client_id = config['credentials']['client_id'])
channel = client.channels.get_by_id(44322889)

print(channel.id)
print(channel.name)
print(channel.display_name)

while true:
	sleep(1)
