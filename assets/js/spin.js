chrome.storage.sync.get("spin-speed", (speed) => {
    let root = document.documentElement;
    root.style.setProperty("--spin-duration", `${speed}s`);
})