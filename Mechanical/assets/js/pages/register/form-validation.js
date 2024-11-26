const formRegister = document.querySelector("#form-register");
const inputPassword = formRegister.querySelector("#password");
const inputEmail = formRegister.querySelector("#email");

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(formRegister));
  const passwordInvalid = checkMinimumPasswordLenght(data.password);
  const emailExists = await checkEmailHasExists(data.email);

  if (!passwordInvalid && !emailExists) {
    await register(data);
  }
});

function checkMinimumPasswordLenght(password) {
  if (password.length < 8) {
    handleErrorMessage(
      inputPassword,
      "A senha precisa conter no mínimo 8 caracteres!!"
    );
    return true;
  } else if (inputPassword.nextElementSibling) {
    inputPassword.nextElementSibling.style.display = "none";
  }
  return false;
}

async function checkEmailHasExists(email) {
  const response = await findByEmail(email);
  if (response.email) {
    handleErrorMessage(
      inputEmail,
      "Esse email já está registrado no sistema!!"
    );
    return true;
  } else if (inputEmail.nextElementSibling) {
    inputEmail.nextElementSibling.style.display = "none";
  }
  return false;
}

async function register(data) {
  const response = await fetch(`http://localhost:8080/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function findByEmail(email) {
  const response = await fetch(`http://localhost:8080/users?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

function handleErrorMessage(element, message) {
  let error = element.nextElementSibling;

  if (!error || !error.classList.contains("message-error")) {
    error = document.createElement("p");
    error.classList.add("message-error");
    element.insertAdjacentElement("afterend", error);
  }

  error.style.display = "block";
  error.innerText = message;
}
