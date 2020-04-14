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
}

// function shuffle(array) {
//   let currentIndex = array.length;
//   let temporaryValue = array.length;
//   let randomIndex = array.length;
//   // temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (currentIndex !== 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

export default CreateCategory;
