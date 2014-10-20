var keyMessage;
function getMySelection() {
    if (document.getSelection().toString() !== '') {
        safari.self.tab.dispatchMessage('selectedText', document.getSelection().toString());
    }
}
function whichKey(e) {
    if (e.keyCode === 84) {keyMessage = 'T';}
    if (e.keyCode === 84 && e.altKey) {keyMessage = 'AltT';}
    if (e.keyCode === 84 && e.ctrlKey) {keyMessage = 'CtrlT';}
    if (e.metaKey && e.shiftKey) {keyMessage = 'CmdShift';}
    if (e.altKey && e.shiftKey) {keyMessage = 'AltShift';}
    if (e.ctrlKey && e.shiftKey) {keyMessage = 'CtrlShift';}
    if (e.shiftKey) {keyMessage = 'Shift';}
    if (keyMessage !== '') {
        safari.self.tab.dispatchMessage('pressedKey', keyMessage);
    }
}
function myKeyDown() {
    whichKey(window.event);
}
document.onkeydown = myKeyDown;
function myEventsHandler(event) {
    if (event.name === 'myToolbarItemClicked') {
        getMySelection();
    }
    if (event.name === 'pressedKeyMatches') {
        keyMessage = '';
        getMySelection();
    }
}
if (window.top === window) {
    safari.self.addEventListener('message', myEventsHandler, false);
}
