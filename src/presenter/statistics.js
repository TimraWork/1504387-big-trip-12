import StatisticsView from '../view/statistics.js';

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {render, remove} from '../utils/render.js';
import {getEventsTypesLabels, getEventsTypesCount, getEventsTypesPrices, getEventsTypesTimes, getTransportsLabels, getTransportsCount} from '../utils/statistics.js';
import {RenderPosition} from '../const.js';

export default class STATISTICS {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._statisticsComponent = null;
  }

  init() {
    if (this._statisticsComponent !== null) {
      this.destroy();
    }

    this._statisticsComponent = new StatisticsView(this._renderCharts);
    render(this._container, this._statisticsComponent, RenderPosition.AFTER_END);

    this._renderCharts(this._statisticsComponent);
  }

  _renderCharts(statisticsComponent) {
    if (statisticsComponent) {

      const events = this._eventsModel.getEvents();

      const typesLabels = getEventsTypesLabels(events);
      const typesCount = getEventsTypesCount(events);
      const typesPrices = getEventsTypesPrices(events);
      const typesTimes = getEventsTypesTimes(events);

      const transportsLabels = getTransportsLabels(events);
      const transportsCount = getTransportsCount(events);
      const transportsCounts = getEventsTypesPrices(events);

      const moneyCtx = this._statisticsComponent.getMoneyCtx();
      const transportCtx = this._statisticsComponent.getTransportCtx();
      const timeSpendCtx = this._statisticsComponent.getTimeSpendCtx();

      const BAR_HEIGHT = 55;

      moneyCtx.height = BAR_HEIGHT * typesCount;
      transportCtx.height = BAR_HEIGHT * transportsCount;
      timeSpendCtx.height = BAR_HEIGHT * typesCount;

      this._renderMoneyChart(moneyCtx, typesLabels, typesPrices);
      this._renderTransportChart(transportCtx, transportsLabels, transportsCounts);
      this._renderTimeSpendChart(timeSpendCtx, typesLabels, typesPrices);
    }
    return true;
  }

  // «Сколько за время путешествия было потрачено на такси или рестораны?»
  _renderMoneyChart(ctx, labels, data) {
    const formatter = `€ `;
    const text = `MONEY`;
    return new Chart(ctx, this._setChartArguments(labels, data, formatter, text));
  }

  // «Сколько раз нам придётся воспользоваться самолётом, такси и так далее?»
  _renderTransportChart(ctx, labels, data) {
    // const data = [4, 3, 2, 1];
    const formatter = `x`;
    const text = `TRANSPORT`;
    return new Chart(ctx, this._setChartArguments(labels, data, formatter, text));
  }

  // «Сколько дней пользователь проведёт в самолёте, такси, ресторане и так далее?»
  _renderTimeSpendChart(ctx, labels, data) {
    const formatter = `H`;
    const text = `TIME SPENT`;
    return new Chart(ctx, this._setChartArguments(labels, data, formatter, text));
  }

  _setChartArguments(labels, data, formatter, text) {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels, // тут изменить
        datasets: [{
          data, // тут изменить
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
          barThickness: 44,
          minBarLength: 50
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${formatter} ${val}` // тут изменить
          }
        },
        title: {
          display: true,
          text, // тут изменить
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    };
  }

  destroy() {
    remove(this._statisticsComponent);
  }
}

