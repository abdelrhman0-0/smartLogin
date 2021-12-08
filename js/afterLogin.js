let sayWelcomeH2 = document.getElementById("sayWelcomeH2");
let logoutBtn = document.getElementById("logoutBtn");
let localStorageData = [];
let currentIndex = [];

// prevent user to back after he logged out
function preventBack() { 


  window.history.forward(); 

}
setTimeout("preventBack()", 0);
window.onunload = function () { null };



// getting data in local and session storage

if (JSON.parse(localStorage.getItem("user")) != null) {
  localStorageData = JSON.parse(localStorage.getItem("user"));
}

currentIndex = JSON.parse(sessionStorage.getItem("index"));

/* using the index to get the signed in username
from our local storage to say welcome */

(function sayWelcome() {
  sayWelcomeH2.classList.add("text-white");
  sayWelcomeH2.innerHTML = `welcome ${localStorageData[currentIndex].userName}`;
})();

function logout() {
  logoutBtn.href = "../index.html";
}

logoutBtn.addEventListener("click", logout);
