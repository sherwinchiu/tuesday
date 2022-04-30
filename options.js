var speedSlider = document.getElementById("spin-speed");
var bgColourOptions = document.getElementById("bg-col");

const BG_COLS = {
    "none": "",
    "rgb": "rgb(var(--red), var(--green), var(--blue))",
    "dark": "#333",
    "light": "#fff"
}

const TXT_COLS = {
    "none": "",
    "rgb": "rgb(var(--inv-red), var(--inv-green), var(--inv-blue))",
    "dark": "#eee",
    "light": "#000"
}

const DECODE_BG = {
    "": "none",
    "rgb(var(--red), var(--green), var(--blue))": "rgb",
    "#333": "dark",
    "#fff": "light"
}

chrome.storage.sync.get(["spinSpeed", "bgCol"], (options) => {
    if (options.spinSpeed === "0") {
        speedSlider.value = 0;
    } else {
        speedSlider.value = 3600 - options.spinSpeed + 1;
    }
    bgColourOptions.value = DECODE_BG[options.bgCol];
});

document.getElementById("set-options").addEventListener("click", () => {
    let root = document.documentElement;
    // spin speed
    if (speedSlider.value === "0") {
        chrome.storage.sync.set({"spinSpeed": 0}, () => {
            root.style.setProperty("--spin-duration", "0s");
        });
    } else {
        chrome.storage.sync.set({"spinSpeed": 3600 - speedSlider.value + 1}, () => {
            root.style.setProperty("--spin-duration", `${3600 - speedSlider.value + 1}s`);
        });
    }

    // background colour
    chrome.storage.sync.set({"bgCol": BG_COLS[bgColourOptions.value]}, () => {
        root.style.setProperty("--background-colour", BG_COLS[bgColourOptions.value]);
    });
    // text colour
    chrome.storage.sync.set({"txtCol": TXT_COLS[bgColourOptions.value]}, () => {
        root.style.setProperty("--colour", TXT_COLS[bgColourOptions.value]);
    });
    
});
