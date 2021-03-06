import React from "react";
import { Text, View, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import MyLibrary  from '../MyLibrary'

import { getListAction, initDBAction } from "../Redux/modules/list";
import Navigation from "./Navigation";
import { Container } from "../Styles/index";


const addButton = {
  position: "absolute",
  bottom: 0,
  right: 0
};

class List extends React.Component {
  state = {
    list: [],
    color: null,
    fontSize: null
  };

  async componentDidMount() {
    await this.props.initDBAction()
    await this.props.getListAction();

    const color = await AsyncStorage.getItem("color");
    const fontSize = await AsyncStorage.getItem("fontSize");
    await this.setState({ color, fontSize });
    console.log('MyLibrary :', MyLibrary);
  }


  render() {
    const { navigation, list } = this.props;
    return (
      <View style={{...Container, backgroundColor: this.state.color}}>
        <Navigation navigation={navigation} title={"Lista Zakupów"} />
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={item.isBought && { backgroundColor: "#d6eda1" }}
              title={item.name}
              subtitle={`cena:${item.price}$ ilość:${item.quantity}`}
              onPress={() => navigation.navigate("Edycja", { key: item })}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={addButton}
          onPress={() => this.props.navigation.navigate("Dodaj")}
        >
          <Text>
            <MaterialIcons name="add-circle" size={60} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list.list
  };
}

export default connect(
  mapStateToProps,
  { getListAction, initDBAction }
)(List);
