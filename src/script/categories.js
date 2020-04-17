import '../style/categories.scss';
import CreateCategory from './Module/Categories';
import Navigation from './Module/Navigation';
import Play from './Module/Play';
import {
  eventCategoryMenu,
  eventCard,
  eventSoundCard,
  eventCheckBox,
  stateCheckBox,
  reLoad,
} from './function/events';


const category = localStorage.getItem('category');
const heading = document.querySelector('.h1');
const link = '../';
const navigation = new Navigation();
const state = stateCheckBox();
const categoryPage = new CreateCategory(state, category, link);
const play = new Play(categoryPage, state);
let reload = reLoad();

window.onload = () => {
  if (reload === 'off') {
    if (category === 'Statistic') {
      document.title = category;
      heading.innerHTML = category;
      reload = 'on';
      localStorage.setItem('reload', reload);
    } else {
      document.title = category;
      heading.innerHTML = category;
      categoryPage.createCategoriesMenu();
      if (state === 'play') {
        play.createPlay();
        play.playArr();
        play.eventButton();
        // play.game();
        eventCheckBox(categoryPage, play);
      } else {
        categoryPage.createCategory();
        eventCheckBox(categoryPage, play);
        eventSoundCard();
        eventCard(category, categoryPage);
      }
      eventCategoryMenu();
      reload = 'on';
      localStorage.setItem('reload', reload);
    }
  } else {
    reload = 'off';
    localStorage.setItem('reload', reload);
    document.location.href = '../';
  }
};

navigation.init();
