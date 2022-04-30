var eventName = document.getElementById("event-name");
var eventDate = document.getElementById("event-date");

chrome.storage.sync.get(["event", "date"], (event) => {
    eventName.innerHTML = event.name;
    eventDate.innerHTML = event.date;
});