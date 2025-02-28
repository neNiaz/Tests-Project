export class Sidebar {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.isClosed = false;
    this.ICON_OPEN = `
      <svg class="sidebar__icon"  xmlns="http://www.w3.org/2000/svg" color="currentColor" fill="currentColor" width="24" height="24">
        <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z"/>
      </svg>
    `;
    this.ICON_CLOSE = `
      <svg viewBox="0 0 100 80" width="24" height="24" color="currentColor" fill="currentColor" class="sidebar__icon">
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg>
    `;
    this.init();
  }

  init() {
    this.rootElement.innerHTML = `
      <div class="sidebar__header">
        <button class="sidebar__back-button">
            ${this.ICON_OPEN}
        </button>
        <h2 class="sidebar__title">ТЕСТЫ</h2>
      </div>
      <ul class="sidebar__list">
        <li class="sidebar__item" data-test-id="1">Test's name</li>
        <li class="sidebar__item" data-test-id="2">Another Test</li>
        <li class="sidebar__item" data-test-id="3">Test</li>
        <li class="sidebar__item" data-test-id="4">Название теста</li>
      </ul>
    `;
    this.backButton = this.rootElement.querySelector(".sidebar__back-button");
    this.listElement = this.rootElement.querySelector(".sidebar__list");
    this.bindEvents();
  }

  bindEvents() {
    this.backButton.addEventListener("click", () => {
      console.log("Back button clicked");
      this.toggle();
    });

    this.listElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("sidebar__item")) {
        this.setActiveItem(event.target);
        const testId = event.target.getAttribute("data-test-id");
        document.dispatchEvent(
          new CustomEvent("test-selected", { detail: { testId } }),
        );
      }
    });
  }

  toggle() {
    this.isClosed ? this.open() : this.close();
  }

  open() {
    this.isClosed = false;
    this.rootElement.classList.remove("sidebar--closed");
    this.backButton.innerHTML = this.ICON_OPEN;
  }

  close() {
    this.isClosed = true;
    this.rootElement.classList.add("sidebar--closed");
    this.backButton.innerHTML = this.ICON_CLOSE;
  }

  setActiveItem(selectedItem) {
    this.listElement.querySelectorAll(".sidebar__item").forEach((item) => {
      item.classList.remove("sidebar__item--active");
    });
    selectedItem.classList.add("sidebar__item--active");
  }
}
