export class TestHeader {
  constructor(testData, progress = 0, total = 0, timerText = "00:00") {
    this.testData = testData;
    this.progress = progress;
    this.total = total;
    this.timerText = timerText;
  }

  render() {
    return `
      <div class="test-header">
        <div class="test-header__close">
            <button type="button" class="btn btn--text test-header__exit"><span>Выход</span></button>
        </div>
        <div class="test-header-name">
            <span class="test-header__name">${this.testData.name}</span>
        </div>
        <div class="test-header__end">
          <button type="button" class="btn btn--text test-header__reset"><span>Сбросить все ответы</span></button>
          <span class="test-header__progress">${this.progress}/${this.total}</span>
          <span class="test-header__timer">${this.timerText}</span>
        </div>
      </div>
    `;
  }
}
