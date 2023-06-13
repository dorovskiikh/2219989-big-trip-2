import FilterPresenter from './presenter/filter-presenter.js';
import TripEventsPresenter from './presenter/trip-presenter.js';
import NewPointButtonPresenter from './presenter/button-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/trip-points-model.js';
import SiteMenuView from './view/site-menu-view.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsApiService from './api/destination-api.js';
import OffersApiService from './api/offers-api.js';
import PointsApiService from './api/points-api.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic 8nxo4bi4hwx2686k';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
});
filterPresenter.init();

const tripPresenter = new TripEventsPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

tripPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  pointsModel: pointsModel,
  tripPresenter: tripPresenter
});

newPointButtonPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
