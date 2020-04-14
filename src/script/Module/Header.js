class Header {
  constructor() {
    this.header = document.querySelector('.header');
  }

  createHeader() {
    this.header.innerHTML = '';
    this.header.innerHTML = `<div class="wrapper header__wrapper">
    <div class="header__nav">
      <a href="#" class="header__nav__trigger">
        <div class="header__nav__bars"></div>
      </a>
      <div class="header__nav__content">
        <nav class="header__nav__list">
          <ul>
          </ul>
        </nav>
      </div> 
    </div>
    <h1 class="h1">English For Kids</h1>
    <div class="toggle-wrapper">
      <input type="checkbox" class="doggle" id="doggle">
      <label for="doggle" class="toggle">
        <span class="toggle-handler">
          <span class="face eye-left"></span>
          <span class="face eye-right"></span>
          <span class="nose"></span>
          <span class="face mouth1"></span>
          <span class="face mouth2"></span>
          <span class="face2 mouth-smile"></span>
          <span class="face2 mouth-smile2"></span>
          <span class="left-ear">
            <span class="right-ear">
              <span class="tongue"></span>
            </span>
          </span>
        </span>
      </label>
    </div>
  </div>`;
  }
}
