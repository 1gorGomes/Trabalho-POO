const formLogin = document.querySelector("#form-login");
const inputPassword = formLogin.querySelector("#password");
const inputEmail = formLogin.querySelector("#email");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(formLogin));
  this.checkEmailHasExists(data.email);
  this.validatePassword(data);
});

async function validatePassword(data) {
  const isAuthenticated = await authentication(data);
  if (data.password.length < 8) {
    handleErrorMessage(
      inputPassword,
      "A senha precisa conter no mínimo 8 caracteres!!"
    );
  } else if (!isAuthenticated) {
    handleErrorMessage(inputPassword, "Senha inválida!!");
  } else if (isAuthenticated) {
    window.location.href = "http://localhost:5500/homepage.html";
  } else {
    if (inputPassword.nextElementSibling) {
      inputPassword.nextElementSibling.style.display = "none";
    }
  }
}

async function checkEmailHasExists(email) {
  const response = await this.findByEmail(email);
  if (!response.email) {
    handleErrorMessage(inputEmail, "Email não encontrado no sistema!!");
  } else if (inputEmail.nextElementSibling) {
    inputEmail.nextElementSibling.style.display = "none";
  }
}

async function authentication(data) {
  const response = await fetch(`http://localhost:8080/users/auth`, {
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
