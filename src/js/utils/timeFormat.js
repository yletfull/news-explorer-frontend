export default class TimeFormat {
  constructor(data) {
    ({
      difference: this.difference = 3,
    } = data);
  }

  convertToRussian(date) {
    date = new Date(date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return date;
  }
}
