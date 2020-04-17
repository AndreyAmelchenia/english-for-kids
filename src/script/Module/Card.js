class CreateCard {
  constructor(image, word, translation, sound) {
    this.image = image;
    this.word = word;
    this.translation = translation;
    this.sound = sound;
  }

  createElem() {
    const elem = `<div id="card-wrapper" class="card-wrapper">
                    <div data-name="${this.word}" class="card card-front">
                        <img class="card__img" src=${this.image} alt="front.png">
                    </div>
                    <div class="card card-back">
                      <img class="card__img" src=${this.image} alt="back.png">
                      <div class="card__translate">
                        <p>${this.translation}</p>
                      </div>
                    </div>
                    <div id="tip" class="tip">
                      <div class="arrow"></div>
                      <div class="section">
                        <p>${this.word}</p>
                        <img class="rotate" src="../assets/img/rotate.svg" alt="rotate.svg">
                      </div>
                    </div>
                    <audio id="sound" src=${this.sound}></audio>
                  </div>`;
    return elem;
  }

  createElemPlay() {
    const elem = `<div id="card-wrapper" class="card-wrapper">
                    <div class="card card-front">
                        <img class="card__img" data-name="${this.word}" src=${this.image} alt="front.png">
                    </div>
                  </div>`;
    return elem;
  }
}

export default CreateCard;
