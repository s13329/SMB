import React from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

import { Container } from "../Styles/index";
import Navigation from "./Navigation";
import TextInput from "../Fields/TextInput";
import Slider from "../Fields/Slider";
import Checkbox from "../Fields/Checkbox";
import { removeItemAction, editItemAction, updateFirebase, removeFirebase } from "../Redux/modules/list";


let EditForm = props => (
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
    <Field label="Cena" name="price" component={TextInput} keyboardType="numeric" />
    <Field
      label="Kupiono"
      name="isBought"
      myChange={props.change}
      component={Checkbox}
    />

    <Button title="Zapisz" onPress={props.handleSubmit} />

    <Button
      title="Usuń"
      buttonStyle={{
        backgroundColor: "red",
        marginTop: 10
      }}
      onPress={props.handleRemove}
    />
  </ScrollView>
);

EditForm = reduxForm({ form: "addItem" })(EditForm);

class Add extends React.Component {
  state = {};

  handleRemove = () => {
    const id = this.props.navigation.state.params.key.key;

    this.props.removeFirebase(id)
    this.props.navigation.navigate("Lista");
  };

  handleSubmit = async (data) => {
    const id = this.props.navigation.state.params.key.key;
    const newValue = data.isBought ? 1 : 0;

    this.props.updateFirebase({...data, id, newValue})
    this.props.navigation.navigate("Lista");
  };

  async componentDidMount(){
    const color = await AsyncStorage.getItem("color");
    const fontSize = await AsyncStorage.getItem("fontSize");
    await this.setState({ color, fontSize });
  }

  render() {
    const { navigation } = this.props;
    const values = navigation.state.params.key;

    return (
      <View style={{...Container, backgroundColor: this.state.color}}>
        <Navigation navigation={navigation} title={"Edytuj"} />
        <EditForm
          onSubmit={this.handleSubmit}
          handleRemove={this.handleRemove}
          initialValues={values}
        />
      </View>
    );
  }
}

export default connect(null, {editItemAction, removeItemAction, updateFirebase, removeFirebase})(Add);
