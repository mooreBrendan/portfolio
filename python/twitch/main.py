import config
from twitch import TwitchClient

print(config.client_id)
print(config.oauth_token)

client = TwitchClient(client_id = config.client_id)
channel = client.channels.get_by_id(44322889)

print(channel.id)
print(channel.name)
print(channel.display_name)
