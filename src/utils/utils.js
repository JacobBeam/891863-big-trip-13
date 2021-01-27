import dayjs from "dayjs";

const DURATION_DAY = `day`;
const DURATION_HOUR = `hour`;
const DURATION_MINUTE = `minute`;
const DAY_FORMAT = `D`;
const HOUR_FORMAT = `H`;
const MINUTE_FORMAT = `M`;
const TWO_DIGIT_FORMAT_MIN_VALUE = 0;
const TWO_DIGIT_FORMAT_MAX_VALUE = 10;
const TWO_DIGIT_FORMAT = `0`;


export const SortType = {
  DATE_DEFAULT: `date`,
  DURATION: `duration`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `TABLE`,
  STATISTICS: `STATISTICS`
};

const formatDuration = (duration) =>{
  return (duration >= TWO_DIGIT_FORMAT_MIN_VALUE && duration < TWO_DIGIT_FORMAT_MAX_VALUE) ? TWO_DIGIT_FORMAT + duration : duration;
}

export const isOnline = () => {
  return window.navigator.onLine;
};

export const findEventDuration = (start, end) => {

  let durationInDay = dayjs(end).diff(dayjs(start), DURATION_DAY)
  end = dayjs(end).subtract(durationInDay, DURATION_DAY)
  let durationInHours = dayjs(end).diff(dayjs(start), DURATION_HOUR);
  end = dayjs(end).subtract(durationInHours, DURATION_HOUR)
  let durationInMinutes = dayjs(end).diff(dayjs(start), DURATION_MINUTE);
 durationInMinutes = formatDuration(durationInMinutes) + MINUTE_FORMAT;

 if ((durationInDay > 0) || ( durationInHours > 0)) {
    durationInHours =formatDuration(durationInHours) + HOUR_FORMAT;
  } else { durationInHours = `` };

 durationInDay = (durationInDay > 0) ? formatDuration(durationInDay) + DAY_FORMAT : ``;

  return `${durationInDay} ${durationInHours} ${durationInMinutes}`
};

export const sortDate = (a, b) => {
  return b.startDate - a.startDate;
};

export const sortPrice = (a, b) => {
  return b.eventPrice - a.eventPrice;
};

export const sortDuration = (a, b) => {
  return dayjs(b.endDate).diff(dayjs(b.startDate)) - dayjs(a.endDate).diff(dayjs(a.startDate));
};


export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point)=>point.startDate >= new Date()),
  [FilterType.PAST]: (points) => points.filter((point)=>point.endDate < new Date()),
};
