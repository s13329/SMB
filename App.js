import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "react-navigation";

import store from "./Redux/store";
import List from "./components/List";
import Settings from "./components/Settings";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";

const Drawer = createDrawerNavigator(
  {
    Login: {
      screen: Login
    },
    Lista: {
      screen: List
    },
    Dodaj: {
      screen: Add
    },
    Ustawienia: {
      screen: Settings
    },
    Edycja: {
      screen: Edit,
      navigationOptions: {
        drawerLabel: () => null
      }
    }
  },
  {
    drawerPosition: "right"
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Drawer />
      </Provider>
    );
  }
}
