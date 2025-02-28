import { TestHeader } from "../index.js";

export class TestResult {
  constructor(testData, userAnswers, finalTime) {
    this.testData = testData;
    this.userAnswers = userAnswers;
    this.finalTime = finalTime;
  }

  render() {
    const totalQuestions = this.testData.questions.length;
    let answeredCount = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (this.userAnswers[i] && this.userAnswers[i] !== "") answeredCount++;
    }

    const headerHtml = new TestHeader(
      this.testData,
      answeredCount,
      totalQuestions,
      this.finalTime || "00:00",
    ).render();

    let html = `
      <div class="test-result-container">
        ${headerHtml}
        <div class="test-result">
          <div class="test-result__body">
            <div class="test-result__header">
              <h2 class="test-result__title">Тест завершен</h2>
              <p class="test-result__summary">
                Вы ответили на ${answeredCount} из ${totalQuestions} вопросов.
              </p>
            </div>
            <span class="test-result__answers-title">Ваши ответы</span>
    `;

    this.testData.questions.forEach((question, index) => {
      const correctAnswer = question.correct_answer;
      const userAnswer = this.userAnswers[index] || "не ответили";
      const displayAnswer =
        userAnswer === "не ответили"
          ? "не ответили"
          : userAnswer === correctAnswer
            ? "Правильно"
            : userAnswer;

      html += `
            <div class="test-result__question">
              <p class="test-result__question-text">
                ${index + 1}. ${question.question}
              </p>
              <p class="test-result__correct">
                Правильный ответ: ${correctAnswer}
              </p>
              <p class="test-result__user">
                Вы ответили: ${displayAnswer}
              </p>
            </div>
      `;
    });

    html += `
          </div> 

          <div class="test-result__footer">
            <button class="btn btn--primary btn--outline test-result__retry">
              Пройти еще раз
            </button>
          </div>
        </div> 
      </div>
    `;

    return html;
  }
}
