const API_URL = "http://localhost:8080/products";

async function fetchProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();
    document.getElementById("admin-products").innerHTML = products.map(p => `
        <div class="admin-card">
            <p><b>ID:</b> ${p.id}</p>
            <p><b>Название:</b> ${p.name}</p>
            <p><b>Цена:</b> ${p.price} руб.</p>
            <p><b>Описание:</b> ${p.description}</p>
            <p><b>Категории:</b> ${p.categories.join(", ")}</p>
            <button onclick="loadProduct('${p.id}')">Редактировать</button>
            <button onclick="deleteProduct('${p.id}')">Удалить</button>
        </div>
    `).join("");
}

async function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const categories = document.getElementById("categories").value.split(",");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description, categories }),
    });

    fetchProducts();
}

async function editProduct() {
    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const price = document.getElementById("edit-price").value;
    const description = document.getElementById("edit-description").value;
    const categories = document.getElementById("edit-categories").value.split(",");

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description, categories }),
    });

    fetchProducts();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
}

function loadProduct(id) {
    fetch(`${API_URL}`)
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id == id);
            if (product) {
                document.getElementById("edit-id").value = product.id;
                document.getElementById("edit-name").value = product.name;
                document.getElementById("edit-price").value = product.price;
                document.getElementById("edit-description").value = product.description;
                document.getElementById("edit-categories").value = product.categories.join(", ");
            }
        });
}

document.addEventListener("DOMContentLoaded", fetchProducts);


const socket = new WebSocket("ws://localhost:4000");

socket.onmessage = (event) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p>${event.data}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    const input = document.getElementById("chat-input");
    if (input.value.trim()) {
        socket.send(`Админ: ${input.value}`);
        input.value = "";
    }
}
