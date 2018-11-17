import React from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

import Navigation from "./Navigation";
import { Container } from "../Styles/index";
import TextInput from "../Fields/TextInput";


let SettingsForm = ({ handleSubmit }) => (
  <ScrollView keyboardShouldPersistTaps={"handled"}>
    <Field label={"Kolor"} name="color" component={TextInput} />
    <Field label={"Rozmiar czcionki"} name="fontSize" component={TextInput} keyboardType="numeric" />
    <Button title="Zapisz" onPress={handleSubmit} />
  </ScrollView>
);

SettingsForm = reduxForm({ form: "addItem" })(SettingsForm);

class Settings extends React.Component {
  state = {
    color: null,
    fontSize: null
  };

  async componentDidMount() {
    const color = await AsyncStorage.getItem("color");
    const fontSize = await AsyncStorage.getItem("fontSize");
    await this.setState({ color, fontSize });
  }

  handleSubmit = async ({ fontSize, color }) => {
    await AsyncStorage.setItem("color", color);
    await AsyncStorage.setItem("fontSize", fontSize);
    this.props.navigation.navigate("Lista")
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{...Container, backgroundColor: this.state.color}}>
        <Navigation navigation={navigation} title="Ustawienia" />
        <SettingsForm enableReinitialize initialValues={this.state} onSubmit={this.handleSubmit} />
      </View>
    );
  }
}

export default connect()(Settings);
