import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {countTotalPriceByType, countTotalAmountByType, countTotalTimeByType} from "../utils/statistics.js"
import {TYPES} from "../view/mock.js"

const BAR_HEIGHT = 85;


const renderMoneyChart = (moneyCtx,points)=>{

const totalPriceByType = TYPES.map((type)=>countTotalPriceByType(points, type))

  return new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    //  Поменять на уникальные типы транспорта
    labels: TYPES,
    datasets: [{
    //  Поменять в том же порядке стоимость по каждому маршруту
      data: totalPriceByType,
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
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
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `MONEY`,
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
        },
        barThickness: 40,
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
        minBarLength: 50
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
}

const renderTimeSpendChart =  (timeSpendCtx,points)=>{

  const totalTimeByType = TYPES.map((type)=>countTotalTimeByType(points, type))

  return new Chart(timeSpendCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    //  Поменять на уникальные типы транспорта
    labels: TYPES,
    datasets: [{
    //  Поменять на общее время по типу
      data: totalTimeByType,
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
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
        formatter: (val) => `${val}D`
      }
    },
    title: {
      display: true,
      text: `TYME-SPEND`,
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
        },
        barThickness: 40,
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
        minBarLength: 50
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
}

const renderTypeChart = (typeCtx,points)=>{

const totalAmountByType = TYPES.map((type)=>countTotalAmountByType(points, type))

return new Chart(typeCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
        //  Поменять на уникальные типы транспорта

    labels: TYPES,
    datasets: [{
      //  Поменять на общее количество по типу
      data: totalAmountByType,
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
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
        formatter: (val) => `${val}x`
      }
    },
    title: {
      display: true,
      text: `TYPE`,
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
        },
        barThickness: 40,
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
        minBarLength: 50
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
}
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

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  // Нужно ли?
  restoreHandlers() {
    this._setCharts();
     }

  _setCharts() {
    // Нужно отрисовать графики

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const moneyChartCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeChartCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendChartCtx = this.getElement().querySelector(`.statistics__chart--time`);


    moneyChartCtx.height = BAR_HEIGHT * 5;
    typeChartCtx.height = BAR_HEIGHT * 5;
    timeSpendChartCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyChart(moneyChartCtx, this._data)
    this._typeChart = renderTypeChart(typeChartCtx, this._data)
    this._timeSpendChart = renderTimeSpendChart(timeSpendChartCtx, this._data)



  }
}
