var speedSlider = document.getElementById("spin-speed");

chrome.storage.sync.get("spin-speed", (speed) => {
    speedSlider.value = speed;
});

document.getElementById("set-options").addEventListener("click", () => {
    chrome.storage.sync.set({"spin-speed": speedSlider.value}, () => {
        let root = document.documentElement;
        root.style.setProperty("--spin-duration", `${speed}s`);
    });
});
