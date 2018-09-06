import { Platform } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import setup from "./store/setup";
import { Navigation } from "react-native-navigation";
import { registerScreens, registerScreenVisibilityListener } from "./screens";

import { Provider } from "react-redux";

import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as appActions from "./reducers/app/actions";

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
registerScreens(store, Provider);
registerScreenVisibilityListener();

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    console.log(root, "rootrootroot");
    switch (root) {
      case "login":
        Navigation.startSingleScreenApp({
          screen: {
            screen: "example.LoginScreen",
            title: "Login",
            navigatorStyle: {}
          },
          appStyle: {
            navBarHidden: true
          }
        });

        return;
      case "after-login":
        Navigation.startTabBasedApp({
          tabs,
          animationType: Platform.OS === "ios" ? "slide-down" : "fade",
          tabsStyle: {
            tabBarBackgroundColor: "#003a66",
            tabBarButtonColor: "#ffffff",
            tabBarSelectedButtonColor: "#ff505c",
            tabFontFamily: "BioRhyme-Bold"
          },
          appStyle: {
            tabBarBackgroundColor: "#003a66",
            navBarButtonColor: "#ffffff",
            tabBarButtonColor: "#ffffff",
            navBarTextColor: "#ffffff",
            tabBarSelectedButtonColor: "#ff505c",
            navigationBarColor: "#003a66",
            navBarBackgroundColor: "#003a66",
            statusBarColor: "#002b4c",
            tabFontFamily: "BioRhyme-Bold"
          },
          drawer: {
            left: {
              screen: "example.Types.Drawer"
            }
          }
        });
        return;
      default:
        console.error("Unknown app root");
    }
  }
}

const tabs = [
  {
    label: "Navigation",
    screen: "example.Types",
    icon: require("../img/list.png"),
    title: "Navigation Types"
  },
  {
    label: "Actions",
    screen: "example.Actions",
    icon: require("../img/swap.png"),
    title: "Navigation Actions"
  }
];

if (Platform.OS === "android") {
  tabs.push({
    label: "Transitions",
    screen: "example.Transitions",
    icon: require("../img/transform.png"),
    title: "Navigation Transitions"
  });
}
