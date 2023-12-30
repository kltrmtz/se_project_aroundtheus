class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(title, description) {
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;
