import { db } from "./firebase.js";

console.log("ROOM JS LOADED");

import {
doc,
setDoc,
collection,
addDoc,
onSnapshot,
deleteDoc,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const username =
sessionStorage.getItem("username");

const roomCode =
sessionStorage.getItem("roomCode");

if(!username || !roomCode){

window.location.href =
"index.html";

}

document.getElementById(
"roomInfo"
).innerHTML =

`
<b>User:</b> ${username}
<br>
<b>Room:</b> ${roomCode}
`;

document
.getElementById(
"receiptBtn"
)
.addEventListener(
"click",
()=>{
window.location.href =
"receipt.html";
});

const memberRef =
doc(
db,
"rooms",
roomCode,
"members",
username
);
console.log(
"Adding member:",
username
);

await setDoc(
memberRef,
{
name:username,
joinedAt:Date.now()
}
);

console.log(
"Member added successfully"
);

document
.getElementById(
"addItemBtn"
)
.addEventListener(
"click",
addItem
);

async function addItem(){

const itemName =
document
.getElementById(
"itemName"
)
.value
.trim();

const itemPrice =
parseFloat(
document
.getElementById(
"itemPrice"
)
.value
) || 0;

const itemQuantity =
parseInt(
document
.getElementById(
"itemQuantity"
)
.value
);

const itemCategory =
document
.getElementById(
"itemCategory"
)
.value;

if(
itemName === "" ||
!itemQuantity ||
itemCategory === ""
){

alert(
"Fill all fields"
);

return;

}

await addDoc(

collection(
db,
"rooms",
roomCode,
"cart"
),

{
name:itemName,
price:itemPrice,
quantity:itemQuantity,
category:itemCategory,
addedBy:username,
timestamp:Date.now()
}

);

await addDoc(

collection(
db,
"rooms",
roomCode,
"activity"
),

{
message:
username +
" added " +
itemName,

timestamp:
Date.now()
}

);

document
.getElementById(
"itemName"
).value = "";

document
.getElementById(
"itemPrice"
).value = "";

document
.getElementById(
"itemQuantity"
).value = "";

document
.getElementById(
"itemCategory"
).value = "";

}

onSnapshot(

collection(
db,
"rooms",
roomCode,
"members"
),

(snapshot)=>{

const memberDiv =
document.getElementById(
"membersList"
);

memberDiv.innerHTML = "";

document.getElementById(
"totalMembers"
).innerText =
snapshot.size + " Members";

snapshot.forEach(member=>{

const data =
member.data();

memberDiv.innerHTML +=

`
<div class="activity-item">

👤 ${data.name}

</div>
`;

});

}

);

onSnapshot(

collection(
db,
"rooms",
roomCode,
"cart"
),

(snapshot)=>{

const cartDiv =
document.getElementById(
"cartItems"
);

cartDiv.innerHTML = "";

document.getElementById(
"totalItems"
).innerText =
snapshot.size + " Items";
let grandTotal = 0;

snapshot.forEach(item=>{

const data =
item.data();

grandTotal +=
Number(data.price) *
Number(data.quantity);

cartDiv.innerHTML +=

`
<div class="cart-item">

<h3>${data.name}</h3>

<div class="badge">
${data.category}
</div>

<p>

💰 ${
data.price > 0
?
"₹" + data.price
:
"Price Not Added"
}

</p>

<p>
📦 Qty: ${data.quantity}
</p>

<p>
👤 ${data.addedBy}
</p>

<button
onclick="removeItem('${item.id}')">

Remove

</button>

</div>
`;

});

document
.getElementById(
"estimatedBudget"
)
.innerText =

"Estimated Budget: ₹" +
grandTotal;

const FREE_DELIVERY = 500;

const percentage =
Math.min(
(grandTotal / FREE_DELIVERY) * 100,
100
);

document
.getElementById("deliveryBar")
.style.width =
percentage + "%";

if(grandTotal >= FREE_DELIVERY){

document
.getElementById("deliveryText")
.innerHTML =
"✅ Free Delivery Unlocked";

}
else{

document
.getElementById("deliveryText")
.innerHTML =
"₹" +
grandTotal +
" of ₹500 reached";

}
}

);

window.removeItem =
async function(id){

await deleteDoc(

doc(
db,
"rooms",
roomCode,
"cart",
id
)

);

await addDoc(

collection(
db,
"rooms",
roomCode,
"activity"
),

{
message:
username +
" removed an item",

timestamp:
Date.now()
}

);

};

onSnapshot(

collection(
db,
"rooms",
roomCode,
"activity"
),

(snapshot)=>{

const activityDiv =
document.getElementById(
"activityLog"
);

activityDiv.innerHTML = "";

let logs = [];

snapshot.forEach(log=>{

logs.push(
log.data()
);

});

logs.sort(
(a,b)=>
b.timestamp -
a.timestamp
);


logs.forEach(log=>{

activityDiv.innerHTML +=

`
<div class="activity-item">

🕒 ${log.message}

</div>
`;

});

}

);
const themeBtn =
document.getElementById(
"themeBtn"
);

themeBtn.addEventListener(
"click",
()=>{

document.body
.classList
.toggle("dark");

if(
document.body
.classList
.contains("dark")
){

themeBtn.innerText =
"☀️ Light Mode";

}
else{

themeBtn.innerText =
"🌙 Dark Mode";

}

}
);
const topBtn =
document.getElementById(
"topBtn"
);

window.addEventListener(
"scroll",
()=>{

if(
document.documentElement.scrollTop > 300
){

topBtn.style.display =
"block";

}
else{

topBtn.style.display =
"none";

}

}
);

topBtn.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

}
);