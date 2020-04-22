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
  }

  createStatistic() {
    if (!(localStorage.getItem('statisticTrain'))) {
      let i = 0;
      const statisticTrain = [];
      this.categories.forEach((elem) => {
        statisticTrain.push({
          catTrain: elem.categoryName,
          col: 0,
          word: [],
          translate: [],
        });
        this.cards[i].forEach((el) => {
          statisticTrain[i].word.push({
            word: el.word,
            col: 0,
          });
          statisticTrain[i].translate.push({
            word: el.word,
            translate: el.translation,
            col: 0,
          });
        });
        i += 1;
      });
      localStorage.setItem('statisticTrain', JSON.stringify(statisticTrain));
    }
    if (!(localStorage.getItem('statisticPlay'))) {
      let i = 0;
      const statisticPlay = [];
      this.categories.forEach((elem) => {
        statisticPlay.push({
          catTrain: elem.categoryName,
          col: 0,
          correct: 0,
          error: 0,
          word: [],
        });
        this.cards[i].forEach((el) => {
          statisticPlay[i].word.push({
            word: el.word,
            correct: 0,
            error: 0,
            translation: el.translation,
            image: el.image,
            audioSrc: el.audioSrc,
          });
        });
        i += 1;
      });
      localStorage.setItem('statisticPlay', JSON.stringify(statisticPlay));
    }
  }

  stringWord(wordPlay) {
    const containerStatistic = document.querySelector('.container__statistic');
    // let sting = '';
    this.string = `<div class="container__sort">
      <button class="sort_name">Sort Name</button>
      <button class="sort_error">Sort Error</button>
      <button class="sort_correct">Sort Correct</button>
    </div>
      <div class="grid-container_word">
        <div style="color: black; font-weight: bold;" class="id">ID</div>
        <div  style="color: black; font-weight: bold;" class="word">Word</div>
        <div style="color: black; font-weight: bold;" class="correct">Correct</div>
        <div style="color: black; font-weight: bold;" class="error">Error</div>`;
    wordPlay.forEach((el, index) => {
      if ((index + 1) % 8 !== 0) {
        this.string += `<div class="id">${index + 1}</div>
        <div class="word">${el.word}</div>
        <div class="correct">${el.correct}</div>
        <div class="error">${el.error}</div>`;
      } else {
        this.string += `<div class="id">${index + 1}</div>
        <div class="word">${el.word}</div>
        <div class="correct">${el.correct}</div>
        <div class="error">${el.error}</div>`;
        containerStatistic.innerHTML += this.string;
        this.string = `<div class="grid-container_word">
        <div style="color: black; font-weight: bold;" class="id">ID</div>
        <div style="color: black; font-weight: bold;" class="word">Word</div>
        <div  style="color: black; font-weight: bold;" class="correct">Correct</div>
        <div style="color: black; font-weight: bold;" class="error">Error</div>`;
      }
    });
    return this.string;
  }

  createStatisticButton() {
    this.container.innerHTML = '';
    this.container.innerHTML = `<div class="container__button">
    <button class="stat_train">Statistic Train (no sort)</button>
    <button class="stat_play">Statistic Play (no sort)</button>
    <button class="stat_word">Statistic Word</button>
    <button class="stat_reset">Reset</button>
    <button class="stat_repeat">Repeat difficult words</button>
  </div>
  <div class="container__statistic"></div>`;
  }

  createStatisticPage() {
    const wordRepeat = [];
    const wordPlay = [];
    let sting = '';
    document.querySelector('.container').classList.add('cont');
    document.querySelector('.container').classList.remove('container');
    this.statisticPlay = JSON.parse(localStorage.getItem('statisticPlay'));
    this.statisticTrain = JSON.parse(localStorage.getItem('statisticTrain'));
    const containerStatistic = document.querySelector('.container__statistic');
    const buttons = document.querySelectorAll('.container__button > button');
    buttons.forEach((element) => {
      element.addEventListener('click', (event) => {
        containerStatistic.innerHTML = '';
        switch (event.target.classList.value) {
          case 'stat_train':
            containerStatistic.innerHTML = '';
            this.statisticTrain.forEach((el) => {
              sting += `<div class="grid-container"><div class="category">${el.catTrain}</div><div class="quantity">${el.col}</div>
              <div class="none"></div>
              <div class="wordEn">Word</div>
              <div class="translationRu">Translation</div>`;
              el.word.forEach((elem) => {
                sting += `<div class="word">${elem.word}</div>`;
              });
              el.word.forEach((elem) => {
                sting += `<div class="sound">${elem.col}</div>`;
              });
              el.translate.forEach((elem) => {
                sting += `<div class="trans">${elem.col}</div>`;
              });
              sting += '</div>';
            });
            containerStatistic.innerHTML = sting;
            sting = '';
            break;
          case 'stat_play':
            containerStatistic.innerHTML = '';
            this.statisticPlay.forEach((el) => {
              sting += `<div class="grid-container">
              <div class="category">${el.catTrain}</div>
              <div class="quantity_correct">Correct:${el.correct}</div>
              <div class="quantity_error">Error:${el.error}</div>
              <div class="wordEn_play">Word</div>
              <div class="correct_name">Correct</div>
              <div class="error_name">Error</div>`;
              el.word.forEach((elem) => {
                sting += `<div class="word">${elem.word}</div>`;
              });
              el.word.forEach((elem) => {
                sting += `<div class="correct">${elem.correct}</div>`;
              });
              el.word.forEach((elem) => {
                sting += `<div class="error">${elem.error}</div>`;
              });
              sting += '</div>';
            });
            containerStatistic.innerHTML = sting;
            sting = '';
            break;
          case 'stat_word':
            containerStatistic.innerHTML = '';
            wordPlay.length = 0;
            this.statisticPlay.forEach((el) => {
              el.word.forEach((elem) => {
                wordPlay.push(elem);
              });
            });
            // wordPlay.sort((a, b) => (a.word > b.word ? 1 : -1));
            sting = this.stringWord(wordPlay);
            sting = '';
            this.sort();
            break;
          case 'stat_repeat':
            this.category = 'Repeat difficult words';
            localStorage.setItem('category', this.category);
            wordPlay.length = 0;
            this.statisticPlay.forEach((el) => {
              el.word.forEach((elem) => {
                wordPlay.push(elem);
              });
            });
            wordPlay.sort((a, b) => (a.error < b.error ? 1 : -1));
            wordPlay.every((elem, index) => {
              if (index > 7) {
                return false;
              }
              wordRepeat.push(elem);
              return true;
            });
            localStorage.setItem('wordRepeat', JSON.stringify(wordRepeat));
            localStorage.setItem('reload', 'off');
            document.location.href = './categories.html';
            break;
          case 'stat_reset':
            localStorage.removeItem('statisticPlay');
            localStorage.removeItem('statisticTrain');
            containerStatistic.innerHTML = '';
            this.createStatistic();
            this.statisticPlay = JSON.parse(localStorage.getItem('statisticPlay'));
            this.statisticTrain = JSON.parse(localStorage.getItem('statisticTrain'));
            break;
          default:
            /* code */
            break;
        }
      });
    });
  }

  sort() {
    const buttonsSort = document.querySelectorAll('.container__sort > button');
    const containerStatistic = document.querySelector('.container__statistic');
    const wordPlay = [];
    this.sting = '';
    buttonsSort.forEach((element) => {
      element.addEventListener('click', (event) => {
        containerStatistic.innerHTML = '';
        switch (event.target.classList.value) {
          case 'sort_name':
            // eslint-disable-next-line no-console
            console.log('sort_name');
            containerStatistic.innerHTML = '';
            wordPlay.length = 0;
            this.statisticPlay.forEach((el) => {
              el.word.forEach((elem) => {
                wordPlay.push(elem);
              });
            });
            wordPlay.sort((a, b) => (a.word > b.word ? 1 : -1));
            this.sting = this.stringWord(wordPlay);
            this.sting = '';
            this.sort();
            break;
          case 'sort_error':
            // eslint-disable-next-line no-console
            console.log('sort_error');
            containerStatistic.innerHTML = '';
            wordPlay.length = 0;
            this.statisticPlay.forEach((el) => {
              el.word.forEach((elem) => {
                wordPlay.push(elem);
              });
            });
            wordPlay.sort((a, b) => (a.error < b.error ? 1 : -1));
            this.sting = this.stringWord(wordPlay);
            this.sting = '';
            this.sort();
            break;
          case 'sort_correct':
            // eslint-disable-next-line no-console
            console.log('sort_correct');
            containerStatistic.innerHTML = '';
            wordPlay.length = 0;
            this.statisticPlay.forEach((el) => {
              el.word.forEach((elem) => {
                wordPlay.push(elem);
              });
            });
            wordPlay.sort((a, b) => (a.correct < b.correct ? 1 : -1));
            this.sting = this.stringWord(wordPlay);
            this.sting = '';
            this.sort();
            break;
          default:
            /* code */
            break;
        }
      });
    });
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
    this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}">Home</a></li>`;
    this.categories.forEach((elem) => {
      // eslint-disable-next-line no-console
      console.log('this.categories', this.categoryName);
      // eslint-disable-next-line no-console
      console.log('elem.categoryName', elem.categoryName);
      if (elem.categoryName === this.categoryName) {
        this.listMenu.innerHTML += `<li class="header__nav__item"><a style="color: black;" href="${this.link}pages/categories.html">${elem.categoryName}</a></li>`;
      } else {
        this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}pages/categories.html">${elem.categoryName}</a></li>`;
      }
    });
    if (this.categoryName === 'Statistic') {
      this.listMenu.innerHTML += `<li class="header__nav__item"><a style="color: black;" href="${this.link}pages/categories.html">Statistic</a></li>`;
    } else {
      this.listMenu.innerHTML += `<li class="header__nav__item"><a href="${this.link}pages/categories.html">Statistic</a></li>`;
    }
  }

  createCategoriesPage() {
    this.container.innerHTML = '';
    this.categories.forEach((elem) => {
      const card = new Category(elem.image, elem.categoryName);
      this.container.innerHTML += card.createElem();
    });
  }

  createCategory(status = this.state, category = this.category) {
    // eslint-disable-next-line no-console
    console.log(category);
    this.container.innerHTML = '';
    if (status === 'play') {
      const shuffled = category
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      shuffled.forEach((elem) => {
        const card = new Card(elem.image, elem.word, elem.translation, elem.audioSrc);
        this.container.innerHTML += card.createElemPlay();
      });
    } else {
      category.forEach((elem) => {
        const card = new Card(elem.image, elem.word, elem.translation, elem.audioSrc);
        this.container.innerHTML += card.createElem();
      });
    }
  }

  createGood() {
    this.container.innerHTML = '';
    document.querySelector('.container').classList.add('cont');
    document.querySelector('.container').classList.remove('container');
    document.querySelector('.cont').innerHTML = '<img class="rot" src="../assets/img/success.jpg" alt="">';
  }

  createError(error) {
    this.container.innerHTML = '';
    document.querySelector('.container').classList.add('cont');
    document.querySelector('.container').classList.remove('container');
    document.querySelector('.cont').innerHTML = `<h1 class="rot_h1">${error} ERROR</h1><img class="rot" src="../assets/img/failure.jpg" alt="">`;
  }
}

export default CreateCategory;
