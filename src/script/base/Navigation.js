class Navigation {
  constructor() {
    this.nav = document.querySelector('.header__nav');
    this.navTrigger = document.querySelector('.header__nav__trigger');
    this.navContent = document.querySelector('.header__nav__content');
    this.navList = document.querySelector('.header__nav__list');
  }

  init() {
    this.navTrigger.addEventListener('click', () => {
      if (!this.navTrigger.classList.contains('is-active') && !this.nav.classList.contains('is-active')) {
        this.navTrigger.classList.add('is-active');
        this.nav.classList.add('is-active');
        this.nav.addEventListener('transitionend', (event) => {
          if ((event.propertyName === 'width') && this.navTrigger.classList.contains('is-active')) {
            this.navContent.classList.add('is-active');
          }
        });
      } else {
        this.navTrigger.classList.remove('is-active');
        this.navContent.classList.remove('is-active');
        this.navContent.addEventListener('transitionend', (event) => {
          if (event.propertyName === 'opacity' && !this.navTrigger.classList.contains('is-active')) {
            this.nav.classList.remove('is-active');
          }
        });
      }
    });
  }
}

export default Navigation;
