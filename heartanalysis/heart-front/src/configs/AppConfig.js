import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'AULA';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';
export const REDIRECT_URL_KEY = 'redirect'
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/home`;
export const UNAUTHENTICATED_ENTRY = '/login'
export const PUBLIC_PREFIX_PATH = env.PUBLIC_PREFIX_PATH;

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'pt',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR,
	blankLayout: false
};
