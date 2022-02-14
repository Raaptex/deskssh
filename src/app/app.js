let xMouse;
let yMouse;
let selectedObject;

document.addEventListener("mousedown", function(evnt){

    target = evnt.target

    if(evnt.target.parentElement.classList[0] == "title_bar"){
        target = evnt.target.parentElement
    }

    if(target.classList[0] != "title_bar") return 
    
    target.id = "selected" 

    selectedObject = document.getElementById("selected")
    css = window.getComputedStyle(selectedObject.parentElement,null)

    if(selectedObject.style.left == "" || selectedObject.style.top == ""){
        selectedObject.parentElement.style.left = css.getPropertyValue("left")
        selectedObject.parentElement.style.top = css.getPropertyValue("top")
    }
    
    xMouse = evnt.clientX - parseInt(selectedObject.parentElement.style.left)
    yMouse = evnt.clientY - parseInt(selectedObject.parentElement.style.top)

    selectedObject.style.zIndex = 3
    selectedObject.parentElement.style.zIndex = 2

});

document.addEventListener("mousemove", function(evnt){

    if(selectedObject == null) return
    if(selectedObject.id != "selected")
    {
        selectedObject = null
        return
    } 

    selectedObject.parentElement.style.left = evnt.clientX - xMouse + "px"
    selectedObject.parentElement.style.top = evnt.clientY - yMouse + "px"
});

document.addEventListener("mouseup", function(evnt){

    if(selectedObject == null) return
    if(selectedObject.id != "selected"){
        selectedObject = null
        return
    }

    selectedObject.id = ""

    selectedObject.style.zIndex = 2
    selectedObject.parentElement.style.zIndex = 1

});

document.addEventListener("click", function(evnt){

    if(evnt.target.className == "sumbit_size"){

        size_input = evnt.target.parentElement.getElementsByClassName("size")[0]

        width = size_input.value.split("x")[0]
        height = size_input.value.split("x")[1]

        evnt.target.parentElement.style.transition = "0.2s ease"

        evnt.target.parentElement.style.width = width + "px"
        evnt.target.parentElement.style.height = height + "px"

        setTimeout(() => {
            evnt.target.parentElement.style.transition = "none"
        }, 200);
    }

    if(evnt.target.className == "minimize_window"){

        windowDiv = evnt.target.parentElement.parentElement

        windowDiv.style.display = "none"

    }

    if(evnt.target.parentElement.id == "task_bar"){

        document.getElementById("window_" + evnt.target.id.split("_")[1]).style.display = "block"

    }else if(evnt.target.parentElement.parentElement.id == "task_bar"){
        document.getElementById("window_" + evnt.target.parentElement.id.split("_")[1]).style.display = "block"
    }

})

document.onkeydown = function(evt) {

    evt = evt || window.event;
    var key = evt.key;
    var terminal_line = document.getElementById("terminal_line")
    
    if(key == "Backspace"){
        terminal_line.textContent = terminal_line.textContent.slice(0, -1)
    }else{
        terminal_line.textContent += key
    }
};