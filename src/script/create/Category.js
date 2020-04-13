class Category {
  constructor(image, categoryName) {
    this.image = image;
    this.categoryName = categoryName;
  }

  createElem() {
    const elem = `<a href="./pages/categories.html"><div id="card-wrapper">
                    <div class="card card-front">
                      <img class="card__img" src=${this.image} alt="front.png">
                      <div class="card__translate">
                        <p>${this.categoryName}</p>
                      </div>
                    </div>
                  </div></a>`;
    return elem;
  }
}

export default Category;
