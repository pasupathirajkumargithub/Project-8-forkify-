import { Array } from "core-js";
import { mark } from "regenerator-runtime";
import icons from "url:../../img/icons.svg";

export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkup();

    if (!render) return markUp;
    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    if (!data) return;
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return;

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  rendreSpinner() {
    const markUp = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._parentElement.innetHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError(message = this._erroMessage) {
    const markUp = `
    <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
    <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
