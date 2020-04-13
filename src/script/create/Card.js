class CreateCard {
  constructor(image, word, translation, sound) {
    this.image = image;
    this.word = word;
    this.translation = translation;
    this.sound = sound;
  }

  createElem() {
    const elem = `<div id="card-wrapper">
                    <div class="card card-front">
                        <img class="card__img" src=${this.image} alt="front.png">
                    </div>
                    <div class="card card-back">
                      <img class="card__img" src=${this.image} alt="back.png">
                      <div class="card__translate">
                        <p>${this.translation}</p>
                      </div>
                    </div>
                    <div id="tip">
                      <div class="arrow"></div>
                      <div class="section">
                        <p>${this.word}</p>
                      </div>
                    </div>
                  </div>`;
    return elem;
  }
}

export default CreateCard;
