import { IAction } from '../../models/action';
import { IStartupInfo } from '../../models/portal-models';
import { ThemeExtended } from '../../theme/SemanticColorsExtended';

export const SETUP_IFRAME = 'SETUP_IFRAME';
export interface ISetupIFrameModel {
  shellSrc: string;
}
export const setupIFrameAction = (shellSrc: string): IAction<ISetupIFrameModel> => ({
  payload: {
    shellSrc,
  },
  type: SETUP_IFRAME,
});

export const GET_STARTUP_INFO = 'GET_STARTUP_INFO';
export interface IGetStartupInfoModel {
  startupInfo: IStartupInfo;
}
export const getStartupInfoAction = (startupInfo: IStartupInfo): IAction<IGetStartupInfoModel> => ({
  payload: {
    startupInfo,
  },
  type: GET_STARTUP_INFO,
});

export const UPDATE_THEME = 'UPDATE_THEME';
export const updateTheme = (theme: ThemeExtended): IAction<ThemeExtended> => ({
  payload: theme,
  type: UPDATE_THEME,
});

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const updateToken = (token: string): IAction<string> => ({
  payload: token,
  type: UPDATE_TOKEN,
});
