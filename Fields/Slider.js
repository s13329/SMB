import { Slider, FormLabel } from "react-native-elements";
import React from "react";
import { TextInput, View, Text } from "react-native";

export default function MySlider(props) {
  const { input, label, ...inputProps } = props;

  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      <FormLabel>{label}: {input.value}</FormLabel>
      <Slider
      style={{marginRight: 20, marginLeft: 20}}
        {...inputProps}
        onValueChange={input.onChange}
        value={+input.value}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        {...props}
      />
    </View>
  );
}
