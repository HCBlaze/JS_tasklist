// DEFINE UI VARS

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const tasktInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners =  () =>{
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask)
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // Clear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from Local Storage
getTasks = () => {
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task) =>{
        // Create li element
        const li = document.createElement('li')
        // Add class
        li.className = 'collection-item'
        // Create a textNode and append li
        li.appendChild(document.createTextNode(task))
        // Create new link element
        const link = document.createElement('a')
        // Add class
        link.className = 'delete-item secondary-content'
        // Add icon HTML
        link.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        // Append the link to li
        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li)
    })
}

// Add task
addTask = (e) =>{
    if(tasktInput.value === ''){
        alert('Add task')
    }

    // Create li element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Create a textNode and append li
    li.appendChild(document.createTextNode(tasktInput.value))
    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = 'delete-item secondary-content'
    // Add icon HTML
    link.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)

    //Store in LocalStorage
    storeTasksInLocalStorage(tasktInput.value)

    // Clear input
    tasktInput.value = ''

    e.preventDefault()
}

//Store in LocalStorage
storeTasksInLocalStorage = (task) =>{
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Remove task
removeTask = (e) =>{
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()
            
            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        
    }
    
}

// Remove task from Local Storage
removeTaskFromLocalStorage = (taskItem) => {
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task, index) =>{
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

clearTasks = () =>{
    // One way
    // taskList.innerHTML = ''
    // test new things
    // Other way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    // Clear from Local Storage
    clearTasksFromLocalStore()
}

// Clear tasks from Local Storage
clearTasksFromLocalStore = () => {
    localStorage.clear()
}

filterTasks = (e) =>{
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}

// Load all event listeners
loadEventListeners();



