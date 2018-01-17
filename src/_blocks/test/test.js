let obj = [{
  question: {
    section: "JavaScript",
    theme: "Basic",
    text: "Что вернет <span>typeof prompt('Вопрос', 'Ответ по умолчанию')</span>, если введено значение?",
    time: 10,
    answer: "string"
  },
  answer: {
    time: "",
    text: ""
  }
},
{
  question: {
    section: "JavaScript",
    theme: "Basic",
    text: "Что вернет <span>typeof prompt('Вопрос', 'Ответ по умолчанию')</span>, если не введено значение?",
    time: 10,
    answer: "null"
  },
  answer: {
    time: "",
    text: ""
  }
}];

function Test(params) {
  this.item = params.item;
  this.questionsArr = params.questions; /* Массив вопросов */
  this.time = params.time || 10; /* Время ответа на вопрос */
  this.accidentally = params.accidentally || false; /* Сортировать в случайном поряжке вопросы */
  this._questionStart = false; /* Задан вопрос или нет */

  this.activeQuestion = null; /* Активный вопрос */
  this.questionsArrPosed = [];

  this.domElements = { /* Список DOM-объектовдля обработки событий */
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

  this._setQuestion(); /* Запуск функцию задавания вопросов */
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

      let value = Math.round(circle.value() * 100);

      if (value === 0) {
        circle.setText("");
      } else {
        circle.setText(Math.floor(value/10));
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
    console.log("Вопросы закончились");
    console.log(this.questionsArrPosed);
  }
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

var test = new Test({
  item: document.querySelector("#test"),
  questions: obj,
  time: 10
});


