class UserInfo {
  constructor(nameElement, titleElement) {
    this._nameElement = nameElement;
    this._titleElement = titleElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      title: this._titleElement.textContent,
    };
  }

  setUserInfo(name, title) {
    this._nameElement.textContent = name;
    this._titleElement.textContent = title;
  }
}

export default UserInfo;
