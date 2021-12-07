let inputs = document.querySelectorAll("input");
let signUpBtn = document.getElementById("signUpBtn");
let alerts = document.querySelectorAll(".alert");
let successOrNot = document.getElementById("successOrNot");
let inputsData = [];

if (JSON.parse(localStorage.getItem("user")) != null) {
	inputsData = JSON.parse(localStorage.getItem("user"));
}

// start validation

// check if email is already exist or not
function checkEmailIsExist() {
	alerts[0].classList.add("d-none");
	inputs[0].classList.remove("is-invalid");
	inputs[0].classList.add("is-valid");

	for (let i = 0, n = inputsData.length; i < n; i++) {
		if (inputs[0].value == inputsData[i].email) {
			inputs[0].classList.remove("is-valid");
			inputs[0].classList.add("is-invalid");
			alerts[0].classList.remove("d-none");

			return false;
		}
	}
	return true;
}

// check if username is taken or not

function userNameIsExist() {
	alerts[1].classList.add("d-none");
	inputs[1].classList.remove("is-invalid");
	inputs[1].classList.add("is-valid");

	for (let i = 0, n = inputsData.length; i < n; i++) {
		if (inputs[1].value == inputsData[i].userName) {
			alerts[1].classList.remove("d-none");
			inputs[1].classList.remove("is-valid");
			inputs[1].classList.add("is-invalid");

			return false;
		}
	}
	return true;
}

// check password
let passRegex = /[a-zA-Z]/;
let passTest;

function passwordValidation() {
	passTest = passRegex.test(inputs[2].value);

	if (!passTest) {
		alerts[2].classList.remove("d-none");
		inputs[2].classList.remove("is-valid");
		inputs[2].classList.add("is-invalid");

		return false;
	} else {
		alerts[2].classList.add("d-none");
		inputs[2].classList.remove("is-invalid");
		inputs[2].classList.add("is-valid");

		return true;
	}
}

// check all inputs

function checkEmailAndName() {
	if (passwordValidation() && checkEmailIsExist() && userNameIsExist()) {
		successOrNot.classList.replace("text-danger", "text-success");
		successOrNot.innerHTML = "Success now sign in";
		successOrNot.classList.remove("d-none");
		return true;
	} else {
		successOrNot.classList.replace("text-success", "text-danger");

		successOrNot.innerHTML = "There is something wrong try Again";
		successOrNot.classList.remove("d-none");
		return false;
	}
}

function checkIfEmpty() {
	for (input of inputs) {
		if (input.value == "") {
			input.classList.add("is-invalid");
			successOrNot.classList.remove("d-none");
			successOrNot.classList.replace("text-success", "text-danger");
			successOrNot.innerHTML = "You miss something";
			return false;
		}
	}
	return true;
}
// end of validation

/* what is going on here is when we click if everything is ok
 start pushing in our local storage
*/

function pushData() {
	if (checkEmailAndName() && checkIfEmpty()) {
		let user = {
			email: inputs[0].value,
			userName: inputs[1].value,
			password: inputs[2].value,
		};
		inputsData.push(user);
		localStorage.setItem("user", JSON.stringify(inputsData));
		clear();
	}
}

// clearing all inputs

function clear() {
	for (let i = 0, n = inputs.length; i < n; i++) {
		inputs[i].value = "";
	}
}

signUpBtn.addEventListener("click", pushData);

inputs[0].addEventListener("keyup", checkEmailIsExist);
inputs[1].addEventListener("keyup", userNameIsExist);
inputs[2].addEventListener("keyup", passwordValidation);