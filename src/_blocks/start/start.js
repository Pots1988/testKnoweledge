let start = document.querySelector("[data-start]");

if (start) {
  let btnStart = start.querySelector("[data-btn-start]");

  btnStart.addEventListener("click", function(e) {
    e.preventDefault();
    start.classList.add("start--hidden");
    testObject._setQuestion();

    document.querySelector("#test").classList.add("test--active");
  });
}

