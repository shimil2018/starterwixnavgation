import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { connect } from "react-redux";
import * as counterActions from "../reducers/counter/actions";
import * as appActions from "../reducers/app/actions";
import LoginForm from "./../components/LoginForm";

// this is a traditional React component connected to the redux store
class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    console.log("Component-Lifecycle", "componentWillUnmount", "LoginScreen");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("./../../img/logo-dark-bg.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm onLoginPress={this.onLoginPress} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  onIncrementPress = () => {
    this.props.dispatch(counterActions.increment());
  };

  onLoginPress = () => {
    console.log(this.props);
    this.props.dispatch(appActions.login());
  };

  onShowModalPress() {
    this.props.navigator.showModal({
      screen: "example.LoginScreen",
      title: "Login",
      passProps: {
        str: "This is a prop passed in 'startSingleScreenApp()'!",
        obj: {
          str: "This is a prop passed in an object!",
          arr: [
            {
              str: "This is a prop in an object in an array in an object!"
            }
          ],
          arr2: [["array of strings", "with two strings"], [1, 2, 3]]
        },
        num: 1234
      }
    });
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(LoginScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: "center",
    opacity: 0.9
  }
});
