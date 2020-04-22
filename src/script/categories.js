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
  statistic,
} from './function/events';


const category = localStorage.getItem('category');
const heading = document.querySelector('.h1');
const link = '../';
const navigation = new Navigation();
const state = stateCheckBox();
const categoryPage = new CreateCategory(state, category, link);
const play = new Play(categoryPage, category, state);
let reload = reLoad();
const stat = statistic(category);

categoryPage.choiceCategory();
window.onload = () => {
  if (reload === 'off') {
    if (category === 'Statistic') {
      document.title = category;
      heading.innerHTML = category;
      categoryPage.createCategoriesMenu();
      categoryPage.createStatisticButton();
      categoryPage.createStatisticPage();
      eventCategoryMenu();
      reload = 'on';
      localStorage.setItem('reload', reload);
    } else if (category === 'Repeat difficult words') {
      document.title = category;
      heading.innerHTML = category;
      categoryPage.createCategoriesMenu();
      eventCategoryMenu();
      const wordPlay = JSON.parse(localStorage.getItem('wordRepeat'));
      if (state === 'play') {
        play.createPlay(wordPlay);
        play.playArr(wordPlay);
        play.eventButton();
        eventCheckBox(categoryPage, play, category, wordPlay);
        localStorage.setItem('reload', 'on');
      } else {
        categoryPage.createCategory(state, wordPlay);
        eventCheckBox(categoryPage, play, category, wordPlay);
        eventSoundCard();
        eventCard();
        localStorage.setItem('reload', 'on');
        document.querySelector('.footer').innerHTML = '';
      }
    } else {
      document.title = category;
      heading.innerHTML = category;
      categoryPage.createCategoriesMenu();
      if (state === 'play') {
        play.createPlay();
        play.playArr();
        play.eventButton();
        eventCheckBox(categoryPage, play, category);
      } else {
        stat.obj[stat.number].col += 1;
        localStorage.setItem('statisticTrain', JSON.stringify(stat.obj));
        categoryPage.createCategory();
        eventCheckBox(categoryPage, play, category);
        eventSoundCard(category, categoryPage);
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
