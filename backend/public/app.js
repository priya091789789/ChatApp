const socket = io("http://localhost:9000"); // Connect to your backend server

let userToken = ''; // Store JWT token after login
let currentRoom = ''; // Store current room ID

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');
const roomForm = document.getElementById('room-container');
const roomInput = document.getElementById('room-id');
const joinRoomButton = document.getElementById('join-room');
const createRoomButton = document.getElementById('create-room');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message');
const chatBox = document.getElementById('chat-box');
const participantsList = document.getElementById('participants-list');
const typingNotification = document.getElementById('typing-notification');
const roomStatus = document.getElementById('room-status');
const currentRoomName = document.getElementById('current-room-name');

// Show/hide different forms
document.getElementById('show-signup').addEventListener('click', () => {
document.getElementById('auth-container').style.display = 'none';
document.getElementById('signup-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
document.getElementById('signup-container').style.display = 'none';
document.getElementById('auth-container').style.display = 'block';
});

// Handle Login Form Submission
loginForm.addEventListener('submit', (e) => {
e.preventDefault();
const username = usernameInput.value;
const password = passwordInput.value;

fetch('http://localhost:9000/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password }),
})
.then(response => response.json())
.then(data => {
if (data.token) {
userToken = data.token;
alert('Logged in successfully');
loginForm.style.display = 'none';
roomForm.style.display = 'block';
} else {
alert('Login failed');
}
})
.catch(err => console.error('Error:', err));
});

// Handle Signup Form Submission
signupForm.addEventListener('submit', (e) => {
e.preventDefault();
const username = newUsernameInput.value;
const password = newPasswordInput.value;

fetch('http://localhost:9000/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password }),
})
.then(response => response.json())
.then(data => {
alert('User registered successfully. You can now login!');
document.getElementById('signup-container').style.display = 'none';
document.getElementById('auth-container').style.display = 'block';
})
.catch(err => console.error('Error:', err));
});

// Create Room Button
createRoomButton.addEventListener('click', () => {
socket.emit('create-room');
});

// Join Room Button
joinRoomButton.addEventListener('click', () => {
const roomId = roomInput.value;
if (!roomId) {
alert('Please enter a valid Room ID');
return;
}

socket.emit('join-room', roomId);
});

// Handle Room Creation (Backend sends the room ID)
socket.on('room-created', (data) => {
alert(`Room created with ID: ${data.roomId}`);
roomInput.value = data.roomId;
currentRoom = data.roomId;
currentRoomName.textContent = currentRoom;
chatContainer.style.display = 'block';
roomForm.style.display = 'none';
loadMessages(currentRoom);
});

// Handle Room Joining
socket.on('room-joined', (data) => {
alert(`Joined room: ${data.roomId}`);
currentRoom = data.roomId;
currentRoomName.textContent = currentRoom;
chatContainer.style.display = 'block';
roomForm.style.display = 'none';
loadMessages(currentRoom);
});

// Load Messages for the Room
function loadMessages(roomId) {
fetch(`http://localhost:9000/chat/${roomId}`)
.then(response => response.json())
.then(messages => {
chatBox.innerHTML = '';
messages.forEach(message => {
const messageElem = document.createElement('div');
messageElem.textContent = `${message.sender}: ${message.message}`;
chatBox.appendChild(messageElem);
});
});
}

// Send Message
sendMessageButton.addEventListener('click', () => {
const message = messageInput.value;
if (!message) return;

socket.emit('user-message', { room: currentRoom, sender: userToken, message });
messageInput.value = '';
typingNotification.style.display = 'none';
});

// Listen for New Messages
socket.on('message', (data) => {
const messageElem = document.createElement('div');
messageElem.textContent = `${data.sender}: ${data.message}`;
chatBox.appendChild(messageElem);
});

// Typing Notifications
messageInput.addEventListener('input', () => {
if (messageInput.value.trim()) {
socket.emit('typing', { room: currentRoom, sender: userToken });
} else {
socket.emit('stop-typing', currentRoom);
}
});

// Typing Notification Received
socket.on('typing', (data) => {
typingNotification.textContent = `${data.sender} is typing...`;
typingNotification.style.display = 'block';
});

// Stop Typing Notification
socket.on('stop-typing', () => {
typingNotification.style.display = 'none';
});

// Display Room Participants
socket.on('participants', (participants) => {
participantsList.innerHTML = '';
participants.forEach(participant => {
const li = document.createElement('li');
li.textContent = participant;
participantsList.appendChild(li);
});
});