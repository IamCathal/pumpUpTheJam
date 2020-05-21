// // ONLY this script can access the DOM

function updatePlaybackRate(value) {
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = value;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.message == "getTitle") {

            if (/(https:\/\/www.youtube.com\/watch\?v=*)/g.test(window.location.href)) {

                if (typeof document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[5].textContent === undefined) {
                    // The page is for a youtube video but the text has most likely not rendered yet
                    sendResponse({
                        "status": "error",
                        "data": "Song title has not rendered yet",
                    })
                }

                // website is youtube and the url is for a video
                const videoTitle = document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[5].textContent;
                sendResponse({
                    "status": "success",
                    "data": videoTitle,
                })
            }
            // for some reason a failing case here with data being returned in sendResponse
            // does nothing so I left it out



        } else if (request.message == "setSpeed") {
            updatePlaybackRate(request.val);
            sendResponse({ "data": "speed changed successfully" })
        }
    });