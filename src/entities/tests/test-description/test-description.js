export class TestDescription {
  constructor(testData) {
    this.testData = testData;
  }

  render() {
    return `
      <div class="test-description">
        <h2 class="test-description-title">Описание</h2>
        <div class="test-description-wrapper">
          <p class="test-description-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Curabitur fermentum, nunc non blandit ultrices, quam nisl malesuada quam, 
            vel viverra ligula nunc at nisl. Nulla facilisi. 
            Suspendisse potenti. Sed ut risus nec risus suscipit malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Curabitur fermentum, nunc non blandit ultrices, quam nisl malesuada quam, 
            vel viverra ligula nunc at nisl. Nulla facilisi. 
            Suspendisse potenti. Sed ut risus nec risus suscipit malesuada.
          </p>
          <div class="test-description__buttons">
            <button class="btn btn--primary test-description__start">Начать</button>
            <button class="btn btn--secondary test-description__cancel">Отменить</button>
          </div>
        </div>
      </div>
    `;
  }
}
