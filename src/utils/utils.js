import dayjs from "dayjs";

const formatDuration = (duration) =>{
  return (duration >= 0 && duration < 10) ? `0` + duration : duration;
}

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
  const lowerValue = Math.ceil(Math.min(a, b));
  const upperValue = Math.floor(Math.max(a, b));

  return Math.floor(lowerValue + Math.random() * (upperValue - lowerValue + 1));
};


export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const findEventDuration = (start, end) => {

  let durationInDay = dayjs(end).diff(dayjs(start), `day`)
  end = dayjs(end).subtract(durationInDay, `day`)
  let durationInHours = dayjs(end).diff(dayjs(start), `hour`);
  end = dayjs(end).subtract(durationInHours, `hour`)
  let durationInMinutes = dayjs(end).diff(dayjs(start), `minute`);
 durationInMinutes = formatDuration(durationInMinutes) + `M`;

 if ((durationInDay > 0) || ( durationInHours > 0)) {
    durationInHours =formatDuration(durationInHours) + `H`;
  } else { durationInHours = `` };

 durationInDay = (durationInDay > 0) ? formatDuration(durationInDay) + `D` : ``;

  return `${durationInDay} ${durationInHours} ${durationInMinutes}`


  //let days = timeEnd.diff(timeStart, `day`);
  //timeEnd = timeEnd.subtract(days, `day`);
  //let hours = timeEnd.diff(timeStart, `hour`);
  //timeEnd = timeEnd.subtract(hours, `hour`);
  //let minutes = timeEnd.diff(timeStart, `minute`);
  //timeEnd = timeEnd.subtract(minutes, `minute`);
  //days = (days === 0) ? `` : getNumberWithZero(days) + `D`;
  //minutes = (minutes === 0) ? `00M` : getNumberWithZero(minutes) + `M`;
  //if (days !== 0 && hours === 0) {
  //  hours = `00H`;
  //} else if (days === 0 && hours === 0) {
  //  hours = ``;
  //} else {
  //  hours = getNumberWithZero(hours) + `H`;
  //}
  //return `${days} ${hours} ${minutes}`;



  //const duration = dayjs(end).diff(dayjs(start), `minute`);

  //let durationtextValue = ``;

  //if (duration < 60) {
  //  if (duration < 10) {
  //    durationtextValue = `0${duration}M`;
  //  } else if (duration === 0) {
  //    durationtextValue = `00M`;
  //  } else {
  //    durationtextValue = `${duration}M`;
  //  }
  //} else if (duration < 60 * 24) {
  //  const hours = Math.floor(duration / 60);

  //  if (hours < 10) {
  //    durationtextValue = `0${hours}H`;
  //  } else {
  //    durationtextValue = `${hours}H`;
  //  }

  //  const minutes = duration - hours * 60;
  //  if (minutes < 10) {
  //    durationtextValue += ` 0${minutes}M`;
  //  } else if (minutes === 0) {
  //    durationtextValue += ` 00M`;
  //  } else {
  //    durationtextValue += ` ${minutes}M`;
  //  }
  //} else {
  //  const days = Math.floor(duration / 60 / 24);
  //  if (days < 10) {
  //    durationtextValue = `0${days}D`;
  //  } else {
  //    durationtextValue = `${days}D`;
  //  }

  //  const hours = Math.floor((duration - days * 24 * 60) / 60);
  //  if (hours < 10) {
  //    durationtextValue += ` 0${hours}H`;
  //  } else {
  //    durationtextValue += ` ${hours}H`;
  //  }

  //  const minutes = duration - days * 24 * 60 - hours * 60;
  //  if (minutes < 10) {
  //    durationtextValue += ` 0${minutes}M`;
  //  } else if (minutes === 0) {
  //    durationtextValue += ` 00M`;
  //  } else {
  //    durationtextValue += ` ${minutes}M`;
  //  }

  //}

  //return durationtextValue;
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
