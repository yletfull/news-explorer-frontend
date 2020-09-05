export default class Api {
  constructor(options) {
    ({ origin: this.origin, isAuth: this.isAuth } = options);
    this.baseUrl = `${this.origin}`;
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        localStorage.setItem('userName', data.user.name);
      })
      .catch((error) => error.json())
      .then((error) => console.log(error.message))
      .catch(() => {});
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((articles) => articles)
      .catch((error) => error.json());
  }

  createArticle() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((article) => article)
      .catch((error) => error.json());
  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((article) => article)
      .catch((error) => error.json());
  }

  signin(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data[0].value,
        password: data[1].value,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        localStorage.setItem('token', data.token);
        this.getUserData();
        return 'autorized';
      })
      .catch((error) => error.json());
  }

  signup(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data[0].value,
        password: data[1].value,
        name: data[2].value,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(() => 'registred')
      .catch((error) => error.json());
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  editData(arg) {
    return fetch(`${this.baseUrl}/${arg.postfix}`, {
      method: arg.method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  deleteCard(arg) {
    return fetch(`${this.baseUrl}/cards/${arg.id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  likeAddRemove(arg) {
    return fetch(`${this.baseUrl}/cards/like/${arg.id}`, {
      method: arg.method,
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }
}
