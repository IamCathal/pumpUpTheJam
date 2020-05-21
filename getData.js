// Interacts with the dom for the popup window

let trackTitle = "";

document.getElementById("searchButton").addEventListener("click", () => {
    getTitle().then((res) => {
        callSpotify(res)
    }, (err) => {
        document.getElementById('trackName').textContent = err;
    });
});

document.getElementById('speedSetButton').addEventListener("click", () => {
    const newBPM = document.getElementById('BPMSet').value;
    const orignalBPM = document.getElementById('originalBPM').textContent;


    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "setSpeed", "val": (newBPM / orignalBPM) }, function() {
            document.getElementById('currBPM').textContent = newBPM;
        });
    })
});

function getTitle() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "getTitle" }, function(response) {
                if (response !== undefined) {
                    if (response.status === "success") {
                        resolve(response.data);
                    } else {
                        reject("Song title not rendered yet")
                    }

                } else {
                    reject("Unable to find song title");
                }

            });
        })
    })
}

function callSpotify(trackTitle) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ message: "getData", "trackTitle": trackTitle }, function(response) {
            // alert("next is the response " + JSON.stringify(response));
            document.getElementById('trackName').textContent = `${response.data.artist} - ${response.data.name}`;
            document.getElementById('originalBPM').textContent = response.data.BPM;
            document.getElementById('trackImage').src = response.data.image;
            document.getElementById('BPMSet').value = response.data.BPM;
            resolve();
        })
    })
}