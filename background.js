const spotifyToken = "";

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.message == "getData") {
            // alert("get data called and in background")
            spotifyCall(request.trackTitle).then((resObj) => {
                // alert("skipped over call to function")
                // alert("after receiving " + JSON.stringify(resObj))
                sendResponse({ "data": resObj });
            })
            return true;
        }
    });

function spotifyCall(trackTitle) {
    return new Promise((resolve, reject) => {
        let resObj = {
            "artist": "",
            "name": trackTitle,
            "link": "",
            "BPM": ""
        }

        fetch(`https://api.spotify.com/v1/search?q=${encodeURI(trackTitle)}&type=track&limit=1&offset=0`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${spotifyToken}`
                }
            }).then((res) => res.json())
            .then((res) => {
                // alert("fetching second and res from first ->")
                // alert(JSON.stringify(res))
                // successfully got the ID

                const trackID = res.tracks.items[0].id;
                resObj.artist = res.tracks.items[0].artists[0].name;
                resObj.name = res.tracks.items[0].name;
                resObj.link = res.tracks.items[0].external_urls.spotify;
                // alert(resObj.link);

                fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${spotifyToken}`
                        }
                    }).then((res) => res.json())
                    .then((res) => {
                        const { tempo } = res;

                        resObj.BPM = Math.floor(tempo)

                        console.log(`1.25x = ${Math.floor(tempo)*1.25} 1.5x = ${Math.floor(tempo)*1.5}`);

                        resolve(resObj)

                    }, (err) => {
                        resolve(err);
                    })

            }, (err) => {
                resolve(err);
            })

    })
}