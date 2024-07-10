class Api {
  constructor({ address, groupId, token }) {
    this._address = address;
    this._groupId = groupId;
    this._token = token;
    this._baseUrl = `${this._address}${this._groupId}`;
  }

  setProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }

  getCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    });
  }

  getAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url.avatar,
      }),
    });
  }

  getLikes(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/${this._groupId}/cards/likes/${obj._id}`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes:
            obj.likes > 0
              ? obj.likes.push({
                  about: obj.owner.about,
                  avatar: obj.owner.avatar,
                  cohort: obj.owner.cohort,
                  name: obj.owner.name,
                  _id: obj.owner._id,
                })
              : {
                  about: obj.owner.about,
                  avatar: obj.owner.avatar,
                  cohort: obj.owner.cohort,
                  name: obj.owner.name,
                  _id: obj.owner._id,
                },
        }),
      }
    );
  }

  getDislikes(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/${this._groupId}/cards/likes/${obj._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteCard(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/${this._groupId}/cards/${obj._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    );
  }

  setUser(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    });
  }
}

const api = new Api({
  address: `https://around.nomoreparties.co/v1/`,
  groupId: `web_es_12`,
  token: `e42f8e22-9ca0-486e-b216-ea9a771afa3a`,
});

export default api;
