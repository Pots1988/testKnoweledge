document.addEventListener('DOMContentLoaded', function(){
  var screen = document.querySelector("[data-start]");
  if (screen) {
    var btnStart = screen.querySelector("[data-btn-start]");

    btnStart.addEventListener("click", function (e) {
      e.preventDefault();
      screen.classList.add("start--hidden");
    });
  }
});
