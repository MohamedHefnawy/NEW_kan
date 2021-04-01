const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.container');
let deleteBTN = document.getElementById("delete-task")
let editBtn = document.getElementById("edit-task");
let detail_input = document.getElementById('detail_input');
let Save = document.getElementById('BTNdetails');

const renderDetail = async() => {

    const res = await fetch("http://localhost:3000/tasks/" + id);
    const post = await res.json();
    // console.log(post);
    let temp = `<h2> ${post.taskName}</h2>`
        // console.log(temp);
    container.innerHTML = temp;
}

deleteBTN.addEventListener("click", async(e) => {
    const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE'
    })
    window.open('index.html')
})

editBtn.addEventListener('click', async(e) => {
    const res = await fetch("http://localhost:3000/tasks/" + id);
    const post = await res.json();
    let TaskNAME = post.taskName;
    // console.log(TaskNAME);
    detail_input.value = TaskNAME;
})

Save.addEventListener('click', async(e) => {
    const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName: detail_input.value
        })
    })
    .then(res => res.json())
    window.open('index.html')
})

window.addEventListener('DOMContentLoaded', () => renderDetail());