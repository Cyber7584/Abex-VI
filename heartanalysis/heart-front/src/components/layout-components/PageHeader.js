/** @jsxImportSource @emotion/react */
import AppBreadcrumb from 'components/layout-components/AppBreadcrumb';
import IntlMessage from '../util-components/IntlMessage';
import { css } from '@emotion/react';
import { MEDIA_QUERIES } from 'constants/ThemeConstant';

/*
    Átomo que mostrar só um Header com uma seta para voltar. Geralmente usado acima
    de páginas de formulários.
*/
export const PageHeader = ({ title, display }) => {
	return (
		display ? (
			<div
				css={css`
					align-items: center;
					margin-bottom: 1rem;

					@media ${MEDIA_QUERIES.LAPTOP_ABOVE} {
						display: flex;
					}
				`}
			>
				<h3 className="mb-0 mr-3 font-weight-semibold">
					<IntlMessage id={title? title : 'home'}/>
				</h3>
				<AppBreadcrumb />
			</div>
		)
		: null
	)
}

export default PageHeader
