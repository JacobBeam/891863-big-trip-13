export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const BLANK_EVENT = {
  eventType: TYPES[0].toLowerCase(),
  destination: ``,
  offers: [],
  startDate: (new Date()),
  endDate: (new Date()),
  destinationInfo: ``,
  destinationPhoto: [],
  eventPrice: ``,
  isFavorite: false};
