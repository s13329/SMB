import React from "react";
import { View } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

export default function MyTextInput(props) {
  const { input, label, ...inputProps } = props;
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput
        {...inputProps}
        onChangeText={input.onChange}
        value={input.value}
        {...props}
      />
    </View>
  );
}

