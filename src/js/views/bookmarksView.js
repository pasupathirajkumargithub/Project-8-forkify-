import icons from "url:../../img/icons.svg";
import previewView from "./perviewView";
import view from "./view";

class bookmarkView extends view {
  _parentElement = document.querySelector(".bookmarks__list");
  _erroMessage = "No bookmarks yet. Please bookmark a nice recipe..!";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new bookmarkView();
