let inputBox = document.getElementById("input_text");
let addBtn = document.querySelector(".BTN");
let todolist = document.getElementById("ul-todo")
let deleteAll = document.getElementById("BTNfooter")
let draggables = document.querySelectorAll('.collection-item')
let containers = document.querySelectorAll('.collection')



inputBox.addEventListener('keyup', function() {

    let userdata = inputBox.value;
    //   console.log(userdata);
    if (userdata.trim() != 0) {
        addBtn.classList.add("active");
    } else { addBtn.classList.remove("active"); }
})


addBtn.onclick = () => {
    let userdata = inputBox.value;
    let localdata = localStorage.getItem("new todo");
    if (localdata == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localdata);
    }
    listArray.push(userdata);
    localStorage.setItem("new todo", JSON.stringify(listArray));

    showTask();
    addBtn.classList.remove("active");
}



function showTask() {
    let localdata = localStorage.getItem("new todo");
    if (localdata == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localdata);
    }
    let pendingNum = document.querySelector(".pendingTasks");
    pendingNum.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAll.classList.add("active");
    } else { deleteAll.classList.remove("active"); }

    let NewTodo = '';
    listArray.forEach((element, index) => {
        NewTodo += `<li class="collection-item" draggable="true">${element}<span onclick="deleteTask(${index})";><i class="material-icons left">delete</i></span></li>`;
    });


    todolist.innerHTML = NewTodo;
    inputBox.value = "";
}

function deleteTask(index) {
    let localdata = localStorage.getItem("new todo");
    listArray = JSON.parse(localdata);
    listArray.splice(index, 1);
    localStorage.setItem("new todo", JSON.stringify(listArray));
    showTask();
}

deleteAll.onclick = () => {
    listArray = [];
    localStorage.setItem("new todo", JSON.stringify(listArray));
    showTask();
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        // console.log(' drag over');
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        console.log(afterElement);
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }

    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.collection-item:not(.dragging)')]


    return draggableElements.reduce((closest, child) => {
        let box = child.getBoundingClientRect()
        console.log(box);
        let offset = y - box.top - box.height / 2
            //console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}