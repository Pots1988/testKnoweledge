document.addEventListener('DOMContentLoaded', function(){
  var screen = document.querySelector("[data-authorization]");
  if (screen) {
    var form = screen.querySelector("[data-authorization-form]"),
        userName = form.querySelector("[data-authorization-name]"),
        userSurname = form.querySelector("[data-authorization-surname]"),
        userEmail = form.querySelector("[data-authorization-email]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("userSurname", userSurname.value);
      localStorage.setItem("userEmail", userEmail.value);
      screen.classList.add("authorization--hidden");
    })
  }
});
