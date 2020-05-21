# Pump Up The Jam

A chrome extension made to enable you to play your favourite songs on youtube at any BPM you desire. Youtube's default playback rate options (1.25x, 1.5x etc) work horribly with music and therefore being able to change the actual BPM of the music is much better.

## How does this work?

This extension uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to gather information such as BPM and other data points about a particular song and with that information it then enables altering of BPM.

## Installation

Since the extension is not on the Google play store you're going to need to load the extension locally to run it. At the moment it is very fragile and prone to bugs but it work's in principle. To install follow these steps:
1. Clone or download this repo
2. Navigate to `chrome://extensions` and enable developer mode in the top right
3. Click load unpacked and select any file within this repo.
4. For the moment during testing you're going have to go to any [webpage for the Spotify API](https://developer.spotify.com/console/get-search-item/?q=Bob&type=artist&market=&limit=2&offset=20), click the try it out button to test a query and then create a new token with no permissions. After you're brought back to the same screen copy and paste in the new token into first line of `background.js` as the spotifyToken and enjoy.
