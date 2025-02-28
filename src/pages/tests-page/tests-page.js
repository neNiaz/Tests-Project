import { testsData } from "../../entities/tests/tests-data.js";
import { Modal } from "../../entities/modal";
import { TestDescription, TestResult, TestSession } from "../../entities/tests";

export class TestsPage {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.init();
    this.bindEvents();
  }

  init() {
    this.rootElement.innerHTML = `
      <div class="tests-page tests-page--empty">
        <p class="tests-page__message">Выберите тест из списка</p>
      </div>
    `;
  }

  bindEvents() {
    document.addEventListener("test-selected", (event) => {
      const { testId } = event.detail;
      this.showTestDescription(testId);
    });
  }

  showTestDescription(testId) {
    const testData = testsData[testId];
    if (!testData) {
      this.rootElement.innerHTML = `
        <div class="tests-page tests-page--empty">
          <p class="tests-page__message">Тест не найден</p>
        </div>
      `;
      return;
    }
    const descriptionComponent = new TestDescription(testData);
    this.rootElement.innerHTML = `
      <div class="tests-page">
        ${descriptionComponent.render()}
      </div>
    `;
    const startBtn = this.rootElement.querySelector(".test-description__start");
    const cancelBtn = this.rootElement.querySelector(
      ".test-description__cancel",
    );
    startBtn.addEventListener("click", () => this.startTest(testId));
    cancelBtn.addEventListener("click", () => this.init());
  }

  startTest(testId) {
    const testData = testsData[testId];
    if (!testData) {
      this.rootElement.innerHTML = `
        <div class="tests-page">
          <p class="tests-page__message">Тест не найден</p>
        </div>
      `;
      return;
    }
    const sessionComponent = new TestSession(
      testData,
      () => this.showExitModal(() => this.init()),
      (userAnswers, finalTime) =>
        this.showTestResult(testId, userAnswers, finalTime),
    );
    this.rootElement.innerHTML = `
      <div class="tests-page">
        ${sessionComponent.render()}
      </div>
    `;
    sessionComponent.bindEvents(this.rootElement);
  }

  showTestResult(testId, userAnswers, finalTime) {
    const testData = testsData[testId];
    const resultComponent = new TestResult(testData, userAnswers, finalTime);
    this.rootElement.innerHTML = `
      <div class="tests-page">
        ${resultComponent.render()}
      </div>
    `;
    const retryBtn = this.rootElement.querySelector(".test-result__retry");
    retryBtn.addEventListener("click", () => {
      localStorage.clear();
      this.startTest(testId);
    });
  }

  showExitModal(onConfirm) {
    const modal = new Modal(
      "Вы уверены, что хотите выйти?",
      "Все результаты будут сброшены",
      onConfirm,
      () => {},
    );
    modal.show();
  }
}
