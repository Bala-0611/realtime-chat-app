// Connect to the server
const socket = io();
// Select DOM elements
const form = document.getElementById('form');
const input = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const messages = document.getElementById('messages');
// When the form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload
    if (input.value && usernameInput.value) {
  socket.emit('chat message', {
    user: usernameInput.value,
    text: input.value
  }); // send message to server
        input.value = ''; // clear input box
    }
});
// Receive messages from server
(io()).on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // auto-scroll to bottom
});