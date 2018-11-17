import React, { Component } from "react";
import { View } from "react-native";
import {
  CheckBox,
} from "react-native-elements";

export default class MyTextInput extends Component {
  state = {
    checked: false
  };

  componentDidMount() {
      this.props.input.value && this.setState({checked: true})
  }

  onChange = async () => {
    await this.setState(prevState => ({ checked: !prevState.checked }));
    this.props.myChange("isBought", this.state.checked);
  };

  render() {
    const { input, label, ...inputProps } = this.props;

    return (
      <View>
        <CheckBox
          {...inputProps}
          title={label}
          onPress={this.onChange}
          checked={this.state.checked}
          value={this.state.checked}
          {...this.props}
        />
      </View>
    );
  }
}
