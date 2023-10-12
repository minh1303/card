import { db } from "./db";
import { ref, onValue, update } from "firebase/database";
const buttonyes = document.querySelector("#buttonyes");
const buttonno = document.querySelector("#buttonno");
const texts = document.querySelectorAll("p");
const avatar = document.querySelector("#av");
const main = document.querySelector("main");
const counter = document.querySelector("#counter");
const dbRef = ref(db);
let counterValue;
onValue(dbRef, (snapshot) => {
  counterValue = snapshot.val().counter;
  counter.innerText = counterValue;
});

for (let i = 0; i < main.children.length; i++) {
  main.children[i].classList.add("hidden");
}
for (const text of texts) {
  text.classList.add("hidden");
}

buttonyes.classList.add("hidden");
buttonno.classList.add("hidden");

main.addEventListener("animationend", (e) => {
  if(e.animationName !== "spawn") return;
  e.currentTarget.classList.remove("main-animated");
  for (let i = 0; i < e.currentTarget.children.length; i++) {
    e.currentTarget.children[i].classList.remove("hidden");
  }
  avatar.classList.remove("hidden");
  for (const text of texts) {
    text.classList.remove("hidden");
    text.classList.add("glitch");
    text.setAttribute("data-glitch", text.innerText);
    text.addEventListener("animationend", e => {
      if(e.animationName !== "glitch-color") return
      e.currentTarget.classList.remove("glitch")
    })
  }
  buttonyes.classList.remove("hidden");
  buttonno.classList.remove("hidden");
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
