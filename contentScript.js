// // ONLY this script can access the DOM

function updatePlaybackRate(value) {
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = value;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.message == "getTitle") {
            // get the title element and return it
            const videoTitle = document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[5].textContent
            sendResponse({ "data": videoTitle })
        } else if (request.message == "setSpeed") {
            updatePlaybackRate(request.val);
            sendResponse({ "data": "speed changed successfully" })
        }
    });