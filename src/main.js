import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip.js';
import PointsModel from './model/trip-points-model.js';
import { getPoints, getDestinations, getOffers } from './fish-data/point.js';
import { render } from './framework/render.js';
import { generateFilter } from './fish-data/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const points = getPoints();
const offersByType = getOffers();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
tripPresenter.init();

const filters = generateFilter(pointsModel.points);

render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
