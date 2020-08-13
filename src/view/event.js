import {formatTime, getDuration, formatTitle, getHumanizeTimeInterval} from '../utils.js';

const offerTemplate = (label, price) => {
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
        .map((offer)=> offerTemplate(offer.label, offer.price))
        .join(``)}
    </ul>`;
  } else {
    return ``;
  }
};

export const createEventTemplate = (event) => {

  const {type, city, dateRange, price, offers} = event;

  const formattedType = formatTitle(type);
  const times = formatTime(dateRange);
  const duration = getDuration(dateRange);
  console.log(dateRange);
  // const duration = getHumanizeTimeInterval(dateRange[1] - dateRange[0]);

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${formattedType} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">${times}</time>
            <!--&mdash;
            <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>-->
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
