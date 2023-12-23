class UserInfo {
  constructor(nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo() {
    name = this._nameElement.textContent;
    job = this._jobElement.textContent;
  }
}

export default UserInfo;
