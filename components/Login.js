// Login.js
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Container } from "../Styles/index";
import { loginAction } from "../Redux/modules/list";
import TextInput from "../Fields/TextInput";

let LoginForm = ({ handleSubmit }) => (
  <View>
    <Field label="Login" name="login" component={TextInput} />
    <Field label="Haslo" name="password" component={TextInput} />
    <Button title="Zaloguj" onPress={handleSubmit} />
  </View>
);

LoginForm = reduxForm({ form: "loginForm" })(LoginForm);

class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = async data => {
    try {
      await this.props.loginAction(data);
      this.props.navigation.navigate("Lista")
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

  };
  render() {
    return (
      <View style={Container}>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <LoginForm onSubmit={this.handleLogin} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    firebase: state.firebase
  };
}

export default compose(
  firebaseConnect(props => ["auth"]),
  connect(
    mapStateToProps,
    { loginAction }
  )
)(Login);
