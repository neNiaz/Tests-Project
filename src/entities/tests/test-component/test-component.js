export class TestComponent {
  constructor(testData, savedAnswers = {}) {
    this.testData = testData;
    this.savedAnswers = savedAnswers;
  }

  renderForm() {
    let html = `<form class="test">`;
    html += `<div class="test__questions">`;

    this.testData.questions.forEach((questionObj, index) => {
      const hasLongAnswer = questionObj.question_answers.some(
        (answer) => answer.length > 20,
      );

      const optionsClass = hasLongAnswer
        ? "test__options test__options--column"
        : "test__options";

      html += `
        <div class="test__question">
          <p class="test__question-text">${index + 1}. ${questionObj.question}</p>
          <div class="${optionsClass}">`;

      questionObj.question_answers.forEach((answer) => {
        const checked = this.savedAnswers[index] === answer ? "checked" : "";
        html += `
              <label class="test__option">
                <input type="radio" name="q${index}" value="${answer}" ${checked}> ${answer}
              </label>`;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `</div>`;

    html += `
      <div class="test__button-container">
        <button type="submit" class="btn btn--primary btn--outline test__finish">Завершить</button>
      </div>
    `;
    html += `</form>`;
    return html;
  }
}
