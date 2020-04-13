import '../style/style.scss';
import Navigation from './base/Navigation';
// import action from './object/baseElement';
import CreateCategory from './create/Categories';


// const menu = document.querySelectorAll('.header__nav__item > a');

const navigation = new Navigation();
let category = '';

navigation.init();
// const rotate = () => document.querySelector('.card-front').addEventListener('click', (e) => {
//   if (e.target.classList.contains('card')) {
//     document.querySelector('.card-front').classList.add('card-front_rotate');
//     document.querySelector('.card-back').classList.add('card-back_rotate');
//   }
// });


const categoriesPage = new CreateCategory();
categoriesPage.createCategoriesPage();
categoriesPage.createCategoriesMenu();
// categoriesPage.eventCategoryMenu();

const eventCategory = () => {
  document.querySelectorAll('.card-front').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__img')) {
        category = event.target.nextElementSibling.innerText;
        localStorage.setItem('category', category);
      } else {
        category = event.target.innerText;
        localStorage.setItem('category', category);
      }
    });
  });
};
eventCategory();

const eventCategoryMenu = () => {
  const menu = document.querySelectorAll('.header__nav__item > a');
  menu.forEach((el) => {
    el.addEventListener('click', (event) => {
      const cat = event.target.innerText;
      // eslint-disable-next-line no-console
      console.log(cat);
      localStorage.setItem('category', cat);
    });
  });
};

eventCategoryMenu();
