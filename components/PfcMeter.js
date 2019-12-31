/* global require */
import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";

const DATE_TIME_TODAY = new Date();
class PfcMeter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            width: Dimensions.get("window").width / 3,
            height: Dimensions.get("window").width / 3,
            alignItems: "center"
          }
        ]}
      >
        <View
          style={{
            backgroundColor: "#f5f5f5",
            width: Dimensions.get("window").width / 3,
            height: Dimensions.get("window").width / 3,
            borderRadius: Dimensions.get("window").width / 3,
            borderColor: this.props.color,
            borderWidth: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#666666"
            }}
          >
            {this.props.amount}g
          </Text>
        </View>

        <Text
          style={{
            paddingTop: 4,
            fontSize: 20,
            color: "#666666",
            fontWeight: "bold"
          }}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default PfcMeter;
