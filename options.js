var speedSlider = document.getElementById("spin-speed");

chrome.storage.sync.get(["spinSpeed"], (speed) => {
    speedSlider.value = speed.spinSpeed;
});

document.getElementById("set-options").addEventListener("click", () => {
    chrome.storage.sync.set({"spinSpeed": speedSlider.value}, () => {
        let root = document.documentElement;
        root.style.setProperty("--spin-duration", `${speedSlider.value}s`);
    });
});
