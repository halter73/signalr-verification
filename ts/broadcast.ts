/// <reference path="../node_modules/@aspnet/signalr/dist/esm/index.d.ts" />

// Bind DOM elements
const messagesList = document.getElementById("messages-list") as HTMLUListElement;
const messageTextBox = document.getElementById("message-textbox") as HTMLInputElement;
const messageForm = document.getElementById("message-form") as HTMLFormElement;

(async function() {
    let connection = new signalR.HubConnection("/broadcast");

    messageForm.addEventListener("submit", async event => {
        event.preventDefault();
        await connection.send("Broadcast", messageTextBox.value);
    });

    connection.on("Receive", message => {
        messagesList.innerHTML += `<li>${message}</li>`
    });

    await connection.start();
})();