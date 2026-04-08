// alert("Hello")

const today = document.querySelector(".today");

const options = {
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric"
};

const todayDate = new Date().toLocaleDateString("en-AU", options);

today.innerHTML = todayDate;

const url = "https://full-stack-todo-app-backend-phi.vercel.app/todos"

async function getTodos() {
    try{
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const response = await fetch(url, options);

        const todos = await response.json();
        // console.log(todos);

        todos.forEach((todo) => {
            console.log(todo);
            const todoContainer = document.querySelector(".todo-items");

            const newTask = document.createElement("li");
            newTask.innerHTML = todo.text;

            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("btns");

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = "Delete";

            const updateButton = document.createElement("button");
            updateButton.innerHTML = "Update";

            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(updateButton);

            newTask.appendChild(buttonDiv);

            todoContainer.appendChild(newTask);


            // delete button event listener
            deleteButton.addEventListener("click", function() {
                // console.log("delete button pressed")
                deleteItem(todo._id);
            });

            updateButton.addEventListener("click", function() {
                console.log("got clicked")
                updateItem(todo)
            })

        });
    }
    catch(error) {
        console.log(error)
    }
}

getTodos();

let isUpdating; 

let todo;
const input = document.querySelector(".new-task");
input.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(event.target.value)
    todo = event.target.value
});

const addButton = document.querySelector(".submit-btn");
addButton.addEventListener("click", async function() {
    // postHandler();
    if (!isUpdating){
        postHandler()
    }
    else {
        updateItem(newItem)
        window.location.href = "/frontend/index.html"
    }
});

async function postHandler(){
    try{
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: todo,
            }),
        };

        const response = await fetch(url, option);

        if (response.ok) {
            console.log("Successful")
            window.location.href = "/frontend/index.html";
        }
        else {
            console.log("Post request unsuccessful")
        }
    }
    catch(error) {
        console.log(error)
    }
}

// Delete Request

async function deleteItem(id) {
    console.log(id);

    // url paremeters
    const deleteUrl = `https://full-stack-todo-app-backend-phi.vercel.app/todos/${id}`;
    // console.log(url)

    try{
        const option = {
            method: "DELETE"
        };
        const ItemToBeDeleted = await fetch(deleteUrl, option);
        
        // window.reload();
        window.location.href = "/frontend/index.html";

        if (ItemToBeDeleted.ok) {
            console.log("Item is Deleted");
        }
        else {
            console.log("Delete Failed");
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function updateItem(itemToUpdate) {
    console.log(itemToUpdate)

    const {_id, text} = itemToUpdate;

    isUpdating = true;

    const updateURL = `https://full-stack-todo-app-backend-phi.vercel.app/todos/${_id}`;

    input.value = text;

    newItem = itemToUpdate;

    try {
        
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: todo
            })
        }

        const response = await fetch(updateURL, option);

       
        if(response.ok){
            console.log("Update Successful")
            
        }
        else {
            console.log("Update Failed")
        }
    }
    catch (error) {
        console.log(error);
    }
}


