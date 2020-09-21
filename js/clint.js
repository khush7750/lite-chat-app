const socket = io("http://localhost:8000");

const messageContainer = document.querySelector(".container");
const form = document.getElementById("sendContainer");
const messageInput = document.getElementById("messageInp");

// audio for receive maeesage
var audio = new Audio("../juntos.mp3");

// function which will append to container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  if (position == "left") {
    audio.play();
  }
};

// ask the name for user
const name = prompt("Enter your name to join the chart: ");

socket.emit("new-user-joined", name);

// if a new user join receive the name from the sever
socket.on("user-joined", name => {
  append(`${name} join the chart`, 'right');
});

// server send the message receve it
socket.on("receive", data => {
  append(` ${data.name}: ${data.message}`,'left');
  
});

// if a user leaves the chart
socket.on("left", name => {
  append(`${name} left the chart`, "left");
  
});

// if form get subbmited send server the message
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message} `, "right");
    socket.emit("send", message);
    messageInput.value = "";

  });


//   function scrollToBottom() {
//     container.scrollTop = container.scrollHeight
// }
