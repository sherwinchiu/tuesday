var menuItem = {
    "id": "tuesday-extension-add-to-calendar",
    "title": "Add to Calendar",
    "contexts": ["selection"]
}
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clicked) {
    if(clicked.menuItemId == "tuesday-extension-add-to-calendar") {
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