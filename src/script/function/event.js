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
      document.querySelectorAll('.card-front').forEach((elem) => {
        elem.classList.remove('card-front_rotate');
      });
    });
  });
};

const eventCard = () => {
  document.querySelectorAll('.section > img').forEach((el) => {
    el.addEventListener('click', (event) => {
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
      && !event.target.classList.contains('card-wrapper')) {
        event.target.offsetParent.offsetParent.querySelector('#sound').play();
      }
    });
  });
};

const eventCheckBox = (reload, ...args) => {
  const check = document.querySelector('#doggle');
  check.addEventListener('click', () => {
    if (check.checked) {
      const state = 'play';
      localStorage.setItem('state', state);
      reload.createCategory(state);
      // eslint-disable-next-line no-console
      args.forEach((el) => el());
    } else {
      const state = 'train';
      localStorage.setItem('state', state);
      reload.createCategory(state);
      // eslint-disable-next-line no-console
      args.forEach((el) => el());
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
