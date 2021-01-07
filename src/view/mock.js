import dayjs from "dayjs";
import {getRandomInteger, shuffle} from "../utils/utils.js";

export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];


export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateEventType = () => {

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};


//  const ganarateOffers = () => {
//  const offers = {
//    'taxi': [
//      {
//        type: `Switch to comfort class`,
//        id: `comfort`,
//        price: 5,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Сhild seat`,
//        id: `child-seat`,
//        price: 1,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'bus': [
//      {
//        type: `Switch to comfort class`,
//        id: `comfort`,
//        price: 3,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Choose seats`,
//        id: `seats`,
//        price: 2,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Add meal`,
//        id: `meal`,
//        price: 40,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'train': [
//      {
//        type: `Switch to comfort class`,
//        id: `comfort`,
//        price: 3,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Choose seats`,
//        id: `seats`,
//        price: 2,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Add meal`,
//        id: `meal`,
//        price: 40,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'ship': [
//      {
//        type: `Switch to comfort class`,
//        id: `comfort`,
//        price: 3,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Add meal`,
//        id: `meal`,
//        price: 40,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'transport': [],
//    'drive': [],
//    'flight': [
//      {
//        type: `Add luggage`,
//        id: `luggage`,
//        price: 30,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },

//      {
//        type: `Switch to comfort class`,
//        id: `comfort`,
//        price: 100,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Add meal`,
//        id: `meal`,
//        price: 15,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Choose seats`,
//        id: `seats`,
//        price: 5,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      },
//      {
//        type: `Travel by train`,
//        id: `travel`,
//        price: 40,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'check-in': [],
//    'sightseeing': [
//      {
//        type: `individual tour`,
//        id: `individual`,
//        price: 10,
//        isAdded: Boolean(getRandomInteger(0, 1))
//      }
//    ],
//    'restaurant': []
//  };
//  return offers;
//  };


export const offersMap = [
  {
    "type": "taxi",
    "offers": [
      {
        "title": "Upgrade to a business class",
        "price": 190,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Choose the radio station",
        "price": 30,
        "isAdded": Boolean(getRandomInteger(0, 1))

      },
      {
        "title": "Choose temperature",
        "price": 170,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }

    ]
  },
  {
    "type": "bus",
    "offers": [
      {
        "title": "Infotainment system",
        "price": 50,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Order meal",
        "price": 100,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  },
  {
    "type": "train",
    "offers": [
      {
        "title": "Book a taxi at the arrival point",
        "price": 110,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Order a breakfast",
        "price": 80,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  },
  {
    "type": "flight",
    "offers": [

      {
        "title": "Upgrade to business class",
        "price": 120,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Add luggage",
        "price": 170,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Business lounge",
        "price": 160,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  },
  {
    "type": "check-in",
    "offers": [
      {
        "title": "Choose the time of check-in",
        "price": 70,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Choose the time of check-out",
        "price": 190,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Add breakfast",
        "price": 110,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }

    ]
  },
  {
    "type": "sightseeing",
    "offers": []
  },
  {
    "type": "ship",
    "offers": [
      {
        "title": "Choose meal",
        "price": 130,
        "isAdded": Boolean(getRandomInteger(0, 1))

      },
      {
        "title": "Choose seats",
        "price": 160,
        "isAdded": Boolean(getRandomInteger(0, 1))

      },
      {
        "title": "Upgrade to comfort class",
        "price": 170,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Upgrade to business class",
        "price": 150,
        "isAdded": Boolean(getRandomInteger(0, 1))
      },
      {
        "title": "Add luggage",
        "price": 100,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  },
  {
    "type": "transport",
    "offers": []
  },
  {
    "type": "drive",
    "offers": [
      {
        "title": "Choose comfort class",
        "price": 110,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  },
  {
    "type": "restaurant",
    "offers": [
      {
        "title": "Choose live music",
        "price": 150,
        "isAdded": Boolean(getRandomInteger(0, 1))
      }
    ]
  }
]


//export const offersMap = {
//  "taxi": {
//    comfort: {
//      type: `Switch to comfort class`,
//      price: 5,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    childSeat: {
//      type: `Сhild seat`,
//      price: 1,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    }
//  },
//  "bus": {
//    comfort: {
//      type: `Switch to comfort class`,
//      price: 3,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    seats: {
//      type: `Choose seats`,
//      price: 2,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    meal: {
//      type: `Add meal`,
//      price: 40,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    }
//  },
//  "train": {
//    comfort: {
//      type: `Switch to comfort class`,
//      price: 3,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    seats: {
//      type: `Choose seats`,
//      price: 2,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    meal: {
//      type: `Add meal`,
//      price: 40,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//  },
//  "ship": {
//    comfort: {
//      type: `Switch to comfort class`,
//      price: 3,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    meal: {
//      type: `Add meal`,
//      price: 40,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    }
//  },
//  "transport": {},
//  "drive": {},
//  "flight": {
//    luggage: {
//      type: `Add luggage`,
//      price: 30,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    comfort: {
//      type: `Switch to comfort class`,
//      price: 100,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    meal: {
//      type: `Add meal`,
//      price: 15,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    },
//    travel: {
//      type: `Travel by train`,
//      price: 40,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    }
//  },
//  "check-in": {},
//  "sightseeing": {
//    individual: {
//      type: `individual tour`,
//      price: 10,
//      isAdded: Boolean(getRandomInteger(0, 1))
//    }
//  },
//  "restaurant": {}
//};


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
  const amountSentence = getRandomInteger(0, 5);
  return shuffle(text.split(`. `)).slice(0, amountSentence).join(`. `);
};

const ganaratePhoto = () => {
  const amountPhoto = getRandomInteger(0, 3);
  const photos = [];
  for (let i = 0; i < amountPhoto; i++) {
    photos.push({
      "src": `http://picsum.photos/248/152?r=${Math.random()}`,
      "description" : `photo ${i}`
    });
  }
  return photos;
};




export const destinations = [`Amsterdam`, `Chamonix`, `Geneva`, `Paris`, `London`];


const generateDestination = () => {

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

export const destinationInfoMap = {
  Amsterdam: {
    info: ganerateDestinationInfo(),
    photo: ganaratePhoto()
  },
  Chamonix: {
    info: ganerateDestinationInfo(),
    photo: ganaratePhoto()
  },
  Geneva: {
    info: ``,
    photo: []
  },
  Paris: {
    info: ganerateDestinationInfo(),
    photo: ganaratePhoto()
  },
  London: {
    info: ganerateDestinationInfo(),
    photo: ganaratePhoto()
  }
};
const ganaratePrice = () => getRandomInteger(5, 1000);

//let off = offersMap.filter((offer)=> offer.type===`Taxi`.toLowerCase())
//let [off1] = off
////console.log(...(offersMap.filter((offer)=> offer.type===`Taxi`.toLowerCase())))
//console.log(off1.offers)


export const generateEventTrip = () => {
  const eventType = generateEventType();
  const startDate = generateDate();
  const durationEvent = randomDuration();
  const endDate = dayjs(startDate).add(durationEvent, `minute`).toDate();
  const eventPrice = ganaratePrice();
  const destination = generateDestination();
  const offersByType = offersMap.filter((offer)=> offer.type===eventType.toLowerCase())
  const [off1] = offersByType


  return {
    id: generateId(),
    eventType,
    destination,
    //offers: offersMap[eventType.toLowerCase()],
    //offers: offersMap.filter((offer)=> offer.type===eventType.toLowerCase()),
    offers: off1.offers,
    startDate,
    endDate,
    destinationInfo: destinationInfoMap[destination].info,
    destinationPhoto: destinationInfoMap[destination].photo,
    eventPrice,
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};



export const offersMapClear= [
  {
    "type": "taxi",
    "offers": [
      {
        "title": "Upgrade to a business class",
        "price": 190
      },
      {
        "title": "Choose the radio station",
        "price": 30
      },
      {
        "title": "Choose temperature",
        "price": 170
      },
      {
        "title": "Drive quickly, I'm in a hurry",
        "price": 100
      },
      {
        "title": "Drive slowly",
        "price": 110
      }
    ]
  },
  {
    "type": "bus",
    "offers": [
      {
        "title": "Infotainment system",
        "price": 50
      },
      {
        "title": "Order meal",
        "price": 100
      },
      {
        "title": "Choose seats",
        "price": 190
      }
    ]
  },
  {
    "type": "train",
    "offers": [
      {
        "title": "Book a taxi at the arrival point",
        "price": 110
      },
      {
        "title": "Order a breakfast",
        "price": 80
      },
      {
        "title": "Wake up at a certain time",
        "price": 140
      }
    ]
  },
  {
    "type": "flight",
    "offers": [
      {
        "title": "Choose meal",
        "price": 120
      },
      {
        "title": "Choose seats",
        "price": 90
      },
      {
        "title": "Upgrade to comfort class",
        "price": 120
      },
      {
        "title": "Upgrade to business class",
        "price": 120
      },
      {
        "title": "Add luggage",
        "price": 170
      },
      {
        "title": "Business lounge",
        "price": 160
      }
    ]
  },
  {
    "type": "check-in",
    "offers": [
      {
        "title": "Choose the time of check-in",
        "price": 70
      },
      {
        "title": "Choose the time of check-out",
        "price": 190
      },
      {
        "title": "Add breakfast",
        "price": 110
      },
      {
        "title": "Laundry",
        "price": 140
      },
      {
        "title": "Order a meal from the restaurant",
        "price": 30
      }
    ]
  },
  {
    "type": "sightseeing",
    "offers": []
  },
  {
    "type": "ship",
    "offers": [
      {
        "title": "Choose meal",
        "price": 130
      },
      {
        "title": "Choose seats",
        "price": 160
      },
      {
        "title": "Upgrade to comfort class",
        "price": 170
      },
      {
        "title": "Upgrade to business class",
        "price": 150
      },
      {
        "title": "Add luggage",
        "price": 100
      },
      {
        "title": "Business lounge",
        "price": 40
      }
    ]
  },
  {
    "type": "transport",
    "offers": []
  },
  {
    "type": "drive",
    "offers": [
      {
        "title": "Choose comfort class",
        "price": 110
      },
      {
        "title": "Choose business class",
        "price": 180
      }
    ]
  },
  {
    "type": "restaurant",
    "offers": [
      {
        "title": "Choose live music",
        "price": 150
      },
      {
        "title": "Choose VIP area",
        "price": 70
      }
    ]
  }
]
