const socket = new WebSocket("ws://localhost:4000");

socket.onmessage = async (event) => {
    let message;
    
    if (event.data instanceof Blob) {
        message = await event.data.text();
    } else {
        message = event.data;
    }

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p>${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    const input = document.getElementById("chat-input");
    if (input.value.trim()) {
        socket.send(`Клиент: ${input.value}`);
        input.value = "";
    }
}
