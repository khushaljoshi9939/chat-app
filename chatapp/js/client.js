const socket=io("http://localhost:9080");

const form=document.getElementById("send-container");
const messagein=document.getElementById("messagesent");;
const messagecon=document.querySelector(".container");


const name=prompt("enter your name to join");
socket.emit("new-user-joined",name);

var audio=new Audio("kar98.mp3");

const append=(message,position)=>{
const messageElement=document.createElement("div");
messageElement.innerText=message;
messageElement.classList.add("message");
messageElement.classList.add(position);
//messageElement.classList.add(newjoin);
messagecon.append(messageElement);
if(position=="left"){
    audio.play();
}
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=messagein.value;
    append(`you: ${message}`,"right");
    socket.emit('send',message);
    messagein.value="";
})


socket.on("user-joined",name=>{
append(` ${name} joined the chat`,"right");
});


socket.on("receive",data=>{
    append(` ${data.name}:${data.message}`,"left");
    });
    
socket.on("left",name=>{
        append(` ${name} left the chat`,"left");
});
    
