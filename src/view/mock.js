import dayjs from "dayjs";
import {getRandomInteger, shuffle} from "../utils/utils.js";


const generateEventType = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = [`Amsterdam`, `Chamonix`, `Geneva`, `Paris`, `London`];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const ganarateOffers = () => {
  const offers = {
    'taxi': [
      {
        type: `Switch to comfort class`,
        id: `comfort`,
        price: 5,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Сhild seat`,
        id: `child-seat`,
        price: 1,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'bus': [
      {
        type: `Switch to comfort class`,
        id: `comfort`,
        price: 3,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Choose seats`,
        id: `seats`,
        price: 2,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Add meal`,
        id: `meal`,
        price: 40,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'train': [
      {
        type: `Switch to comfort class`,
        id: `comfort`,
        price: 3,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Choose seats`,
        id: `seats`,
        price: 2,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Add meal`,
        id: `meal`,
        price: 40,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'ship': [
      {
        type: `Switch to comfort class`,
        id: `comfort`,
        price: 3,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Add meal`,
        id: `meal`,
        price: 40,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'transport': [],
    'drive': [],
    'flight': [
      {
        type: `Add luggage`,
        id: `luggage`,
        price: 30,
        isAdded: Boolean(getRandomInteger(0, 1))
      },

      {
        type: `Switch to comfort class`,
        id: `comfort`,
        price: 100,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Add meal`,
        id: `meal`,
        price: 15,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Choose seats`,
        id: `seats`,
        price: 5,
        isAdded: Boolean(getRandomInteger(0, 1))
      },
      {
        type: `Travel by train`,
        id: `travel`,
        price: 40,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'check-in': [],
    'sightseeing': [
      {
        type: `individual tour`,
        id: `individual`,
        price: 10,
        isAdded: Boolean(getRandomInteger(0, 1))
      }
    ],
    'restaurant': []
  };
  return offers;
};


const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  const maxHourGap = 12;
  const hourGap = getRandomInteger(-maxHourGap, maxHourGap);

  return dayjs().add(daysGap, `day`).add(hourGap, `hour`).toDate();
};

const randomDuration = () => {
  const maxDurationGap = 2000;
  const minDurationGap = 15;
  return getRandomInteger(minDurationGap, maxDurationGap);
};


const ganerateDestinationInfo = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const amountSentence = getRandomInteger(1, 5);
  return shuffle(text.split(`. `)).slice(0, amountSentence);
};

const ganaratePhoto = () => {
  const amountPhoto = getRandomInteger(0, 3);
  const photos = [];
  for (let i = 0; i < amountPhoto; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};


const ganaratePrice = () => getRandomInteger(5, 1000);


export const generateEventTrip = () => {
  const eventType = generateEventType();
  const startDate = generateDate();
  const durationEvent = randomDuration();
  const endDate = dayjs(startDate).add(durationEvent, `minute`).toDate();
  const destinationInfo = ganerateDestinationInfo();
  const destinationPhoto = ganaratePhoto();
  const eventPrice = ganaratePrice();
  const eventsOffers = ganarateOffers();

  return {
    eventType,
    destination: generateDestination(),
    offers: eventsOffers[eventType.toLowerCase()],
    startDate,
    endDate,
    destinationInfo,
    destinationPhoto,
    eventPrice,
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
