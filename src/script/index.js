import '../style/style.scss';
import Navigation from './Module/Navigation';
import CreateCategory from './Module/Categories';
import {
  eventCategory,
  eventCategoryMenu,
  stateCheckBox,
  reLoad,
  eventCheckBoxIndex,
} from './function/events';

const state = stateCheckBox();
const categoriesPage = new CreateCategory(state);
const navigation = new Navigation();
eventCheckBoxIndex();
categoriesPage.createStatistic();
const reload = reLoad();

// window.onload = () => {
//   if (reload === 'off') {
//     if (category === 'Statistic') {
//       document.title = category;
//       heading.innerHTML = category;
//       reload = 'on';
//       localStorage.setItem('reload', reload);
//     } else {
//       document.title = category;
//       heading.innerHTML = category;
//       categoryPage.createCategoriesMenu();
//       if (state === 'play') {
//         play.createPlay();
//         play.playArr();
//         play.eventButton();
//         // play.game();
//         eventCheckBox(categoryPage, play);
//       } else {
//         categoryPage.createCategory();
//         eventCheckBox(categoryPage, play);
//         eventSoundCard(category, categoryPage);
//         eventCard(category, categoryPage);
//       }
//       eventCategoryMenu();
//       reload = 'on';
//       localStorage.setItem('reload', reload);
//     }
//   } else {
//     reload = 'off';
//     localStorage.setItem('reload', reload);
//     document.location.href = '../';
//   }
// };
categoriesPage.createCategoriesPage();
categoriesPage.createCategoriesMenu();

navigation.init();

eventCategory();
eventCategoryMenu();
localStorage.setItem('reload', reload);
