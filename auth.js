import { db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
}

from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const createRoomBtn =
document.getElementById(
"createRoomBtn"
);

const joinRoomBtn =
document.getElementById(
"joinRoomBtn"
);

createRoomBtn.addEventListener(
"click",
createRoom
);

joinRoomBtn.addEventListener(
"click",
joinRoom
);

async function createRoom(){

const username =
document.getElementById(
"username"
).value.trim();

if(username === ""){

alert(
"Please enter your name"
);

return;

}

const roomCode =
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

await setDoc(

doc(
db,
"rooms",
roomCode
),

{
roomCode,
createdBy:username,
createdAt:new Date().toISOString()
}

);

sessionStorage.setItem(
"username",
username
);

sessionStorage.setItem(
"roomCode",
roomCode
);

window.location.href =
"room.html";

}

async function joinRoom(){

const username =
document.getElementById(
"username"
).value.trim();

const roomCode =
document.getElementById(
"roomCode"
).value
.trim()
.toUpperCase();

if(username === ""){

alert(
"Please enter your name"
);

return;

}

if(roomCode === ""){

alert(
"Please enter room code"
);

return;

}

const roomRef =
doc(
db,
"rooms",
roomCode
);

const roomSnap =
await getDoc(
roomRef
);

if(roomSnap.exists()){

sessionStorage.setItem(
"username",
username
);

sessionStorage.setItem(
"roomCode",
roomCode
);

window.location.href =
"room.html";

}
else{

alert(
"Room not found"
);

}

}