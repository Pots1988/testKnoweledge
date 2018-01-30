let authorize = document.querySelector("[data-authorization]");

if(authorize) {
  let form = authorize.querySelector("[data-authorization-form]"),
      userName = form.querySelector("[data-authorization-name]"),
      userSurname = form.querySelector("[data-authorization-surname]"),
      userEmail = form.querySelector("[data-authorization-email]");

  form.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.setItem("userName", userName.value);
    localStorage.setItem("userSurname", userSurname.value);
    localStorage.setItem("userEmail", userEmail.value);

    authorize.classList.add("authorization--hidden");
  });
}

