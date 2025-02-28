import { TestHeader, TestComponent } from "../index.js";
import { formatTime, startTimer } from "../../../utils/timer.js";

export class TestSession {
  constructor(testData, onExit, onSubmit) {
    this.testData = testData;
    this.onExit = onExit;
    this.onSubmit = onSubmit;
    this.timerData = null;
  }

  render() {
    const headerHtml = new TestHeader(
      this.testData,
      0,
      this.testData.questions.length,
      "00:00",
    ).render();
    const formHtml = new TestComponent(this.testData).renderForm();
    return `
      <div class="test-container">
        ${headerHtml}
        ${formHtml}
      </div>
    `;
  }

  bindEvents(rootElement) {
    const testContainer = rootElement.querySelector(".test-container");
    const timerEl = testContainer.querySelector(".test-header__timer");
    const progressEl = testContainer.querySelector(".test-header__progress");
    const formEl = testContainer.querySelector("form.test");
    const exitBtn = testContainer.querySelector(".test-header__exit");
    const resetBtn = testContainer.querySelector(".test-header__reset");

    exitBtn.addEventListener("click", () => {
      if (this.onExit) this.onExit();
    });

    this.timerData = startTimer((minutes, seconds) => {
      timerEl.textContent = formatTime(minutes, seconds);
    });

    const updateProgress = () => {
      let answered = 0;
      this.testData.questions.forEach((_, index) => {
        if (formEl.querySelector(`input[name="q${index}"]:checked`)) answered++;
      });
      progressEl.textContent = `${answered}/${this.testData.questions.length}`;
    };

    formEl.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", updateProgress);
    });

    resetBtn.addEventListener("click", () => {
      formEl
        .querySelectorAll('input[type="radio"]')
        .forEach((input) => (input.checked = false));
      updateProgress();
    });

    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      clearInterval(this.timerData.intervalId);
      const formData = new FormData(formEl);
      const userAnswers = {};
      this.testData.questions.forEach((_, index) => {
        userAnswers[index] = formData.get(`q${index}`) || "";
      });
      const elapsedTime = formatTime(
        Math.floor((Date.now() - this.timerData.startTime) / 60000),
        Math.floor((Date.now() - this.timerData.startTime) / 1000) % 60,
      );
      if (this.onSubmit) this.onSubmit(userAnswers, elapsedTime);
    });
  }
}
