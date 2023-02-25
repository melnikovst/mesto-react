import { ICard, IUser } from './utils';

class Api {
  private _url: string;
  private _headers: HeadersInit;
  constructor({ url, headers }: { url: string; headers: HeadersInit }) {
    this._url = url;
    this._headers = headers;
  }

  async loadCards() {
    const res = await fetch(`${this._url}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async loadProfile() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async getProfileId() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async _handleLike(string: string, obj: ICard) {
    const res = await fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: string,
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  changeLikeCardStatus(obj: ICard, variable: boolean) {
    return variable
      ? this._handleLike('PUT', obj)
      : this._handleLike('DELETE', obj);
  }

  async deleteLike(obj: ICard) {
    const res = await fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async changeProfile(obj: IUser) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    });
    return this._handleResponse(res);
  }

  async addCard({ title, link }: { title: string; link: string }) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    });
    return this._handleResponse(res);
  }

  async deleteCard(obj: ICard) {
    const res = await fetch(`${this._url}/cards/${obj._id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async setNewAvatar(obj: IUser) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    });
    return this._handleResponse(res);
  }

  _handleResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const server = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '12b2cd52-5967-45db-990f-351ecb43e60e',
    'Content-Type': 'application/json',
  },
});
