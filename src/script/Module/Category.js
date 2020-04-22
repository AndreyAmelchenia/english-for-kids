class Category {
  constructor(image, categoryName) {
    this.image = image;
    this.categoryName = categoryName;
  }

  createElem() {
    const elem = `<a href="./pages/categories.html"><div id="category-wrapper">
                    <div class="category category-front">
                      <img class="category__img" src=${this.image} alt="front.png">
                      <div class="category__name">
                        <p>${this.categoryName}</p>
                      </div>
                    </div>
                  </div></a>`;
    return elem;
  }
}

export default Category;
