document.addEventListener('DOMContentLoaded', function () {
    var videosDarkModeCheckbox = document.getElementById('videosCheckbox');
    var imagesDarkModeCheckbox = document.getElementById('imagesCheckbox');

    chrome.storage.sync.get('videosCheckbox', function (data) {
        videosDarkModeCheckbox.checked = data.videosCheckbox || false;
    });

    chrome.storage.sync.get('imagesCheckbox', function (data) {
        imagesDarkModeCheckbox.checked = data.imagesCheckbox || false;
    });

    videosDarkModeCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ 'videosCheckbox': videosDarkModeCheckbox.checked });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { videosDarkMode: videosDarkModeCheckbox.checked });
        });
    });

    imagesDarkModeCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ 'imagesCheckbox': imagesDarkModeCheckbox.checked });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { imagesDarkMode: imagesDarkModeCheckbox.checked });
        });
    });
});