async function loadProducts() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    const fields = Array.from(checkboxes).map(cb => cb.value);
    const products = await fetchProducts(fields);

    document.getElementById("product-container").innerHTML = products.map(p => `
        <div class="product-card">
            ${fields.map(f => `<p>${p[f]}</p>`).join("")}
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", loadProducts);


const socket = new WebSocket("ws://localhost:4000");

socket.onmessage = (event) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p>${event.data}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    const input = document.getElementById("chat-input");
    if (input.value.trim()) {
        socket.send(`Клиент: ${input.value}`);
        input.value = "";
    }
}
