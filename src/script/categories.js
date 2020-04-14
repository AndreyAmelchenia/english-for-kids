import '../style/categories.scss';
import CreateCategory from './Module/Categories';
import Navigation from './Module/Navigation';
import {
  eventCategoryMenu,
  eventCard,
  eventSoundCard,
  eventCheckBox,
  stateCheckBox,
  reLoad,
} from './function/event';


const category = localStorage.getItem('category');
const heading = document.querySelector('.h1');
const link = '../';
const navigation = new Navigation();
const state = stateCheckBox();
const categoryPage = new CreateCategory(state, category, link);
let reload = reLoad();

window.onload = () => {
  if (reload === 'off') {
    document.title = category;
    heading.innerHTML = category;
    categoryPage.createCategoriesMenu();
    categoryPage.createCategory();
    eventCheckBox(categoryPage, eventCategoryMenu, eventCard, eventSoundCard);
    eventCategoryMenu();
    eventCard();
    eventSoundCard();
    reload = 'on';
    localStorage.setItem('reload', reload);
  } else {
    reload = 'off';
    localStorage.setItem('reload', reload);
    document.location.href = '../';
  }
};

navigation.init();
