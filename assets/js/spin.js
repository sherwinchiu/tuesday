

chrome.storage.sync.get(["spinSpeed"], (speed) => {
    console.log(speed.spinSpeed);
    if (speed != undefined) {
        let root = document.documentElement;
        root.style.setProperty("--spin-duration", `${speed.spinSpeed}s`);
    } else {
        chrome.storage.sync.set({"spinSpeed": 0});
    }
});