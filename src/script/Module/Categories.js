import cardsBase from '../base/cardBase';
import categoriesBase from '../base/categoriesBase';
import Card from './Card';
import Category from './Category';

class CreateCategory {
  constructor(state, categoryName, link, categories, cards) {
    this.state = state;
    this.categories = categories || categoriesBase;
    this.cards = cards || cardsBase;
    this.link = link || './';
    this.categoryName = categoryName || '';
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
    this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}">Categories</a></li>`;
    this.categories.forEach((elem) => {
      this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}pages/categories.html">${elem.categoryName}</a></li>`;
    });
    this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}pages/categories.html">Statistic</a></li>`;
  }

  createCategoriesPage() {
    this.container.innerHTML = '';
    this.categories.forEach((elem) => {
      const card = new Category(elem.image, elem.categoryName);
      this.container.innerHTML += card.createElem();
    });
  }

  createCategory(status = this.state) {
    this.choiceCategory();
    this.container.innerHTML = '';
    if (status === 'play') {
      const shuffled = this.category
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      shuffled.forEach((elem) => {
        const card = new Card(elem.image, elem.word, elem.translation, elem.audioSrc);
        this.container.innerHTML += card.createElemPlay();
      });
    } else {
      this.category.forEach((elem) => {
        const card = new Card(elem.image, elem.word, elem.translation, elem.audioSrc);
        this.container.innerHTML += card.createElem();
      });
    }
  }

  createGood() {
    this.container.innerHTML = '';
    this.container.innerHTML = '<img class="rotate" src="../assets/img/success.jpg" alt="">';
  }

  createError(error) {
    this.container.innerHTML = '';
    this.container.innerHTML = `<h1 class="h1">${error} ERROR</h1><img class="rotate" src="../assets/img/failure.jpg" alt="">`;
  }
}

export default CreateCategory;
