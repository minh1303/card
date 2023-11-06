import { db } from "./db";
import { ref, onValue, update } from "firebase/database";
const buttonyes = document.querySelector("#buttonyes");
const buttonno = document.querySelector("#buttonno");
const mainTexts = document.querySelectorAll("main p");
const avatar = document.querySelector("#av");
const main = document.querySelector("main");
const counter = document.querySelector("#counter");
const menubasic = document.querySelector("#menubasic");
const menulike = document.querySelector("#menulike");
const menudislike = document.querySelector("#menudislike");
const basic = document.querySelector("#basic");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");
const bgtexts = document.querySelectorAll(".bg-text");
const leave = document.querySelector("#leave");
const back = document.querySelector("#back");
const sendbutton = document.querySelector("#sendbutton");
const chat = document.querySelector("#chat");
const messagesBoard = document.querySelector("#messages");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const dbRef = ref(db);

let counterValue = 0;
onValue(dbRef, (snapshot) => {
  counterValue = snapshot.val().counter;
  counter.innerText = counterValue;
});

let chatData = [];
onValue(dbRef, (snapshot) => {
  chatData = snapshot.val().messages || [];
  if (!chatData) return;
  messagesBoard.replaceChildren();
  for (const message of chatData) {
    const p = document.createElement("p");
    p.innerText = `Someone: ${message}`;
    p.classList.add("hidden");
    messagesBoard.appendChild(p);
  }
});

for (let i = 0; i < main.children.length; i++) {
  main.children[i].classList.add("hidden");
}

for (const text of mainTexts) {
  text.classList.add("hidden");
}

buttonyes.classList.add("hidden");
buttonno.classList.add("hidden");

main.addEventListener("animationend", (e) => {
  if (e.animationName !== "spawn") return;
  for (let i = 0; i < e.currentTarget.children.length; i++) {
    e.currentTarget.children[i].classList.remove("hidden");
  }
  for (const text of mainTexts) {
    text.classList.remove("hidden");
    text.classList.add("glitch");
    text.setAttribute("data-glitch", text.innerText);
    text.addEventListener("animationend", (e) => {
      if (e.animationName !== "glitch-color") return;
      setTimeout(() => {
        avatar.classList.remove("hidden");
        buttonyes.classList.remove("hidden");
        buttonno.classList.remove("hidden");
      }, 300);
      e.currentTarget.classList.remove("glitch");
    });
  }
  for (const bgtext of bgtexts) {
    setTimeout(() => {
      bgtext.classList.remove("hidden");
    }, 1500);
  }
});

chat.addEventListener("animationend", (e) => {
  if (e.animationName !== "spawn") return;
  const textMsgs = document.querySelectorAll("#chat p");
  for (let i = 0; i < e.currentTarget.children.length; i++) {
    e.currentTarget.children[i].classList.remove("hidden");
  }
  for (const text of textMsgs) {
    text.classList.remove("hidden");
    text.classList.add("glitch");
    text.setAttribute("data-glitch", text.innerText);
  }
});

buttonno.addEventListener("click", async () => {
  buttonyes.remove();
  buttonno.textContent = "Yes";
  buttonno.classList.add("animated-no");
  buttonno.classList.add("active");
  await update(dbRef, { counter: counterValue + 1 });
});

buttonyes.addEventListener("click", async () => {
  buttonno.remove();
  buttonyes.classList.add("animated-yes");
  buttonyes.classList.add("active");
  await update(dbRef, { counter: counterValue + 1 });
});

buttonyes.addEventListener("animationend", (e) => {
  e.currentTarget.remove();
});
buttonno.addEventListener("animationend", (e) => {
  e.currentTarget.remove();
});

menubasic.addEventListener("click", (e) => {
  e.currentTarget.classList.add("underline");
  menulike.classList.remove("underline");
  menudislike.classList.remove("underline");
  basic.classList.remove("hidden");
  like.classList.add("hidden");
  dislike.classList.add("hidden");
});
menulike.addEventListener("click", (e) => {
  e.currentTarget.classList.add("underline");
  menubasic.classList.remove("underline");
  menudislike.classList.remove("underline");
  like.classList.remove("hidden");
  basic.classList.add("hidden");
  dislike.classList.add("hidden");
});
menudislike.addEventListener("click", (e) => {
  e.currentTarget.classList.add("underline");
  menulike.classList.remove("underline");
  menubasic.classList.remove("underline");
  dislike.classList.remove("hidden");
  like.classList.add("hidden");
  basic.classList.add("hidden");
});

leave.addEventListener("click", (e) => {
  main.classList.add("hidden");
  chat.classList.remove("hidden");
  for (let i = 0; i < main.children.length; i++) {
    main.children[i].classList.add("hidden");
  }
});
back.addEventListener("click", () => {
  chat.classList.add("hidden");
  main.classList.remove("hidden");
  for (let i = 0; i < chat.children.length; i++) {
    chat.children[i].classList.add("hidden");
  }
});
sendbutton.addEventListener("click", async () => {
  console.log(chatData);
  if (!input.value) return alert("You have to type something!");
  await update(dbRef, { messages: [...chatData, input.value] });
  input.value = "";
});
