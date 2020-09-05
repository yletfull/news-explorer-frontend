export default class NewsApi {
  constructor(data) {
    ({
      url: this.url,
      apiKey: this.apiKey,
      to: this.to,
      pageSize: this.pageSize,
      differenceDays: this.differenceDays,
    } = data);
    // var options_all = {
    //     era: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     weekday: 'long',
    //     timezone: 'UTC',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric'
    // };
    this.from = new Date();
    this.from.setDate(this.to.getDate() + this.differenceDays);
    // this.fromDate.toLocaleString("ru", options_all);
    this.from = this.getNowDate(this.from);
    this.to = this.getNowDate(this.to);
  }

  getNews(keywords) {
    return fetch(`${this.url}q=${keywords}&from=${this.from}&to=${this.to}&sortBy=popularity&apiKey=${this.apiKey}&pageSize=${this.pageSize}`)
      .then((data) => (data ? data.json() : Promise.reject(res)))
      .then((articles) => {
        articles.keywords = keywords;
        return articles;
      })
      .catch((err) => false);
  }

  getNowDate(date) {
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;
    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;
    return `${yy}.${mm}.${dd}`;
  }
}
