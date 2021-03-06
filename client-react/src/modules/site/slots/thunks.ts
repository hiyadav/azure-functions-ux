import IState from '../../../modules/types';
import { checkCacheValid } from 'redux-cache';
import { updateSlotList, updateSlotListNoCache } from './actions';
import axios from 'axios';
import { ArmArray, Site } from '../../../models/WebAppModels';
import { CommonConstants } from '../../../utils/CommonConstants';
export function fetchSlotList() {
  return async (dispatch: any, getState: () => IState) => {
    const startupInfo = getState().portalService.startupInfo;
    if (!startupInfo) {
      return null;
    }
    const armToken = startupInfo.token;
    const armEndpoint = startupInfo.armEndpoint;
    const currentSite = getState().site;
    const isCacheValid = checkCacheValid(getState, 'slots');
    if (isCacheValid && currentSite.resourceId === currentSite.site.id && !currentSite.loading) {
      return currentSite.site;
    }

    let productionResourceId = currentSite.resourceId;
    if (productionResourceId.includes('/slots/')) {
      productionResourceId = productionResourceId.split('/slots/')[0];
    }

    dispatch(updateSlotListNoCache({ loading: true }));
    try {
      const siteFetch = await axios.get<ArmArray<Site>>(
        `${armEndpoint}${productionResourceId}/slots?api-version=${CommonConstants.ApiVersions.websiteApiVersion20180201}`,
        {
          headers: {
            Authorization: `Bearer ${armToken}`,
          },
        }
      );
      const siteResult = siteFetch.data;
      dispatch(updateSlotList({ slots: siteResult, loading: false }));
      return siteResult;
    } catch (err) {
      console.log(err);
      dispatch(updateSlotListNoCache({ loading: false }));
    }
    return null;
  };
}
