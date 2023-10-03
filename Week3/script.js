let listForToDo = [];
const addForm = document.getElementById("add");

function stateChanger(event) { // 투두의 상태를 바꿔줌
    const obj = listForToDo.find((saveObject) => saveObject.text == event.target.innerText)
    obj.state = !obj.state;
    localStorage.setItem("listForToDo", JSON.stringify(listForToDo));
    drawTodo();
}

function delToDo(event) { // 투두를 삭제
    const li = event.target.parentElement;
    li.remove();
    listForToDo = listForToDo.filter((toDo) => toDo.id !== parseInt(li.id));
    localStorage.setItem("listForToDo", JSON.stringify(listForToDo));
    drawTodo();
}

function drawTodo() { // 저장한 투두를 표시
    const savedToDos = localStorage.getItem("listForToDo");
    const toDoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");
    
    toDoList.innerHTML = "";
    doneList.innerHTML = "";

    if(savedToDos){
        listForToDo = JSON.parse(savedToDos);

        listForToDo.forEach((todo) => {
            const li = document.createElement("li");
            li.id = todo.id;
            li.state = todo.state;

            const span = document.createElement("span");
            span.innerText = todo.text
            span.addEventListener("click", stateChanger);

            const delBtn = document.createElement("button");
            delBtn.innerText = "❌";
            delBtn.addEventListener("click", delToDo);

            li.appendChild(span);
            li.appendChild(delBtn);

            if(li.state) {
                doneList.appendChild(li);
            } else { 
                toDoList.appendChild(li);
            }
        })
    }
}

function addToDo(event) { // 새로운 투두를 더함
    event.preventDefault();
    const newToDo = document.getElementById("new-todo");
    const saveObject = {
        id : Date.now(),
        text : newToDo.value,
        state : false,
    };
    newToDo.value=null;

    if(saveObject.text) {
        listForToDo.push(saveObject);
        localStorage.setItem("listForToDo", JSON.stringify(listForToDo));
        drawTodo();
    }
}

window.onload = drawTodo();
addForm.addEventListener("submit", addToDo);
