import {
  cardsBase,
  categoriesBase,
} from '../object/baseElement';
import Card from './Card';
import Category from './Category';

class CreateCategory {
  constructor(link = './pages/categories.html', categoryName = '', categories = categoriesBase, cards = cardsBase) {
    this.categories = categories;
    this.cards = cards;
    this.link = link;
    this.categoryName = categoryName;
    this.category = [];
    this.container = document.querySelector('.container');
    this.listMenu = document.querySelector('.header__nav__list > ul');
    // this.menu = document.querySelectorAll('.header__nav__item > a');
  }

  choiceCategory() {
    let i = 0;
    this.categories.forEach((elem) => {
      if (this.categoryName === elem.categoryName) {
        this.category = this.cards[i];
      }
      i += 1;
    });
  }

  createCategoriesMenu() {
    this.listMenu.innerHTML = '';
    this.listMenu.innerHTML += '<li class="header__nav__item"><a href="../">Categories</a></li>';
    this.categories.forEach((elem) => {
      this.listMenu.innerHTML += `<li class="header__nav__item"><a href=${this.link}>${elem.categoryName}</a></li>`;
    });
  }

  createCategoriesPage() {
    this.container.innerHTML = '';
    this.categories.forEach((elem) => {
      const card = new Category(elem.image, elem.categoryName);
      this.container.innerHTML += card.createElem();
    });
  }

  createCategory() {
    this.choiceCategory();
    this.container.innerHTML = '';
    this.category.forEach((elem) => {
      const card = new Card(elem.image, elem.word, elem.translation, elem.audioSrc);
      this.container.innerHTML += card.createElem();
    });
  }
}

export default CreateCategory;
