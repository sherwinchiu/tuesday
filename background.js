/**
 * makes an opion exist when you right click and displays it
 */
chrome.contextMenus.create({
    "id": "tuesday-extension-add-date-to-calendar",
    "title": "Add Date to Calendar",
    "contexts": ["selection"]
});
chrome.contextMenus.create({
    "id": "tuesday-extension-add-event-to-calendar",
    "title": "Add Event to Calendar",
    "contexts": ["selection"]
});

/**
 * on clicked listener
 * checks if the right clicked option is one relevant to our chrome exnteion
 * tosses the date into the storage and creates a notification saying it got added
 */
chrome.contextMenus.onClicked.addListener((clicked) => {
    if(clicked.menuItemId == "tuesday-extension-add-date-to-calendar") {
        console.log("unformated date:", clicked.selectionText)
        console.log("date:", findDate(clicked.selectionText))
        chrome.storage.sync.set({"date": findDate(clicked.selectionText) }, () => {
            chrome.notifications.create("added",{
                type: "basic",
                iconUrl:"/assets/img/48x48 logo.png",
                title: "Added an Event",
                message: `Added ${clicked.selectionText}`
            });
        });
    } else if(clicked.menuItemId == "tuesday-extension-add-event-to-calendar") {
        chrome.storage.sync.set({"event": clicked.selectionText}, () => {
            chrome.tabs.create({url: `https://www.google.com/calendar/render?action=TEMPLATE&text=${clicked.selectionText}`});
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command == "add_event") {
        chrome.storage.sync.get(["event", "date"], (event) => {
            chrome.tabs.create({url: `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.event}`});
            chrome.notifications.create("added",{
                type: "basic",
                iconUrl:"/assets/img/48x48 logo.png",
                title: "Added an Event",
                message: `Added ${event.event}`
            });
        });
    }
});