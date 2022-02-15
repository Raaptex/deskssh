/*

    VARIABLES

*/

var terminal_cmd_line = "";
var not_letter = ["Shift"];

/*

    WINDOWED

*/

let xMouse;
let yMouse;
let selectedObject;
let selectedWindowID;

document.addEventListener("mousedown", function(evnt){

    target = evnt.target

    if(evnt.target.parentElement.classList[0] == "title_bar"){
        target = evnt.target.parentElement
    }

    if(target.classList[0] != "title_bar") return 

    selectedWindowID = target.parentElement.id.split("_")[1]
    
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
        selectedWindowID = target.parentElement.id.split("_")[1]

    }else if(evnt.target.parentElement.parentElement.id == "task_bar"){
        document.getElementById("window_" + evnt.target.parentElement.id.split("_")[1]).style.display = "block"
        selectedWindowID = target.parentElement.id.split("_")[1]
    }

})

/*

    HANDLERS

*/

document.onkeydown = async function(evt) {

    if(selectedWindowID == "1"){
        evt = evt || window.event;
        var key = evt.key;
        var terminal_line = document.getElementById("terminal_line")
        var terminal_in = document.getElementById("terminal_in")
        
        if(key == "Backspace"){

            if(terminal_cmd_line.length > 0){

                terminal_line.textContent = terminal_line.textContent.slice(0, -1)
                terminal_cmd_line = terminal_cmd_line.slice(0, -1)
                eel.terminal_writeIn("%backspace")

            }

        }else if(key == "Enter"){

            if(terminal_cmd_line != ""){

                let result = await eel.terminal_exec(terminal_cmd_line)()
                let output = result.output
                terminal_in.appendChild(document.createElement("p").appendChild(document.createTextNode(terminal_line.textContent)))

                terminal_in.appendChild(document.createElement("br"))

                output.split(/\r\n/g).forEach(line => {
                    p = document.createElement("p").appendChild(document.createTextNode(line))
                    br = document.createElement("br")

                    terminal_in.appendChild(p)
                    terminal_in.appendChild(br)
                });

                terminal_cmd_line = ""
                terminal_line.textContent = "deskssh:~$ "

            }

        }else{

            if(!(not_letter.includes(key))){

                terminal_line.textContent += key
                terminal_cmd_line += key

            }

        }
    }
};

/*

    FONCTIONS

*/

async function session_connect(){

    host = document.getElementById("connect_host").value
    port = document.getElementById("connect_port").value
    user = document.getElementById("connect_user").value
    password = document.getElementById("connect_password").value
    
    let connected = await eel.session_connect(host, port, user, password)()

    if(connected == true){
        document.getElementById("window_2").remove()
    }
}
