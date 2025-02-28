export class Modal {
  constructor(title, description, onConfirm, onCancel) {
    this.title = title;
    this.description = description;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
  }

  render() {
    return `
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-content">
            <p class="modal-title">${this.title}</p>
            <p class="modal-description">${this.description}</p>
          </div>
          <div class="modal-buttons">
            <button class="btn btn--primary btn--outline modal-exit">Выход</button>
            <button class="btn btn--primary modal-cancel">Отмена</button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const modalElement = document.querySelector(".modal-overlay");
    if (!modalElement) return;
    modalElement.querySelector(".modal-exit").addEventListener("click", () => {
      if (this.onConfirm) this.onConfirm();
      modalElement.remove();
    });
    modalElement
      .querySelector(".modal-cancel")
      .addEventListener("click", () => {
        if (this.onCancel) this.onCancel();
        modalElement.remove();
      });
  }

  show() {
    const temp = document.createElement("div");
    temp.innerHTML = this.render();
    const element = temp.firstElementChild;
    document.body.appendChild(element);
    this.bindEvents();
  }
}
