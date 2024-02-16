chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.videosDarkMode) {
            invertVideo();
            observeVideos();
        }
        if (request.videosDarkMode === false) {
            resetVideo();
            if (videosObserver) {
                videosObserver.disconnect();
            }
        }
        if (request.imagesDarkMode) {
            invertImages();
            observeImages();
        }
        if (request.imagesDarkMode === false) {
            resetImages();
            if (imagesObserver) {
                imagesObserver.disconnect();
            }
        }
    }
);

var videosObserver;
var imagesObserver;

chrome.storage.sync.get('videosCheckbox', function (data) {
    if (data.videosCheckbox) {
        observeVideos();
    }
});

chrome.storage.sync.get('imagesCheckbox', function (data) {
    if (data.videosCheckbox) {
        observeImages();
    }
});

function observeVideos() {
    videosObserver = new MutationObserver((() => {
        if (document.querySelector("video, iframe")) {
            invertVideo();
        }
    }));

    videosObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function observeImages() {
    videoObserver = new MutationObserver((() => {
        if (document.querySelector("img")) {
            invertImages();
        }
    }));

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function invertVideo() {
    const elements = document.querySelectorAll("video, iframe");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.filter = "invert(1)";
    }
}

function invertImages() {
    var images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.filter = "invert(1)";
    }
}
function resetVideo() {
    const elements = document.querySelectorAll("video, iframe");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.filter = "none";
    }
}
function resetImages() {
    var images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.filter = "none";
    }
}