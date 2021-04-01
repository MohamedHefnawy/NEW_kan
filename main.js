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
let list_items = []
let LIST = []

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
    // with using async and await you must use try and catch block
    // to also handle the error in a proper way
    try {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' }
        });
        renderTasks()
    } catch (error) {
        // should implement proper error handling
        // so the user can see what is wrong
        console.log(error)
    }

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

    // If there are no tasks an info message or alert appears to show the error
    // alert is the last scenario , so begin with and it should be with message
    if (JsonTasks) {
        JsonTasks.forEach(tasks => {

            if (tasks.cloumnLocation === "To-do") {
                todolist.innerHTML +=
                    `<li class="collection-item" draggable="true">${tasks.taskName.slice(0, 10)}
                        <div class="flex justify-between">
                            <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                        </div>
                </li>`;
            } else if (tasks.cloumnLocation === "Analysis") {
                if (tasks.DoingOrDone === "Doing") {
                    doing_Analysis.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)}
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                } else if (tasks.DoingOrDone === "Done") {
                    done_Analysis.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)}
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                }
            } else if (tasks.cloumnLocation === "Development") {
                if (tasks.DoingOrDone === "Doing") {
                    doing_development.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)}
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                } else if (tasks.DoingOrDone === "Done") {
                    done_development.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)} 
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                }
            } else if (tasks.cloumnLocation === "Testing") {
                if (tasks.DoingOrDone === "Doing") {
                    doing_testing.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)}
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                } else if (tasks.DoingOrDone === "Done") {
                    done_testing.innerHTML += `
                        <li class="collection-item" draggable="true"> ${tasks.taskName.slice(0, 10)}
                            <div class="flex justify-between">
                                <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                            </div>
                        </li>
                    `
                }
            } else if (tasks.cloumnLocation === "Done") {
                Done_li.innerHTML += `
                    <li class="collection-item" draggable="true">${tasks.taskName.slice(0, 10)}
                        <div class="flex justify-between">
                            <a href="./details.html?id=${tasks.id}" class="blue-text" >Details...</a>
                        </div>
                    </li>
                `;
            }
        })
        
        list_items = document.querySelectorAll('.collection-item');
        LIST = document.querySelectorAll('.collection');
        dragAndDrop()
   }
}

// drag & drop
let draggedItem = null;
const dragAndDrop = () => {
    for (let i = 0; i < list_items.length; i++) {
        let item = list_items[i];
        item.addEventListener('dragstart', function() {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 0)
        });
    
        item.addEventListener('dragend', function() {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        })
    
        for (let j = 0; j < LIST.length; j++) {
            let list = LIST[j];
            list.addEventListener('dragover', function(e) {
                e.preventDefault();
            })
    
            list.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            })
    
            list.addEventListener('dragleave', function () {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            })
    
            list.addEventListener('drop', function(e) {
                this.append(draggedItem);
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });
        }
    }
}
