import React from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

import { addItemAction, addFirebase } from "../Redux/modules/list";
import { Container } from "../Styles/index";
import Navigation from "./Navigation";
import TextInput from "../Fields/TextInput";
import Slider from "../Fields/Slider";


let AddForm = ({ handleSubmit }) => (
  <ScrollView keyboardShouldPersistTaps={"handled"}>
    <Field label={"Nazwa"} name="name" component={TextInput} />
    <Field
      label="Ilość"
      name="quantity"
      component={Slider}
      maximumValue={20}
      minimumValue={0}
      step={1}
    />
 <Field label={"Cena"} name="price" component={TextInput} keyboardType="numeric" />
    <Button title="Dodaj" onPress={handleSubmit} />
  </ScrollView>
);

AddForm = reduxForm({ form: "addItem" })(AddForm);

class Add extends React.Component {
  state = {};

  async componentDidMount(){
    const color = await AsyncStorage.getItem("color");
    const fontSize = await AsyncStorage.getItem("fontSize");
    await this.setState({ color, fontSize });
  }

  handleSubmit = async (data) => {
    this.props.addItemAction(data)
    this.props.addFirebase(data)
    this.props.navigation.navigate("Lista")
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{...Container, backgroundColor: this.state.color}}>
        <Navigation navigation={navigation} title={"Dodaj do listy"} />
        <AddForm onSubmit={this.handleSubmit} />
      </View>
    );
  }
}

export default connect(null, {addItemAction, addFirebase})(Add);
