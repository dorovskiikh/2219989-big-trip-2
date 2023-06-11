import FilterPresenter from './presenter/filter-presenter.js';
import TripEventsPresenter from './presenter/trip.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/trip-points-model.js';
import SiteMenuView from './view/site-menu-view.js';
import { getPoints, getDestinations, getOffers } from './fish-data/point.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const points = getPoints();
const offersByType = getOffers();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();
const tripPresenter  = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'), pointsModel, filterModel);

const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createNewForm(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteHeaderElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
