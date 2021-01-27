import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {countTotalPriceByType, countTotalAmountByType, countTotalTimeByType} from "../utils/statistics.js";
import {TYPES} from "../utils/const.js";

const BAR_HEIGHT = 55;
const TYPE_CHART = `horizontalBar`;
const ANCHOR_START_CHART = `start`;
const ANCHOR_END_CHART = `end`;
const ALIGH_CHART = `start`;
const MONEY_FORMAT_CHART = `€`;
const TIME_FORMAT_CHART = `D`;
const TYPE_FORMAT_CHART = `x`;
const MONEY_TEXT_CHART = `MONEY`;
const TIME_TEXT_CHART = `TIME-SPEND`;
const TYPE_TEXT_CHART = `TYPE`;
const FONT_SIZE_TITLE_CHART = 23;
const POSITION_TITLE_CHART = `left`;
const PADDING_SCALES_CHART = 5;
const FONT_SIZE_SCALES_CHART = 13;
const BAR_THICKNESS_CHART = 40;
const MIN_BAR_LENGTH = 50;
const WHITE_COLOR = `#ffffff`;
const BLACK_COLOR = `#000000`;
const SELECTOR_MONEY_CHART = `.statistics__chart--money`;
const SELECTOR_TRANSPORT_CHART = `.statistics__chart--transport`;
const SELECTOR_TIME_CHART = `.statistics__chart--time`;

const renderMoneyChart = (moneyCtx, points) => {

  const totalPriceByType = TYPES.map((type) => countTotalPriceByType(points, type));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: TYPE_CHART,
    data: {
      labels: TYPES,
      datasets: [{
        data: totalPriceByType,
        backgroundColor: WHITE_COLOR,
        hoverBackgroundColor: WHITE_COLOR,
        anchor: ANCHOR_START_CHART
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE_SCALES_CHART
          },
          color: BLACK_COLOR,
          anchor: ANCHOR_END_CHART,
          align: ALIGH_CHART,
          formatter: (val) => `${MONEY_FORMAT_CHART} ${val}`
        }
      },
      title: {
        display: true,
        text: MONEY_TEXT_CHART,
        fontColor: BLACK_COLOR,
        fontSize: FONT_SIZE_TITLE_CHART,
        position: POSITION_TITLE_CHART
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: BLACK_COLOR,
            padding: PADDING_SCALES_CHART,
            fontSize: FONT_SIZE_SCALES_CHART,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: BAR_THICKNESS_CHART,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: MIN_BAR_LENGTH
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, points) => {

  const totalTimeByType = TYPES.map((type) => countTotalTimeByType(points, type));

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: TYPE_CHART,
    data: {
      labels: TYPES,
      datasets: [{
        data: totalTimeByType,
        backgroundColor: WHITE_COLOR,
        hoverBackgroundColor: WHITE_COLOR,
        anchor: ANCHOR_START_CHART
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE_SCALES_CHART
          },
          color: BLACK_COLOR,
          anchor: ANCHOR_END_CHART,
          align: ALIGH_CHART,
          formatter: (val) => `${val}${TIME_FORMAT_CHART}`
        }
      },
      title: {
        display: true,
        text: TIME_TEXT_CHART,
        fontColor: BLACK_COLOR,
        fontSize: FONT_SIZE_TITLE_CHART,
        position: POSITION_TITLE_CHART
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: BLACK_COLOR,
            padding: PADDING_SCALES_CHART,
            fontSize: FONT_SIZE_SCALES_CHART,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: BAR_THICKNESS_CHART,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: MIN_BAR_LENGTH
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, points) => {

  const totalAmountByType = TYPES.map((type) => countTotalAmountByType(points, type));

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: TYPE_CHART,
    data: {
      labels: TYPES,
      datasets: [{
        data: totalAmountByType,
        backgroundColor: WHITE_COLOR,
        hoverBackgroundColor: WHITE_COLOR,
        anchor: ANCHOR_START_CHART
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE_SCALES_CHART
          },
          color: BLACK_COLOR,
          anchor: ANCHOR_END_CHART,
          align: ALIGH_CHART,
          formatter: (val) => `${val}${TYPE_FORMAT_CHART}`
        }
      },
      title: {
        display: true,
        text: TYPE_TEXT_CHART,
        fontColor: BLACK_COLOR,
        fontSize: FONT_SIZE_TITLE_CHART,
        position: POSITION_TITLE_CHART
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: BLACK_COLOR,
            padding: PADDING_SCALES_CHART,
            fontSize: FONT_SIZE_SCALES_CHART,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: BAR_THICKNESS_CHART,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: MIN_BAR_LENGTH
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
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
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};


export default class Statistics extends SmartView {

  constructor(points) {
    super();

    this._data = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const moneyChartCtx = this.getElement().querySelector(SELECTOR_MONEY_CHART);
    const typeChartCtx = this.getElement().querySelector(SELECTOR_TRANSPORT_CHART);
    const timeSpendChartCtx = this.getElement().querySelector(SELECTOR_TIME_CHART);


    moneyChartCtx.height = BAR_HEIGHT * TYPES.length;
    typeChartCtx.height = BAR_HEIGHT * TYPES.length;
    timeSpendChartCtx.height = BAR_HEIGHT * TYPES.length;

    this._moneyChart = renderMoneyChart(moneyChartCtx, this._data);
    this._typeChart = renderTypeChart(typeChartCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendChartCtx, this._data);

  }
}
