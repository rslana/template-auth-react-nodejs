import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./assets/css/style.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/App";
import rootReducer from "./reducers/rootReducer";
import { userLoggedIn, userLoggedOut } from "./actions/auth";
import { getUsuario } from "./actions/usuario";

const store = (process.env.NODE_ENV === "development") ?
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  :
  createStore(rootReducer, applyMiddleware(thunk))

if (localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN]) {
  const payload = decode(localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN]);
  const usuario = store.dispatch(getUsuario());
  usuario.then(usuario => {
    if (payload.id === usuario._id) {
      const user = {
        token: localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN],
        user: { ...usuario }
      };
      store.dispatch(userLoggedIn(user));
    } else {
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN);
      store.dispatch(userLoggedOut());
    }
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Route component={App} />
        </Provider>
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
} else {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
  if (localStorage.tokenExpired) localStorage.removeItem("tokenExpired");
}

