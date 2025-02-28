import { App } from "./app";
import "./styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  if (appContainer) {
    new App(appContainer);
  }
});
