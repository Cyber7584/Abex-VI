import React from 'react';
import {Provider} from 'react-redux';
import { HashRouter } from "react-router-dom";
import {ThemeSwitcherProvider} from 'react-css-theme-switcher';
import store from './store';
import Layouts from './layouts'
import {THEME_CONFIG} from './configs/AppConfig';
import './lang'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const themes = {
    dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <ThemeSwitcherProvider
                        themeMap={themes}
                        defaultTheme={THEME_CONFIG.currentTheme}
                        insertionPoint="styles-insertion-point"
                    >
                        <Layouts/>
                    </ThemeSwitcherProvider>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;
