function ResultWrite(params) {
  this.item = params.item;
  this.questionArr = params.questionArr;
  this.totalTime = params.totalTime;

  this.domElements = {
    resultCorrect: this.item.querySelector("[data-result-correct]"),
    resultIncorrect: this.item.querySelector("[data-result-incorrect]"),
    resultTotal: this.item.querySelector("[data-result-total]"),
    resultList: this.item.querySelector("[data-result-list]"),
    resultTotalTime: this.item.querySelector("[data-result-total-time]"),
    resultFilter: this.item.querySelector("[data-result-filter]")
  };

  this._setAnswer();

  this.domElements.resultFilter.addEventListener("change", e => {
    this.showFilterQuestion(e.target.value);
  });

  new LocalStorageData(this.questionArr);
}

ResultWrite.prototype._setAnswer = function() {
  let correctCount = 0,
      incorrectCount  = 0,
      totalCount = this.questionArr.length;

  this.questionArr.forEach(item => {
    let li = document.createElement("li"),
        time = document.createElement("p"),
        question = document.createElement("p"),
        answerDefault = document.createElement("p"),
        answerUser = document.createElement("p");

    time.classList.add("result__question-time");

    let timeText = document.createElement("time");
    timeText.classList.add("result__time");
    timeText.textContent = item.answer.time + "c";
    time.appendChild(timeText);

    question.classList.add("result__question-text");
    question.innerHTML = item.question.text;

    answerDefault.classList.add("result__answer");
    answerDefault.classList.add("result__answer--default");
    answerDefault.innerHTML = item.question.answer;

    answerUser.classList.add("result__answer");
    answerUser.classList.add("result__answer--user");
    answerUser.innerHTML = item.answer.text;

    if (item.question.answer == item.answer.text) {
      correctCount++;
      answerUser.classList.add("result-correct");
      answerUser.insertAdjacentHTML("afterBegin",
      `<svg width="15px" height="15px">
          <use xlink:href="#icon-ok" />
        </svg>`);
      li.dataset.correct = true;
    } else {
      incorrectCount++;
      answerUser.classList.add("result-incorrect");
      answerUser.insertAdjacentHTML("afterBegin",
      `<svg width="15px" height="15px">
          <use xlink:href="#icon-error" />
        </svg>`);
      li.dataset.correct = false;
    }

    li.appendChild(time);
    li.appendChild(question);
    li.appendChild(answerDefault);
    li.appendChild(answerUser);

    this.domElements.resultList.appendChild(li);
  });

  this.domElements.resultCorrect.textContent = correctCount;
  this.domElements.resultIncorrect.textContent = incorrectCount;
  this.domElements.resultTotal.textContent = totalCount;
  this.domElements.resultTotalTime.textContent = this.totalTime + "c";
}

ResultWrite.prototype.showFilterQuestion = function(type) {
  let setVisibleElement = function(value) {
    Array.prototype.forEach.call(this.item.querySelectorAll("li"), (item) => {
      if (item.dataset.correct == value || value === undefined) {
        item.hidden = false;
      } else {
        item.hidden = true;
      }
    });
  }

  switch(type) {
    case "correct": setVisibleElement.call(this, "true");
    break;

    case "incorrect": setVisibleElement.call(this, "false");
    break;

    default: setVisibleElement.call(this);
  }
}
