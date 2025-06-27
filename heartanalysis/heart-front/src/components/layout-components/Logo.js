import React from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { APP_NAME, PUBLIC_PREFIX_PATH } from "configs/AppConfig";
import { useSelector } from 'react-redux';
import utils from 'utils';
import { Grid } from 'antd';
import styled from '@emotion/styled';
import { TEMPLATE } from 'constants/ThemeConstant';

const LogoWrapper = styled.div(() => ({
	height: TEMPLATE.HEADER_HEIGHT,
	display: 'flex',
	alignItems: 'center',
	padding: '0 1rem',
	backgroundColor: 'transparent',
	transition: 'all .2s ease',
}));

const { useBreakpoint } = Grid;

export const Logo = ({ mobileLogo, logoType }) => {

	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');

	const navCollapsed = useSelector(state => state.theme.navCollapsed);
	const navType = useSelector(state => state.theme.navType);
	const currentTheme = useSelector(state => state.theme.currentTheme)

	const getLogoWidthGutter = () => {
		const isNavTop = navType === NAV_TYPE_TOP
		if(isMobile && !mobileLogo) {
			return 0
		}
		if(isNavTop) {
			return 'auto'
		}
		if(navCollapsed) {
			return `${SIDE_NAV_COLLAPSED_WIDTH - 30}px`
		} else {
			return `${SIDE_NAV_WIDTH - 30}px`
		}
	}

	const getLogo = () => {
		if (navCollapsed) {
			return `${PUBLIC_PREFIX_PATH}/img/logo-curto${currentTheme === 'dark' ? '-branco' : ''}.png`
		}
		return `${PUBLIC_PREFIX_PATH}/img/logo-comprido${currentTheme === 'dark' ? '-branco' : ''}.png`
	}

	return (
		<LogoWrapper className={isMobile && !mobileLogo ? 'd-none' : 'logo'} style={{width: `${getLogoWidthGutter()}`, marginRight: 15}}>
			<img src={getLogo()} alt={`${APP_NAME} logo`} style={{width: `${getLogoWidthGutter()}`}}/>
		</LogoWrapper>
	)
}

export default Logo;
