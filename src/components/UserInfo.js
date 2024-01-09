class UserInfo {
  constructor(titleSelector, descriptionSelector, avatar) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatar);
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

  // new avatar
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

export default UserInfo;
