import '../style/style.scss';
import Navigation from './Module/Navigation';
import CreateCategory from './Module/Categories';
import {
  eventCategory,
  eventCategoryMenu,
  eventCheckBox,
  stateCheckBox,
  reLoad,
} from './function/events';

const state = stateCheckBox();
eventCheckBox();
// eslint-disable-next-line no-console
console.log(state);
const categoriesPage = new CreateCategory(state);
const navigation = new Navigation();
const reload = reLoad();

categoriesPage.createCategoriesPage();
categoriesPage.createCategoriesMenu();

navigation.init();

eventCategory();
eventCategoryMenu();
localStorage.setItem('reload', reload);
