import Abstract from './abstract.js';

const createStatisticsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class Statistics extends Abstract {
  constructor(callback) {
    super();

    callback();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  getMoneyCtx() {
    return this.getElement().querySelector(`.statistics__chart--money`);
  }

  getTransportCtx() {
    return this.getElement().querySelector(`.statistics__chart--transport`);
  }

  getTimeSpendCtx() {
    return this.getElement().querySelector(`.statistics__chart--time`);
  }
}
