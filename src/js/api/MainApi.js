export default class Api {
  constructor(options) {
    ({ origin: this.origin, isAuth: this.isAuth } = options);
    this.baseUrl = String(origin).replace('/undefined', '');
    this.createArticle = this.createArticle.bind(this);
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => data)
      .catch((error) => error.json());
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((articles) => {
        const keywords = [];
        articles.forEach((article) => {
          keywords.push(article.keyword);
          article.key = article.keyword;
        });
        const data = {
          articles,
          keywords,
        };
        return data;
      })
      .catch(() => false);
  }

  createArticle(data) {
    const {
      keyword, title, description, source, url, urlToImage, publishedAt,
    } = data;
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword, title, description, source: source.name, url, urlToImage, publishedAt,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((article) => article)
      .catch(() => false);
  }

  removeArticle(data) {
    const articleId = data.article._id;
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((article) => article)
      .catch(() => false);
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
        return this.getUserData().then((data) => { localStorage.setItem('userName', data.user.name); return 'autorized'; });
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
}
