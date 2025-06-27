/** @jsxImportSource @emotion/react */
import { theme } from 'antd'
import { codeBoxCss, codeBoxDemoCss } from './DemoCard.style'

const { useToken } = theme;

const DemoCard = ({card = true, children}) => {
	const { token } = useToken();

	if (card) {
		return (
			<div css={codeBoxCss(token)}>
				<section css={codeBoxDemoCss(token)}>
					{children}
				</section>
			</div>
		);
	} else {
		return <>{children}</>
	}
}

export default DemoCard
