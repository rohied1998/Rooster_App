const todoList = document.querySelector(".todo-list");
const createButton = document.querySelector("#todo-create-btn");
const input = document.querySelector("#todo-input");

// Voeg click listener toe aan de floating button
createButton.addEventListener("click", CreateTodoItem);

function CreateTodoItem() {

    const text = input.value;

    if (!text.length) return;

    const items = GetFromStorage("todoItems");

    if (!items) {
        // Er zijn nog geen items, maak nieuwe array met ons eerste item
        PutInStorage("todoItems", [{
            id: Date.now(),
            text: text,
            status: "active"
        }])
    } else {
        // Voeg een nieuwe item toe aan de al bestaande array
        items.push({
            id: Date.now(),
            text: text,
            status: "active"
        })

        // Sla het item op
        PutInStorage("todoItems", items);
    }

    LoadItems();
}

function LoadItems() {
    // Leeg de lijst
    todoList.innerHTML = "";

    // Haal items op
    const items = GetFromStorage("todoItems");

    let listHtml = "";

    items.forEach(item => {
        listHtml += `
            <div class="todo-item" onClick="UpdateItem(${item.id})">
                <span ${item.status == "done" ? 'class="todo-done"' : ''}>${item.text}</span>
                <!-- Actions -->
                <div>
                    <button onClick="DeleteItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    });

    // Stop het terug in de html
    todoList.innerHTML = listHtml;
}

function DeleteItem(id) {
    const items = GetFromStorage("todoItems");

    // Vind de index
    const index = items.findIndex(item => item.id == id);

    // Verwijder uit de array
    items.splice(index, 1);

    // Sla op
    PutInStorage("todoItems", items);

    // Ververs items
    LoadItems();
}

function UpdateItem(id) {
    const items = GetFromStorage("todoItems");

    // Vind de index
    const index = items.findIndex(item => item.id == id);

    // Verander item status naar het tegenovergestelde van zijn huidige
    items[index].status = items[index].status == "active" ? "done" : "active";

    // Sla op
    PutInStorage("todoItems", items);

    // Ververs items
    LoadItems();
}

LoadItems();