let inputs = document.querySelectorAll("input");
let signInBtn = document.getElementById("signInBtn");
let alertDiv = document.querySelector(".alert");
let currentIndex;
let localStorageData = [];
let sessionStorageData = [];



// getting back data that has been inserted by user in sign up page

if (JSON.parse(localStorage.getItem("user")) != null) {
  localStorageData = JSON.parse(localStorage.getItem("user"));
}
if (JSON.parse(sessionStorage.getItem("index")) != null) {
  sessionStorageData = JSON.parse(sessionStorage.getItem("index"));
}


function checkLogin() {
  for (let i = 0, n = localStorageData.length; i < n; i++) {

    /* checking if the inserted email exists in our local storage
    if so we keep this index in session storage */

    if (inputs[0].value == localStorageData[i].email) {
      currentIndex = i;
      sessionStorage.setItem("index", JSON.stringify(currentIndex));
    }
  }

    // checking if email and password are not empty

  if (inputs[0].value == "" || inputs[1].value == "") {
    alertDiv.classList.remove("d-none");
    alertDiv.innerHTML = "Email and password are required";

    // checking if email isn't empty and password is right

  }else if (
    currentIndex != undefined
    &&inputs[1].value == localStorageData[currentIndex].password
    && inputs[0].value == localStorageData[currentIndex].email
    ){
     
  alertDiv.classList.add("d-none");
  login();

  
    // if email or password is not correct

  }else {
    alertDiv.innerHTML = "Your email or password isn't correct";
    alertDiv.classList.remove("d-none");
    

  }

  
}

function login() {
  signInBtn.setAttribute("href", "html/afterLogin.html");
}


// save email and password for last one that has been signed in
(function lastLogin() {
  if (localStorageData[sessionStorageData] != undefined){
    inputs[0].value = localStorageData[sessionStorageData].email;
    inputs[1].value = localStorageData[sessionStorageData].password;
  }else{
    clear()
  }
    
  
})();

function clear() {
	for (let i = 0, n = inputs.length; i < n; i++) {
		inputs[i].value = "";
	}
}


signInBtn.addEventListener("click", checkLogin);


