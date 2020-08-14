import {formatTime, formatDateTime, getDuration, formatType} from '../utils.js';

const createOfferTemplate = (label, price) => {
  return `<li class="event__offer">
              <span class="event__offer-title">${label}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </li>`;
};

const createOffersTemplate = (offers) => {
  if (offers.length) {
    return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers
        .map((offer)=> createOfferTemplate(offer.label, offer.price))
        .join(``)}
    </ul>`;
  } else {
    return ``;
  }
};

export const createEventTemplate = (event) => {

  const {type, city, dateRange, price, offers} = event;

  const typeWithLabel = formatType(type);
  const startTime = formatTime(dateRange[0]);
  const endTime = formatTime(dateRange[1]);
  const startDateTime = formatDateTime(dateRange[0]);
  const endDateTime = formatDateTime(dateRange[1]);
  const duration = getDuration(dateRange);

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeWithLabel} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${offersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
