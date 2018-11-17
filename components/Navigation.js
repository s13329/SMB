import React from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { Constants } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

const MyStatusBar = () => (
  <View style={{ height: Constants.statusBarHeight }}>
    <StatusBar />
  </View>
);

const Navigation = ({ navigation, title }) => {
  return (
    <View style={{ display: "flex" }}>
      <MyStatusBar />
      <View style={{justifyContent : 'space-between', display : 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={40} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navigation;
