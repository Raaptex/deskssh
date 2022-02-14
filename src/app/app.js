document.onkeypress = function(evt) {

    if (event.keyCode === 13) {
        eel.session_connect("", 22, "", "")
        return
    }

    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var line = document.getElementById("line")
    line.textContent += charStr
};
