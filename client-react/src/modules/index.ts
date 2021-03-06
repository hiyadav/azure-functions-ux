import { combineReducers } from 'redux';
import portalService from './portal/portal-service-reducer';
import site from './site/reducer';
import webConfig from './site/config/web/reducer';
import metadata from './site/config/metadata/reducer';
import appSettings from './site/config/appsettings/reducer';
import stacks from './service/available-stacks/reducer';
import connectionStrings from './site/config/connectionstrings/reducer';
import slots from './site/slots/reducer';
import rbac from './service/rbac/reducer';
import slotConfigNames from './site/config/slotConfigNames/reducer';
import 'react-app-polyfill/ie11';

export const reducers = combineReducers({
  portalService,
  /*ARM values */
  site,
  webConfig,
  metadata,
  appSettings,
  connectionStrings,
  stacks,
  slots,
  rbac,
  slotConfigNames,
});
