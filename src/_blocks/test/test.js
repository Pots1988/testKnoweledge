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
    text: "Что вернет typeof prompt('Вопрос', 'Ответ по умолчанию'), если не введено значение?",
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
  this.questionsArr = params.questions;
  this.time = params.time || 10;
  this.accidentally = params.accidentally || false;
  this._questionStart = false;

  this.questionObj = {
    question: this.item.querySelector("[data-test-question]"),
    answer: this.item.querySelector("[data-test-answer]"),
    button: this.item.querySelector("[data-test-btn]")
  }

  this.questionObj.button.addEventListener("click", () => {
    this._getAnswer();
  });

  this._createTimer();
  this._setQuestion(this.questionsArr[0]);
}

Test.prototype._createTimer = function() {
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
    }
  });
}

Test.prototype._startTimer = function() {
  this.timer.animate(1.0);
}

Test.prototype._setQuestion = function(obj) {
  this.questionObj.question.innerHTML = obj.question.text;
  this._questionStart = true;
}

Test.prototype._getAnswer = function(obj) {
  if (this._questionStart) {

  } else {
    console.log("Отвечать нельзя");
  }
}

var test = new Test({
  item: document.querySelector("#test"),
  questions: obj,
  time: 10
});
