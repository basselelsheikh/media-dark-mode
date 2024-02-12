document.addEventListener('DOMContentLoaded', function () {
    var videosDarkModeCheckbox = document.getElementById('videosCheckbox');
    var imagesDarkModeCheckbox = document.getElementById('imagesCheckbox');
    var enableCheckbox = document.getElementById('enableCheckbox');

    chrome.storage.sync.get('videosCheckbox', function (data) {
        videosDarkModeCheckbox.checked = data.videosCheckbox || false;
    });

    chrome.storage.sync.get('imagesCheckbox', function (data) {
        imagesDarkModeCheckbox.checked = data.imagesCheckbox || false;
    });

    chrome.storage.sync.get('enabled', function (data) {
        enableCheckbox.checked = data.enabled || false;
        handleCheckboxes(enableCheckbox.checked);
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
    
    enableCheckbox.addEventListener('change', function() {
        chrome.storage.sync.set({ 'enabled': enableCheckbox.checked });
        handleCheckboxes(enableCheckbox.checked);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { enabled: enableCheckbox.checked });
        });
    });

    function handleCheckboxes(enableCheckbox) {
        switch (enableCheckbox) {
            case true:
                videosDarkModeCheckbox.disabled = false;
                imagesDarkModeCheckbox.disabled = false;
                break;
            case false:
                videosDarkModeCheckbox.disabled = true;
                imagesDarkModeCheckbox.disabled = true;
                break;
            default:
                break;
        }
    }
});