import '../style/categories.scss';
import CreateCategory from './create/Categories';
import Navigation from './base/Navigation';

const navigation = new Navigation();
const category = localStorage.getItem('category');
const categoryPage = new CreateCategory('./categories.html', category);
document.title = category;


categoryPage.createCategoriesMenu();
categoryPage.createCategory();
navigation.init();

const eventCard = () => {
  document.querySelectorAll('.card-front').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__img')) {
        event.target.offsetParent.classList.add('card-front_rotate');
        event.target.offsetParent.nextElementSibling.classList.add('card-back_rotate');
      }
    });
  });
};

const eventCardEnd = () => {
  document.querySelectorAll('.card-back').forEach((el) => {
    el.addEventListener('mouseout', () => {
      document.querySelectorAll('.card-back').forEach((elem) => {
        elem.classList.remove('card-back_rotate');
      });
      document.querySelectorAll('.card-front').forEach((elem) => {
        elem.classList.remove('card-front_rotate');
      });
    });
  });
};

eventCard();
eventCardEnd();
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
