import '../style/style.scss';
import Navigation from './Module/Navigation';
import CreateCategory from './Module/Categories';
import {
  eventCategory,
  eventCategoryMenu,
  eventCheckBox,
  stateCheckBox,
} from './function/event';

const state = stateCheckBox();
eventCheckBox();
// eslint-disable-next-line no-console
console.log(state);
const categoriesPage = new CreateCategory(state);
const navigation = new Navigation();

categoriesPage.createCategoriesPage();
categoriesPage.createCategoriesMenu();

navigation.init();

eventCategory();
eventCategoryMenu();
