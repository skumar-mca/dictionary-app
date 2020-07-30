import { compose, createStore } from 'redux';
import { i18nActions } from 'redux-react-i18n';
import config from './global/config';
import reducer from './root-reducer';
import { translations } from './translations';

// Check for dev env, if false hide extensions like redux
const { isDev, isBrowser } = config;
const devtools = isDev && isBrowser && window.devToolsExtension
    ? window.devToolsExtension
    : () => (fn) => fn;

const dictionaries = translations;

const languages = [
    {
        code: 'en-US',
        name: 'English (USA)'
    }
];

let store = null;

const configureStore = (initialState = {}, services = {}) => {
    const enhancers = [devtools()];
    store = createStore(reducer, initialState, compose(...enhancers));
    store.dispatch(i18nActions.setDictionaries(dictionaries));
    store.dispatch(i18nActions.setLanguages(languages));
    store.dispatch(i18nActions.setCurrentLanguage('en-US'));
    return store;
};

export { configureStore, store };

