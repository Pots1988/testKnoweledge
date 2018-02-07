let authorize = document.querySelector("[data-authorization]");

function web_storage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
} catch (e) {
    return false;
  }
}

if (authorize) {
  let form = authorize.querySelector("[data-authorization-form]"),
      userName = form.querySelector("[data-authorization-name]"),
      userSurname = form.querySelector("[data-authorization-surname]"),
      userEmail = form.querySelector("[data-authorization-email]");

  if (web_storage()) {
    if (localStorage.getItem("userName")) {
      userName.value = localStorage.getItem("userName");
      userSurname.value = localStorage.getItem("userSurname");
      userEmail.value = localStorage.getItem("userEmail");
      form.querySelector("[type='submit']").focus();
    }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (web_storage()) {
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("userSurname", userSurname.value);
      localStorage.setItem("userEmail", userEmail.value);
    }

    authorize.classList.add("authorization--hidden");
  });
}

