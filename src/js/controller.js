import { model_time_out } from "./confif";
import { async } from "regenerator-runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchview from "./views/searchview";
import resultView from "./views/resultView";
import bookmarkView from "./views/bookmarksView";
import PageNavigationView from "./views/PageNavigationView";
import addRecipeView from "./views/addRecipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import bookmarksView from "./views/bookmarksView";

if (module.hot) {
  module.hot.accept();
}

const controllRcipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.rendreSpinner();

    bookmarkView.update(model.state.bookmarks);

    resultView.update(model.getSerarchResultPage());

    await model.loadrecipe(id);

    recipeView.render(model.state.recipe);

    // PageNavigationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

const controllSearchResult = async function () {
  try {
    resultView.rendreSpinner();

    const query = searchview.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    resultView.render(model.getSerarchResultPage());

    console.log(model.state.search.results);

    PageNavigationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const consntrollPagiantion = function (goTOPage) {
  resultView.render(model.getSerarchResultPage(goTOPage));

  PageNavigationView.render(model.state.search);
};

const contrillServings = function (NewServings) {
  model.updateSrevings(NewServings);

  recipeView.render(model.state.recipe);
};

const controlladdBookmark = function () {
  // Add/ remove bookmark

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmarked(model.state.recipe.id);
  //
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controllbookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.rendreSpinner();

    await model.uploadRecipe(newRecipe);

    // console.log(model.state, "jfjgfhjfgh");

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, "", `${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, model_time_out);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRcipes);
  bookmarkView.addHandlerRender(controllbookmarks);
  recipeView.addHandlerUpdateServings(contrillServings);
  recipeView.addHandlerBookmark(controlladdBookmark);
  searchview.addHandlerSearch(controllSearchResult);
  PageNavigationView.addHandlerClick(consntrollPagiantion);
  addRecipeView.addHandlerUpload(controllAddRecipe);
  // contrillServings();
  console.log("welcome to my page !");
};
init();
