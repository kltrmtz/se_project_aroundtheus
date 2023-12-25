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
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;
