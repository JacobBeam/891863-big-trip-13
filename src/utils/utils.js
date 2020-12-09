import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
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
    let hours = Math.floor(duration / 60);

    if (hours < 10) {
      stringDuration = `0${hours}H`;
    } else {
      stringDuration = `${hours}H`;
    }

    let minutes = duration - hours * 60;
    if (minutes < 10) {
      stringDuration += ` 0${minutes}M`;
    } else if (minutes === 0) {
      stringDuration += ` 00M`;
    } else {
      stringDuration += ` ${minutes}M`;
    }
  } else {
    let days = Math.floor(duration / 60 / 24);
    if (days < 10) {
      stringDuration = `0${days}D`;
    } else {
      stringDuration = `${days}D`;
    }

    let hours = Math.floor((duration - days * 24 * 60) / 60);
    if (hours < 10) {
      stringDuration += ` 0${hours}H`;
    } else {
      stringDuration += ` ${hours}H`;
    }

    let minutes = duration - days * 24 * 60 - hours * 60;
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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
