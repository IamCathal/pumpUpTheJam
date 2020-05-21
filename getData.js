// Interacts with the dom for the popup window

let trackTitle = "";

document.getElementById("searchButton").addEventListener("click", () => {
    getTitle().then((res) => {
        callSpotify(res)
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
                resolve(response.data)
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
            document.getElementById('BPMSet').value = response.data.BPM;
            resolve();
        })
    })
}