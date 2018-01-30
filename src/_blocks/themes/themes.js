let themes = document.querySelector("[data-themes]"),
    testObject;

if (themes) {
  let form = themes.querySelector("[data-themes-form]"),
      languagePath = form.querySelector("[data-theme-path]").dataset.themePath,
      btnAll = form.querySelector("[data-btn-theme-all]"),
      btnReset = form.querySelector("[data-btn-theme-reset]"),
      inputColection = form.querySelectorAll("[data-theme-name]");

  btnAll.addEventListener("click", e => {
    e.preventDefault();

    inputColection.forEach(item => {
      item.checked = true;
    });
  });

  btnReset.addEventListener("click", e => {
    e.preventDefault();

    inputColection.forEach(item => {
      item.checked = false;
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    let inputCheckedLenght = 0,
        arrIssues = [],
        counter = 0,
        windowUrl = window.location.href;

    inputColection.forEach(item => {
      if (item.checked) {
        let themePath = item.dataset.themeName;
        inputCheckedLenght++;

        loadJson({
          themePath: themePath
        });
      }
    });

    function loadJson(params) {
      let xhr = new XMLHttpRequest(),
          url = windowUrl + languagePath + params.themePath;

      xhr.open("GET", url, true);

      xhr.send();

      xhr.onreadystatechange = function(data) {
        if (xhr.readyState != 4) return false;

        if (xhr.status == 200) {
          let arr = [];
          arr = JSON.parse(data.currentTarget.responseText);

          arr.forEach(item => {
            arrIssues.push(item);

            lastJson();
          });
        } else {
          console.error("С JSON-ом беда");
        }
      }
    }

    function lastJson() {
      counter++;

      if (counter == inputCheckedLenght) {
        themes.classList.add("themes--hidden");

        testObject = new Test({
          item: document.querySelector("#test"),
          questions: arrIssues,
          time: 20
        });
      }
    }
  });
}
