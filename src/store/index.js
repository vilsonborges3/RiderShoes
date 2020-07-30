import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddlewere from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = process.env.NODE_ENV === 'development'
  ? console.tron.createSagaMonitor()
  : null;

const sagaMiddlewere = createSagaMiddlewere({
  sagaMonitor
});

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
