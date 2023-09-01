import Presentation from "./model/Presentation";
import marked from "marked";

(async () => {
  const md = await (await fetch("PRESENTATION.md")).text();
  const html = marked.parse(md);
  new Presentation(html);
})();
