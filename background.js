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
chrome.contextMenus.onClicked.addListener(function(clicked) {
    if(clicked.menuItemId == "tuesday-extension-add-date-to-calendar") {
        chrome.storage.sync.set({"date": clicked.selectionText}, function() {
            chrome.notifications.create("added",{
                type: "basic",
                iconUrl:"/assets/img/48x48 logo.png",
                title: "Added an Event",
                message: `Added ${clicked.selectionText}`
            });
        });
    }
});