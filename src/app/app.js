import { Sidebar } from "../widgets/sidebar";
import { TestsPage } from "../pages/tests-page";

export class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.render();
    this.initComponents();
  }

  render() {
    this.rootElement.innerHTML = `
      <div class="app">
        <div class="app__body">
          <aside class="app__sidebar sidebar"></aside>
          <main class="app__main"></main>
        </div>
      </div>
    `;
  }

  initComponents() {
    const sidebarElement = this.rootElement.querySelector(".app__sidebar");
    new Sidebar(sidebarElement);

    const mainElement = this.rootElement.querySelector(".app__main");
    new TestsPage(mainElement);
  }
}
