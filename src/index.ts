import "./style.css";

/**
 * mount app after dom content loaded
 */
window.addEventListener("DOMContentLoaded", () => {
  document.title = window.env.icon + " " + window.env.appName;
  document.getElementById("app").innerHTML = `Brand : ${window.env.brand} <br/> App Name : ${window.env.appName}`;
});
