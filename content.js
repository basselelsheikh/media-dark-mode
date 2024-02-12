chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.videosDarkMode) {
            invertVideo();
        }
        if (request.videosDarkMode === false) {
            resetVideo();
        }
        if (request.imagesDarkMode) {
            invertImages();
        }
        if (request.imagesDarkMode === false) {
            resetImages();
        }
        if(request.enabled) {
            handleVideo();
            handleImages();
        }
        if(request.enabled === false) {
            resetImages();
            resetVideo();
        }
    }
);

chrome.storage.sync.get('enabled', function (data) {
    if(data.enabled) {
        observeChanges();
    }
});

function observeChanges() {
    const mutationObserver = new MutationObserver((() => {
        if (document.querySelector("video")) {
            handleVideo();
        }
        if (document.querySelector("img")) {
            handleImages();
        }
    }));
    
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function handleVideo() {
    chrome.storage.sync.get('videosCheckbox', function (data) {
        if (data.videosCheckbox) {
            invertVideo();
        }
    });
}

function handleImages() {
    chrome.storage.sync.get('imagesCheckbox', function (data) {
        if (data.imagesCheckbox) {
            invertImages();
        }
    });
}
function invertVideo() {
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
function resetVideo() {
        var video = document.querySelector("video");
        video.style.filter = "none";
}
function resetImages() {
    var images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.filter = "none";
    }
}