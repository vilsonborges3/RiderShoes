import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddlewere from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddlewere = createSagaMiddlewere();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddlewere)
      )
    : applyMiddleware(sagaMiddlewere);

const store = createStore(rootReducer, enhancer);
sagaMiddlewere.run(rootSaga);

export default store;
