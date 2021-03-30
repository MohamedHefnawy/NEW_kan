let inputBox = document.getElementById("input_text 1");
let addBtn = document.querySelector(".BTN");
let todolist = document.getElementById("To-do")
let doing_Analysis = document.getElementById("doing-Analysis")
let done_Analysis = document.getElementById("done-Analysis")
let doing_development = document.getElementById("doing_development")
let done_development = document.getElementById("done_development")
let doing_testing = document.getElementById("doing_testing")
let done_testing = document.getElementById("done_testing")
let Done_li = document.getElementById("done")
let TodoInput = document.getElementById("TodoInput")

let todoDiv = document.getElementById("todo")

let deleteAll = document.getElementById("BTNfooter")

let inputBox1 = document.getElementById("input_text");
let addBtn1 = document.querySelector(".BTN1");
let Kanban = document.getElementById("container")
let BoardName = document.getElementById("BoardName")
let todoBtn = document.getElementById("todoBtn")
let deleteBTN = document.getElementById("delete-task")
const id = new URLSearchParams(window.location.search).get("id");

//for drag
let list_items = document.querySelectorAll('.collection-item');
let LIST = document.querySelectorAll('.collection');




addBtn1.onclick = () => {
    Kanban.classList.add("active");
}



inputBox.addEventListener('keyup', function() {

    let userdata = inputBox.value;
    //   console.log(userdata);
    if (userdata.trim() != 0) {
        addBtn.classList.add("active");
    } else { addBtn.classList.remove("active"); }
})


const createPost = async(e) => {
    e.preventDefault();
    const doc = {
        taskName: inputBox.value,
        cloumnLocation: "To-do",
        DoingOrDone: 0
    }
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    });
    renderTasks()

}
todoBtn.addEventListener('click', createPost);


window.addEventListener('DOMContentLoaded', () => renderTasks());
const renderTasks = async() => {
    let URL = 'http://localhost:3000/tasks'
        //fetch(URL)
        //  
    const res = await fetch(URL);
    //console.log(res)
    const JsonTasks = await res.json()

    JsonTasks.forEach(tasks => {

        if (tasks.cloumnLocation === "To-do") {

            todolist.innerHTML +=

                `<li class="collection-item" draggable="true">${tasks.taskName.slice(0, 10)}
            <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                 </div>
            
            </li>`;
        } else if (tasks.cloumnLocation === "Analysis") {
            if (tasks.DoingOrDone == "Doing") {
                doing_Analysis.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
            
                
                </li>`
            } else if (tasks.DoingOrDone === "done") {


                done_Analysis.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
               
            </div>
            
                
                </li>`
            }
        } else if (tasks.cloumnLocation === "Development") {
            if (tasks.DoingOrDone == "Doing") {

                doing_development.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
                </li>`
            } else if (tasks.DoingOrDone === "done") {
                done_development.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)} 
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
            
                </li>`
            }
        } else if (tasks.cloumnLocation === "Testing") {
            if (tasks.DoingOrDone == "Doing") {

                doing_testing.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
                </li>`
            } else if (tasks.DoingOrDone === "done") {
                done_testing.innerHTML += `<li class = "collection-item"
                draggable = "true" > ${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
            
                
                </li>`
            }
        } else if (tasks.cloumnLocation === "Done") {
            Done_li.innerHTML +=
                `<li class="collection-item" draggable="true">${tasks.taskName.slice(0, 10)}
                <div class="flex justify-between">
                <a href="/details.html?id=${tasks.id}" class="blue-text" >Details...</a>
            </div>
            
                
                </li>`;


        }


    })

}


// drag

let draggedItem = null;
for (let i = 0; i < list_items.length; i++) {
    let item = list_items[i];
    list_items.addEventListener('dragstart', function() {
        console.log("dragStart");
        draggedItem = item;
        setTimeout(function() {
            item.style.display = 'none';
        }, 0)

    });

    item.addEventListener('dragend', function() {
        console.log('dragend');
        setTimeout(function() {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    })
    for (let j = 0; j < LIST.length; j++) {
        let list = LIST[j];
        list.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        list.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0,0,0,0.2)';
        })
        list.addEventListener('drop', function(e) {
            console.log('drop')
            this.append(draggedItem);
            this.style.backgroundColor = 'rgba(0,0,0,0.1)';
        });

    }
}



// // the other drag 
// // DRAG & DROP
// let taskfill;

// const dragStart = (event) => {
//     event.target.className += ' hold';
//     taskfill = event.target;
//     // setTimeout(() => (event.target.className = 'invisible'), 0);
// }

// const dragEnd = (event) => {
//     event.target.className += ' task';
// }

// const dropzones = document.querySelectorAll('.dropzone');

// const dragEnter = (event) => {
//     event.preventDefault();
//     if (event.target.className === "column dropzone") {
//         event.target.className += ' hovered';
//     }
// }

// const dragOver = (event) => {
//     event.preventDefault();
// }

// const dragLeave = (event) => {
//     if (event.target.className === "column dropzone hovered") {
//         event.target.className = "column dropzone";
//     }
// }

// const dragDrop = (event) => {
//     if (event.target.className === "column dropzone hovered") {
//         event.target.className = "column dropzone";
//     }
//     event.target.append(taskfill);
// }

// for (const dropzone of dropzones) {
//     dropzone.addEventListener('dragenter', dragEnter);
//     dropzone.addEventListener('dragover', dragOver);
//     dropzone.addEventListener('dragleave', dragLeave);
//     dropzone.addEventListener('drop', dragDrop);
// }











// deleteAll.addEventListener("click", async(e) => {
//     const res = await fetch('http://localhost:3000/tasks/' + id, {
//         method: 'DELETE'
//     })
// })








/*
function showTask1() {
    let kanbanName = inputBox1.value;
    let localdata1 = localStorage.getItem("KANBAN");
    if (localdata1 == null) {
        let KANname = JSON.parse(localdata1);
    }
    KANname = `<p>${kanbanName}</p>`
    BoardName.innerHTML = KANname;
    inputBox1.value = "";
}
inputBox.addEventListener('keyup', function() {

    let userdata = inputBox.value;
    //   console.log(userdata);
    if (userdata.trim() != 0) {
        addBtn.classList.add("active");
    } else { addBtn.classList.remove("active"); }

})*/

/*
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
*/
/*
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
            // console.log(afterElement);
        const draggable = document.querySelector('.dragging')

        if (afterElement === null) {
            var s = document.createElement('div'); // is the node
            s.innerHTML = document.getElementById(data).innerHTML;
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
            // console.log(box);
        let offset = y - box.top - box.height / 2
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}*/