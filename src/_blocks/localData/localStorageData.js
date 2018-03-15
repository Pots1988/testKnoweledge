function LocalStorageData(arr) {
  this.arrAnswers = arr;
  this.dateObj = new Date();
  this.localeDate = this.dateObj.toLocaleDateString();
  this.localeTime = this.dateObj.toLocaleTimeString();

  this.userStorageAnswers = null;

  this.getUserAnswers();
  this.setUserAnswers();
}

// Функция получения записанных ранее данных
LocalStorageData.prototype.getUserAnswers = function() {
  if (this.checkLocalStorageWork()) {
    try {
      this.userStorageAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    } catch (err) {
      console.warn("Извините, в полученных данных ошибка");
    }
  } else {
    console.warn("Извините, у вас не поддерживается LocalStorage");
  }
}

// Функция создания записи в LocalStorage
LocalStorageData.prototype.setUserAnswers = function() {
  let key = this.localeDate;

  if (!this.userStorageAnswers) {
    let obj = {};

    obj[key] = {
      date: this.localeDate,
      attempts: [
        this.createAttempt()
      ]
    }
    this.userStorageAnswers = obj;
  } else {
    if (key in this.userStorageAnswers) {
      this.userStorageAnswers[key].attempts.push(this.createAttempt());
    } else {
      this.userStorageAnswers[key] = {
        date: this.localeDate,
        attempts: [
          this.createAttempt()
        ]
      }
    }
  }

  let userAnswers = JSON.stringify(this.userStorageAnswers);

  localStorage.setItem("userAnswers", userAnswers);
}

// Функция создания попытки
LocalStorageData.prototype.createAttempt = function() {
  return {
    time: this.localeTime,
    themes: this.themeFilter(this.arrAnswers)
  }
}

// Функция группировки вопросов по темам
LocalStorageData.prototype.themeFilter = function(arr) {
  let themeArr = [];

  arr.forEach((itemAllArr) => {
    let themeObj,
        questionTheme = itemAllArr.question.theme,
        themsIs = this.checkThemeBeing(themeArr, questionTheme);

    if (themsIs) {
      let themeArrayIndex = null;

      themeArr.forEach((item, index) => {
        if (item.themeName == questionTheme) {
          themeArrayIndex = index;
        }
      });

      themeObj = themeArr[themeArrayIndex];
    } else {
      themeObj = this.createThemeObject(itemAllArr);
      themeArr.push(themeObj);
    }

    themeObj.totalTime += itemAllArr.answer.time;

    themeObj.answersInfo.total++;

    if (!this.cheakAnswerTrue(itemAllArr)) {
      themeObj.answersInfo.incorrect++;
      themeObj.questions.push(this.createQuestion(itemAllArr));
    } else {
      themeObj.answersInfo.correct++;
    }
  });

  return themeArr;
}

// Функция создания объекта темы
LocalStorageData.prototype.createThemeObject = function(answerObj) {
  let obj = {
    themeName: answerObj.question.theme,
    totalTime: 0,
    answersInfo: {
      correct: 0,
      incorrect: 0,
      total: 0
    },
    questions: []
  };

  return obj;
}

// Функция создания объекта вопроса
LocalStorageData.prototype.createQuestion = function(answerObj) {
  let obj = {
    id: answerObj.question.id,
    question: answerObj.question.text,
    answerCorrect: answerObj.question.answer,
    answerUser: answerObj.answer.text,
    answerTime: answerObj.answer.time
  };

  return obj;
}

// Функция проверки работоспособности localStorage
LocalStorageData.prototype.checkLocalStorageWork = function() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (err) {
    return false;
  }
}

// Функция проверки существования темы
LocalStorageData.prototype.checkThemeBeing = function(themeArr, theme) {
  return themeArr.some((item) => item.themeName === theme ? true : false);
}

// Функция проверки правильности ответа
LocalStorageData.prototype.cheakAnswerTrue = function(answerObj) {
  return answerObj.question.answer == answerObj.answer.text ? true : false;
}
