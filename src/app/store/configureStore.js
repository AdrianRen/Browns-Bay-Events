import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getFirebase, reactReduxFirebase} from "react-redux-firebase";
import { getFirestore, reduxFirestore} from "redux-firestore";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {

  const middlewares = [thunk];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancer);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot){
      module.hot.accept('../reducers/rootReducer', ()=>{
        const newRootReducer = require(`../reducers/rootReducer`).default;
        store.replaceReducer(newRootReducer);
      })
    }
  }
  return store;
};