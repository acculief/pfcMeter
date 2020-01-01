/* global require */
import React, { Component } from "react";
import { Dimensions, Text, View, AsyncStorage } from "react-native";
import { datesAreOnSameDay } from "../DateChecker";
import { storeData, getData } from "../StoreFunctions";
import PfcMeter from "../components/PfcMeter";
import PlusButton from "../components/PlusButton";
import moment from "moment";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount = async () => {
    moment.locale("ja");
    const todayUserData = await getData("todayUserData");
    if (
      todayUserData &&
      datesAreOnSameDay(moment(todayUserData.date), moment())
    ) {
      await this.setState({ todayUserData: todayUserData });
    } else {
      const userDataFormat = {
        pfc: { p: 0, f: 0, c: 0 },
        date: moment()
      };
      storeData("todayUserData", userDataFormat);
      this.setState({ todayUserData: userDataFormat });
    }
    await this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <Text
          style={{
            paddingTop: "20%",
            alignSelf: "center",
            fontSize: 28,
            fontWeight: "bold",
            color: "#666666"
          }}
        >
          {moment(this.state.todayUserData.date).format("MM/DD")}
        </Text>
        <View style={{ alignItems: "center", paddingTop: "15%" }}>
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
