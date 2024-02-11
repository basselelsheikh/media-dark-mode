chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.videosDarkMode) {
            invertVideos();
        }
        if (request.videosDarkMode === false) {
            resetVideos();
        }
        if (request.imagesDarkMode) {
            invertImages();
        }
        if (request.imagesDarkMode === false) {
            resetImages();
        }
    }
);

const mutationObserver = new MutationObserver((() => {
    if (document.querySelector("video")) {
        chrome.storage.sync.get('videosCheckbox', function (data) {
            if (data.videosCheckbox) {
                invertVideos();
            }
        });
    }
    if (document.querySelector("img")) {
        chrome.storage.sync.get('imagesCheckbox', function (data) {
            if (data.imagesCheckbox) {
                invertImages();
            }
        });
    }
}));

mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

function invertVideos() {
    var video = document.querySelector("video");
    video.style.filter = "invert(1)";
}
function invertImages() {
    var images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.filter = "invert(1)";
    }
}
function resetVideos() {
    var videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        video.style.filter = "none";
    }
}
function resetImages() {
    var images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.filter = "none";
    }
}

