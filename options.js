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
    speedSlider.value = options.spinSpeed;
    bgColourOptions.value = DECODE_BG[options.bgCol];
});

document.getElementById("set-options").addEventListener("click", () => {
    let root = document.documentElement;
    // spin speed
    chrome.storage.sync.set({"spinSpeed": speedSlider.value}, () => {
        root.style.setProperty("--spin-duration", `${speedSlider.value}s`);
    });

    // background colour
    chrome.storage.sync.set({"bgCol": BG_COLS[bgColourOptions.value]}, () => {
        root.style.setProperty("--background-colour", BG_COLS[bgColourOptions.value]);
    });
    // text colour
    chrome.storage.sync.set({"txtCol": TXT_COLS[bgColourOptions.value]}, () => {
        root.style.setProperty("--colour", TXT_COLS[bgColourOptions.value]);
    });
    
});
