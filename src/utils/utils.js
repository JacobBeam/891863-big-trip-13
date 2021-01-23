import dayjs from "dayjs";

export const isOnline = () => {
  return window.navigator.onLine;
};

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

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const findEventDuration = (start, end) => {

  const duration = dayjs(end).diff(dayjs(start), `minute`);

  let stringDuration = ``;

  if (duration < 60) {
    if (duration < 10) {
      stringDuration = `0${duration}M`;
    } else if (duration === 0) {
      stringDuration = `00M`;
    } else {
      stringDuration = `${duration}M`;
    }
  } else if (duration < 60 * 24) {
    const hours = Math.floor(duration / 60);

    if (hours < 10) {
      stringDuration = `0${hours}H`;
    } else {
      stringDuration = `${hours}H`;
    }

    const minutes = duration - hours * 60;
    if (minutes < 10) {
      stringDuration += ` 0${minutes}M`;
    } else if (minutes === 0) {
      stringDuration += ` 00M`;
    } else {
      stringDuration += ` ${minutes}M`;
    }
  } else {
    const days = Math.floor(duration / 60 / 24);
    if (days < 10) {
      stringDuration = `0${days}D`;
    } else {
      stringDuration = `${days}D`;
    }

    const hours = Math.floor((duration - days * 24 * 60) / 60);
    if (hours < 10) {
      stringDuration += ` 0${hours}H`;
    } else {
      stringDuration += ` ${hours}H`;
    }

    const minutes = duration - days * 24 * 60 - hours * 60;
    if (minutes < 10) {
      stringDuration += ` 0${minutes}M`;
    } else if (minutes === 0) {
      stringDuration += ` 00M`;
    } else {
      stringDuration += ` ${minutes}M`;
    }

  }

  return stringDuration;
};

export const sortDate = (a, b) => {
  return a.startDate - b.startDate;
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
