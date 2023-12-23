class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this._items.forEach((cardData) => {
      this._renderer(cardData);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

// new Section({
//   renderer: () => {
//     // logic
//   },
// });

export default Section;
