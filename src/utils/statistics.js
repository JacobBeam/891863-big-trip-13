import dayjs from "dayjs";

const MSEC_IN_DAY = 86400000;

const findDurationInMsec = (start, end) => {
  return dayjs(end).diff(dayjs(start));
};

export const countTotalPriceByType = (points, type) => {

  return points.filter((point) => point.eventType === type).reduce((count, point) => count + (+point.eventPrice), 0);

};

export const countTotalAmountByType = (points, type) => {

  return points.filter((point) => point.eventType === type).length;

};

export const countTotalTimeByType = (points, type) => {

  let durationInMS = points.filter((point) => point.eventType === type)
    .reduce((cur, point) => cur + findDurationInMsec(point.startDate, point.endDate), 0);

  return (durationInMS / MSEC_IN_DAY).toFixed(2);

};
