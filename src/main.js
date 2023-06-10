import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip.js';
import PointsModel from './model/trip-points-model.js';
import { getPoints, getDestinations, getOffers } from './fish-data/point.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));
const pointsModel = new PointsModel();
const points = getPoints();
const offersByType = getOffers();
const destinations = getDestinations();

render(new FiltersView(), siteHeaderElement.querySelector('.trip-controls__filters'));

pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);
