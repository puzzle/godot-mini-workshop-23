import Presentation from "./model/Presentation";

if (!location.hash) {
  location.hash = Presentation.toHash({
    file: "INDEX.md",
    page: 0
  });
}

(async () => {
  const view = Presentation.parseHash();
  new Presentation(view);
})();  
