/* global require */
import React, { Component } from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import { dateToFormatString } from "../dateFormat";
import PfcMeter from "../components/PfcMeter";
import Icon from "react-native-vector-icons/Feather";
import PlusButton from "../components/PlusButton";
const DATE_TIME_TODAY = new Date();
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <Text
          style={{
            paddingTop: 40,
            alignSelf: "center",
            fontSize: 28,
            fontWeight: "bold",
            color: "#666666"
          }}
        >
          {dateToFormatString(new Date(), "%MM%/%DD% (%w%)")}
        </Text>
        <View style={{ alignItems: "center", paddingTop: 80 }}>
          <PfcMeter title={"タンパク質"} amount={10} color={"#EBA3C6"} />
        </View>
        <View
          style={{
            paddingTop: 20,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <PfcMeter
            title={"脂質"}
            amount={20}
            color={"#9CCAEA"}
            style={{ marginRight: 40 }}
          />
          <PfcMeter
            title={"糖質"}
            amount={30}
            color={"#DDC98B"}
            style={{ marginLeft: 40 }}
          />
        </View>
        <Text
          style={{
            paddingTop: 80,
            alignSelf: "center",
            fontSize: 36,
            fontWeight: "bold",
            color: "#666666"
          }}
        >
          520kcal
        </Text>

        <PlusButton
          style={{ position: "absolute", bottom: "5%", right: 15 }}
          onPress={() => this.props.navigation.navigate("AddPfc")}
        ></PlusButton>
      </View>
    );
  }
}

export default HomeScreen;
