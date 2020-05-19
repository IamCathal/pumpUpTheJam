let trackTitle = "";

document.getElementById("searchButton").addEventListener("click", () => {
    getTitle().then((res) => {
        callSpotify(res)
    });


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
            document.getElementById('bpmHere').textContent = response.data.BPM + " BPM";
            document.getElementById('BPMSet').value = response.data.BPM;
            resolve();
        })
    })
}