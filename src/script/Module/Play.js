class Play {
  constructor(obj, state) {
    this.sound = [];
    this.obj = obj;
    this.state = state;
    this.footer = document.querySelector('.footer');
    this.i = 0;
    this.star = document.querySelector('.star');
    this.error = 0;
    this.correct = 0;
  }

  createPlay() {
    this.obj.createCategory(this.state);
    this.footer.innerHTML = '';
    this.footer.innerHTML += `<label class="power">
    <input class="footer__button" type="checkbox">
    <div>
        <svg class="svg" viewBox="0 0 44 44">
            <path d="M22,6 C31,6 38,13 38,22 C38,31 31,38 22,38 C13,38 6,31 6,22 C6,13 13,6 22,6 L22,28" id="path"></path>
        </svg>
    </div>
  </label>`;
  }

  statePlay(state) {
    this.state = state;
  }

  playArr() {
    if (this.sound.length === 0) {
      const shuffled = this.obj.category
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      shuffled.forEach((elem) => {
        const soundObj = new Audio(elem.audioSrc);
        this.sound.push([elem.word, soundObj]);
      });
    }
    // eslint-disable-next-line no-console
    console.log('playArr', this.sound);
  }

  playSound(i) {
    this.sound[i][1].play();
  }

  playError(i) {
    const error = new Audio('../assets/audio/error.mp3');
    error.play();
    error.addEventListener('ended', () => {
      if (error.duration === error.currentTime) {
        this.sound[i][1].play();
      }
    });
  }

  playCorrect(i) {
    const correct = new Audio('../assets/audio/correct.mp3');
    correct.play();
    correct.addEventListener('ended', () => {
      if (correct.currentTime === correct.duration) {
        this.sound[i][1].play();
      }
    });
  }

  clickCard() {
    const arrayCard = document.querySelectorAll('.card__img');
    arrayCard.forEach((el) => {
      el.addEventListener('click', (event) => {
        if (event.target.classList.contains('card__img')) {
          if (this.i < this.sound.length - 1) {
            if (event.target.dataset.name === this.sound[this.i][0]) {
              this.i += 1;
              this.correct += 1;
              this.playCorrect(this.i);
              this.star.innerHTML += '<img class="card__img" src="../assets/img/star-win.svg" alt="star-win.svg"></img>';
              event.target.classList.add('card__inactive');
              event.target.classList.remove('card__img');
            } else {
              this.error += 1;
              this.playError(this.i);
              this.star.innerHTML += '<img class="card__img" src="../assets/img/star.svg" alt="star.svg"></img>';
            }
          } else {
            // eslint-disable-next-line no-console
            console.log(this.error);
            if (this.error > 0) {
              this.obj.createError(this.error);
              this.footer = '';
              const success = new Audio('../assets/audio/failure.mp3');
              success.play();
              success.addEventListener('ended', () => {
                if (success.duration === success.currentTime) {
                  const reload = 'off';
                  localStorage.setItem('reload', reload);
                  document.location.href = '../';
                }
              });
            } else {
              this.obj.createGood();
              this.footer = '';
              const success = new Audio('../assets/audio/success.mp3');
              success.play();
              success.addEventListener('ended', () => {
                if (success.duration === success.currentTime) {
                  const reload = 'off';
                  localStorage.setItem('reload', reload);
                  document.location.href = '../';
                }
              });
            }
          }
        }
      });
    });
  }

  game() {
    const footerButton = document.querySelector('.footer__button');
    if (footerButton.checked) {
      this.playSound(this.i);
      this.clickCard();
    }
  }

  eventButton() {
    const footerButton = document.querySelector('.footer__button');
    const footerButtonRepeat = document.querySelector('.svg');
    footerButton.addEventListener('click', () => {
      if (footerButton.checked) {
        this.game();
        footerButton.disabled = true;
        if (footerButton.checked) {
          footerButtonRepeat.addEventListener('click', (event) => {
            if (event.target.classList.contains('svg')) {
              this.playSound(this.i);
              // eslint-disable-next-line no-console
              console.log('stop');
            }
          });
        }
      }
    });
  }
}

export default Play;
