
const eventCategory = () => {
  const linkPage = document.querySelectorAll('.category-front');
  linkPage.forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target.classList.contains('category__img')) {
        const category = event.target.nextElementSibling.innerText;
        localStorage.setItem('category', category);
      } else {
        const category = event.target.innerText;
        localStorage.setItem('category', category);
      }
    });
  });
};

const eventCategoryMenu = () => {
  const menuNav = document.querySelectorAll('.header__nav__item > a');
  menuNav.forEach((el) => {
    el.addEventListener('click', (event) => {
      localStorage.setItem('reload', 'off');
      const category = event.target.innerText;
      localStorage.setItem('category', category);
    });
  });
};

const eventCardEnd = () => {
  document.querySelectorAll('#card-wrapper').forEach((el) => {
    el.addEventListener('mouseleave', () => {
      document.querySelectorAll('.card-back').forEach((elem) => {
        elem.classList.remove('card-back_rotate');
      });
      document.querySelectorAll('.section > img').forEach((elem) => {
        if (elem.classList.contains('rotate_no')) {
          elem.classList.add('rotate');
          elem.classList.remove('rotate_no');
        }
      });
      document.querySelectorAll('.card-front').forEach((elem) => {
        elem.classList.remove('card-front_rotate');
      });
    });
  });
};

const statistic = (category) => {
  let statisticTrain = [];
  // let choice = false;
  let i = 0;
  if (localStorage.getItem('statisticTrain')) {
    statisticTrain = JSON.parse(localStorage.getItem('statisticTrain'));
    statisticTrain.forEach((elem, index) => {
      if (elem.catTrain === category) {
        i = index;
      }
    });
  }
  return {
    obj: statisticTrain,
    number: i,
  };
};


const eventCard = (category) => {
  let i = 0;
  document.querySelectorAll('.section > img').forEach((el) => {
    el.addEventListener('click', (event) => {
      const stat = statistic(category);
      if (event.target.classList.contains('rotate')) {
        stat.obj[stat.number].translate.every((elem, index) => {
          if (elem.word === event.target.offsetParent.offsetParent.firstElementChild.dataset.name) {
            i = index;
            return false;
          }
          return true;
        });
        stat.obj[stat.number].translate[i].col += 1;
        localStorage.setItem('statisticTrain', JSON.stringify(stat.obj));
      }
      event.target.classList.add('rotate_no');
      event.target.classList.remove('rotate');
      event.target.offsetParent.offsetParent.firstElementChild.classList.add('card-front_rotate');
      event.target.offsetParent.offsetParent.firstElementChild.nextElementSibling.classList.add('card-back_rotate');
      eventCardEnd();
    });
  });
};

const eventSoundCard = (category) => {
  let i = 0;
  document.querySelectorAll('#card-wrapper').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (!event.target.classList.contains('rotate')
      && !event.target.classList.contains('tip')
      && !event.target.classList.contains('card-wrapper')
      && !event.target.classList.contains('rotate_no')) {
        const sound = event.target.offsetParent.offsetParent.querySelector('#sound');
        sound.play();
        const stat = statistic(category);
        stat.obj[stat.number].word.every((elem, index) => {
          if (elem.word === sound.innerHTML) {
            i = index;
            return false;
          }
          return true;
        });
        stat.obj[stat.number].word[i].col += 1;
        localStorage.setItem('statisticTrain', JSON.stringify(stat.obj));
      }
    });
  });
};

const eventCheckBox = (reload, play, category, wordRepeat) => {
  const check = document.querySelector('#doggle');
  check.addEventListener('click', () => {
    if (check.checked) {
      // const statPlay = statisticPlay(category);
      // statPlay.obj[statPlay.number].col += 1;
      // localStorage.setItem('statisticPlay', JSON.stringify(statPlay.obj));
      const state = 'play';
      localStorage.setItem('state', state);
      if (wordRepeat) {
        play.statePlay(state);
        play.createPlay(wordRepeat);
        play.playArr(wordRepeat);
        play.eventButton();
      } else {
        play.statePlay(state);
        play.createPlay();
        play.playArr();
        play.eventButton();
      }
    } else {
      const state = 'train';
      localStorage.setItem('state', state);
      if (wordRepeat) {
        reload.createCategory(state, wordRepeat);
        eventSoundCard();
        eventCard();
        document.querySelector('.footer').innerHTML = '';
      } else {
        const stat = statistic(category);
        stat.obj[stat.number].col += 1;
        localStorage.setItem('statisticTrain', JSON.stringify(stat.obj));
        reload.createCategory(state);
        eventSoundCard();
        eventCard();
        document.querySelector('.footer').innerHTML = '';
      }
    }
  });
};

const eventCheckBoxIndex = () => {
  const check = document.querySelector('#doggle');
  check.addEventListener('click', () => {
    if (check.checked) {
      const state = 'play';
      localStorage.setItem('state', state);
    } else {
      const state = 'train';
      localStorage.setItem('state', state);
    }
  });
};

const stateCheckBox = () => {
  const check = document.querySelector('#doggle');
  let state = '';
  if (localStorage.getItem('state')) {
    state = localStorage.getItem('state');
    if (state === 'play') {
      check.checked = true;
    } else {
      check.checked = false;
    }
  } else {
    state = 'train';
    check.checked = false;
  }
  return state;
};

const reLoad = () => {
  let reload = '';
  if (localStorage.getItem('reload')) {
    reload = localStorage.getItem('reload');
  } else {
    reload = 'off';
  }
  return reload;
};

export {
  eventCategory,
  eventCategoryMenu,
  eventCard,
  eventSoundCard,
  eventCheckBox,
  statistic,
  stateCheckBox,
  reLoad,
  eventCheckBoxIndex,
};
