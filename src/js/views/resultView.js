import previewView from "./perviewView";
import icons from "url:../../img/icons.svg";
import view from "./view";

class ResultView extends view {
  _parentElement = document.querySelector(".results");
  _erroMessage = "No recipies blongs to your query. Please Try another  :)";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultView();
