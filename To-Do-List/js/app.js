// CODE EXPLAINED channel

let clear = document.querySelector(".clear");
let dateElement = document.getElementById("date");
let list = document.getElementById("list");
let input = document.getElementById("input");

let CHECK = "fa-check-circle";
let UNCHECK = "fa-circle-thin";
let LINE_THROUGH = "lineThrough";


let LIST = [];
let id = 0;

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
     localStorage.clear();
     location.reload();
})


let options = {weekday: "long", month:"short", day:"numeric"}
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {
    
    if (trash) { return; }

    let DONE = done ? CHECK : UNCHECK;
    let LINE = done ? LINE_THROUGH : "";
    let item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" >${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </l>
                `;
    
    let position = "beforeend";

    list.insertAdjacentHTML(position, item)
}

document.addEventListener('keyup', function(event){
    if (event.keyCode == 13) {
        let toDo = input.value;
  
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++;
        }
        input.value = ""
        
    }
})


function completeToDO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    let element = event.target;
    let elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDO(element);
    } else if (elementJob == 'delete'){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST))
})