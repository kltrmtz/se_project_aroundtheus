class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this._itemsitems.forEach((data) => {
      this._renderer(data);
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
