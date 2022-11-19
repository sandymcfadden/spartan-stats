import { render } from "react-dom";
import { App } from "./App";

const isDemo = import.meta.env.VITE_IS_DEMO === "true";
if (isDemo) {
  document.title = "DEMO: " + document.title;
}
const container = document.getElementById("app");
render(<App />, container);
