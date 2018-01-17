document.addEventListener('DOMContentLoaded', function(){
  var screen = document.querySelector("[data-themes]");
  if (screen) {
    var form = screen.querySelector("[data-themes-form]"),
        themePath = form.querySelector("[data-theme-path]").getAttribute("data-theme-path"),
        btnAll = form.querySelector("[data-btn-theme-all]"),
        btnReset = form.querySelector("[data-btn-theme-reset]"),
        inputColection = form.querySelectorAll("[data-theme-name]");

    btnAll.addEventListener("click", function (e) {
      e.preventDefault();
      for (var i = 0; i < inputColection.length; i++) {
        inputColection[i].checked = true;
      }
    });
    btnReset.addEventListener("click", function (e) {
      e.preventDefault();
      for (var i = 0; i < inputColection.length; i++) {
        inputColection[i].checked = false;
      }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputCheckedLenght = 0,
          path = "",
          arrIssues = [],
          iteral = 0;
      for (var i = 0; i < inputColection.length; i++) {
        if(inputColection[i].checked){
          path = inputColection[i].getAttribute("data-theme-name");
          inputCheckedLenght++;
          loadJson();

        }
      }
      function loadJson(){
        var xhr = new XMLHttpRequest(),
            url = "";
        url = window.location.href + themePath + path;
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState != 4) return false;
            if(xhr.status == 200) {
            var arr = [];
            arr = JSON.parse(data.currentTarget.responseText);
            for (var i = 0; i < arr.length; i++) {
              arrIssues.push(arr[i]);
              lastJson();
            }
          } else {
            console.log("С JSON-ом беда");
          }
        }
      }
      function lastJson(){
        iteral++
        if(iteral == inputCheckedLenght){
          // console.log(arrIssues);
          screen.classList.add("themes--hidden");
        }
      }
    });





  }
});
