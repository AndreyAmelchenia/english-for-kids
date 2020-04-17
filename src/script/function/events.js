// import Play from '../Module/Play';

const eventCategory = () => {
  document.querySelectorAll('.card-front').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__img')) {
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
  const menu = document.querySelectorAll('.header__nav__item > a');
  menu.forEach((el) => {
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

const statistic = (category, obj) => {
  let statisticTrain = [];
  let stat = '';
  let choice = false;
  let i = 0;
  // const translate = [];
  // const base = [];
  if (localStorage.getItem('statistic')) {
    stat = localStorage.getItem('statistic');
    statisticTrain = JSON.parse(stat);
    statisticTrain.forEach((elem, index) => {
      if (elem.catTrain === category) {
        i = index;
        choice = true;
      }
    });
    if (!choice) {
      const { length } = statisticTrain;
      statisticTrain.push({
        catTrain: category,
        word: [],
        translate: [],
        base: [],
      });
      obj.category.forEach((el) => {
        statisticTrain[length].word.push({
          word: el.word,
          col: 0,
        });
        statisticTrain[length].translate.push({
          word: el.word,
          translate: el.translation,
          col: 0,
        });
        statisticTrain[length].base.push({
          img: el.image,
          audioSrc: el.audioSrc,
          col: 0,
        });
      });
      stat = JSON.stringify(statisticTrain);
      localStorage.setItem('statistic', stat);
    }
  } else {
    statisticTrain.push({
      catTrain: category,
      word: [],
      translate: [],
      base: [],
    });
    obj.category.forEach((el) => {
      statisticTrain[0].word.push({
        word: el.word,
        col: 0,
      });
      statisticTrain[0].translate.push({
        word: el.word,
        translate: el.translation,
        col: 0,
      });
      statisticTrain[0].base.push({
        img: el.image,
        audioSrc: el.audioSrc,
        col: 0,
      });
    });
    stat = JSON.stringify(statisticTrain);
    localStorage.setItem('statistic', stat);
  }
  return {
    obj: statisticTrain,
    number: i,
  };
};

const eventCard = (category, obj) => {
  let i = 0;
  document.querySelectorAll('.section > img').forEach((el) => {
    el.addEventListener('click', (event) => {
      const stat = statistic(category, obj);
      if (event.target.classList.contains('rotate')) {
        stat.obj[stat.number].translate.every((elem, index) => {
          if (elem.word === event.target.offsetParent.offsetParent.firstElementChild.dataset.name) {
            i = index;
            return false;
          }
          return true;
        });
        stat.obj[stat.number].translate[i].col += 1;
        localStorage.setItem('statistic', JSON.stringify(stat.obj));
      }
      event.target.classList.add('rotate_no');
      event.target.classList.remove('rotate');
      event.target.offsetParent.offsetParent.firstElementChild.classList.add('card-front_rotate');
      event.target.offsetParent.offsetParent.firstElementChild.nextElementSibling.classList.add('card-back_rotate');
      eventCardEnd();
    });
  });
};

const eventSoundCard = () => {
  document.querySelectorAll('#card-wrapper').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (!event.target.classList.contains('rotate')
      && !event.target.classList.contains('tip')
      && !event.target.classList.contains('card-wrapper')
      && !event.target.classList.contains('rotate_no')) {
        event.target.offsetParent.offsetParent.querySelector('#sound').play();
        // //// work fix
        // success.addEventListener('ended', () => {
        //   if (success.duration === success.currentTime) {
        //     const reload = 'off';
        //     localStorage.setItem('reload', reload);
        //     document.location.href = '../';
        //   }
        // });
      }
    });
  });
};

const eventCheckBox = (reload, play, ...args) => {
  const check = document.querySelector('#doggle');
  check.addEventListener('click', () => {
    if (check.checked) {
      const state = 'play';
      localStorage.setItem('state', state);
      // const play = new Play(reload, state);
      play.statePlay(state);
      play.createPlay();
      play.playArr();
      play.eventButton();
      // reload.createCategory(state);
      args.forEach((el) => el());
    } else {
      const state = 'train';
      localStorage.setItem('state', state);
      reload.createCategory(state);
      eventSoundCard();
      eventCard();
      args.forEach((el) => el());
      document.querySelector('.footer').innerHTML = '';
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
  stateCheckBox,
  reLoad,
};
