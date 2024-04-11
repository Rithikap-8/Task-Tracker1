let table =[
    {category:"personal", subcategory:"Gym",time:"00:10:35", task:"exercise"},
    {category:"official", subcategory:"meeting",time:"00:10:35", task:"hr"},
    {category:"personal", subcategory:"temple",time:"00:10:35", task:"cook"},
    {category:"official", subcategory:"documentation",time:"00:10:35", task:"data Analysis"},
    {category:"personal", subcategory:"meeting",time:"00:10:35", task:"personal hr"}
];

let tableBody= document.querySelector("tbody");
table.map(task=>{
   let row = document.createElement("tr")
   row.innerHTML =`
   <td>${task.category}</td>
   <td>${task.subcategory}</td>
   <td>${task.time}</td>
   <td>${task.task}</td>`
   tableBody.appendChild(row)
});

function filterTable() {
    let category = document.getElementById("categorySelect").value;
    let rows = document.querySelectorAll("#taskTable tbody tr");
    console.log(rows)

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
       // console.log(row.children[0].textContent)
        if (category === "all" || row.children[0].textContent === category) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let intervalId;
let startTime;
let stopTime;

function startstopbutton() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date();
        intervalId = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            document.getElementById('startstopbutton').innerText = 'STOP';
            let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.querySelector(".stopwatch").innerText = formattedTime;
        }, 1000);
    } else {
        isRunning = false;
        stopTime = new Date();
        clearInterval(intervalId);
        document.getElementById("startstopbutton").innerText = "START";
    }
}

const resetTimer = () => {
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("startstopbutton").innerText = "START";
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.querySelector(".stopwatch").innerText = formattedTime;
}

function addTask() {
    const category = document.getElementById('category').value;
    const subcategory = document.getElementById('subcategory').value;
    const task = document.getElementById('task').value;
    const elapsedTime = (stopTime - startTime) / 1000; // Convert milliseconds to seconds

    const newRow = document.getElementById('taskTable').insertRow();
    newRow.innerHTML = `<td>${category}</td><td>${subcategory}</td><td>${formatElapsedTime(elapsedTime)}</td><td>${task}</td>`;
}

function formatElapsedTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

