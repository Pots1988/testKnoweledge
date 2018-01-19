function Test(params) {
  this.item = params.item;
  this.questionsArr = params.questions; /* Массив вопросов */
  this.time = params.time || 20; /* Время ответа на вопрос */
  this.accidentally = params.accidentally || false; /* Сортировать в случайном поряжке вопросы */
  this._questionStart = false; /* Задан вопрос или нет */

  this.activeQuestion = null; /* Активный вопрос */
  this.questionsArrPosed = [];

  this.domElements = { /* Список DOM-объектов для обработки событий */
    question: this.item.querySelector("[data-test-question]"),
    answer: this.item.querySelector("[data-test-answer]"),
    button: this.item.querySelector("[data-test-btn]")
  }

  this.domElements.button.addEventListener("click", () => { /* Событие нажатия на кнопку */
    this._getAnswer();
  });

  this.domElements.answer.addEventListener("keypress", (e) => { /* Событие нажатия на Enter */
    if (e.keyCode == 13) {
      this._getAnswer();
    }
  });

  this._mixQuestion(); /* Запуск функции случайного или линейного задания вопросов */

  // this._setQuestion(); /* Запуск функцию задавания вопросов */
}

Test.prototype._startTimer = function() {
  let obj = this;

  this.timer = new ProgressBar.Circle("#test__timer", {
    strokeWidth: 4,
    trailWidth: 1,
    color: "#111",
    duration: this.time * 1000,

    text: {
      autoStyleContainer: false
    },

    from: {
      color: "rgb(0, 153, 0)",
      width: 1
    },

    to: {
      color: "rgb(255, 51, 0)",
      width: 4
    },

    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      let value = circle.value() * obj.time;

      if (value === 0) {
        circle.setText("");
      } else {
        circle.setText(value.toFixed(1));
      }

      if (circle.value() === 1) {
        console.log("TIMER END");

        obj._getAnswer();
      }
    }
  });

  this.timer.animate(1.0);
}

Test.prototype._setQuestion = function() {
  if (this.questionsArr.length) {
    this.activeQuestion = this.questionsArr.pop(this.questionsArr.length - 1);
    this.domElements.question.innerHTML = this.activeQuestion.question.text;
    this._questionStart = true;
    this.domElements.answer.focus();
    this._startTimer();
  } else {
    this._showResult();
  }
}

Test.prototype._showResult = function() {
  new ResultWrite({
    item: document.querySelector("#result"),
    questionArr: this.questionsArrPosed
  });

  this.item.classList.remove("test--active");
  document.querySelector("#result").classList.add("result--active");
}

Test.prototype._getAnswer = function() {
  if (this._questionStart) {
    this._questionStart = false;
    this.timer.stop();
    this.activeQuestion.answer.text = this.domElements.answer.value.trim();
    this.activeQuestion.answer.time = (this.timer.value() * 10).toFixed(2);

    setTimeout(() => {
      this.timer.destroy();
      this.domElements.answer.value = "";
      this.questionsArrPosed.push(this.activeQuestion);
      this.activeQuestion = null;
      this._setQuestion();
    }, 500);
  } else {
    console.log("Отвечать нельзя");
  }
}

Test.prototype._mixQuestion = function() {
  if (this.accidentally) {

  } else {
    this.questionsArr.reverse();
  }
}



