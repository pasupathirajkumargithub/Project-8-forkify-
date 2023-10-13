import icons from "url:../../img/icons.svg";
import view from "./view";

class PageNavigationView extends view {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goTOPage = +btn.dataset.goto;
      handler(goTOPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(curPage);

    // first page

    if (curPage === 1 && numPages > 1) {
      return `

      <span class="btn--inline pagination__btn--center
            style="
              font-weight: 700;
              background-color: beige;
              font-size: 20px;
              margin: 0px auto;
            "
          >
          ${curPage} page of ${numPages}</span>

      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    //last page

    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${curPage - 1}</span>
          </button>

          <span class="btn--inline pagination__btn--center
            style="
              font-weight: 700;
              background-color: beige;
              font-size: 20px;
              margin: 0px auto;
            "
          >
          ${curPage} page of ${numPages}</span>
      `;
    }

    // ceneter page
    if (curPage < numPages) {
      return `

      


      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span> Page ${curPage - 1}</span>
    </button>
    
    <span class="btn--inline pagination__btn--center
    style="
      font-weight: 700;
      background-color: beige;
      font-size: 20px;
      margin: 0px auto;
    "
  >
  ${curPage} page of ${numPages}</span>

      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // only one page

    return `<span class="btn--inline pagination__btn--center
    style="
      font-weight: 700;
      background-color: beige;
      font-size: 20px;
      margin: 0px auto;
    "
  >
  ${curPage} page of ${numPages}</span>`;
  }
}

export default new PageNavigationView();
