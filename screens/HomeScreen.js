import React, { Component } from "react";
import { LayoutAnimation, Text, View, AsyncStorage } from "react-native";
import { datesAreOnDiffrentDay, datesAreOnSameDay } from "../DateChecker";
import { storeData, getData } from "../StoreFunctions";
import PfcMeter from "../components/PfcMeter";
import PlusButton from "../components/PlusButton";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import { NavigationEvents } from "react-navigation";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount = async () => {
    // AsyncStorage.clear();
    // const data = await {
    //   date: moment()
    //     .add(-1, "days")
    //     .format(),
    //   pfc: {
    //     c: 0,
    //     f: 0,
    //     p: 0
    //   }
    // };
    // await storeData("todayUserData", data);
    // const hoge = await getData("todayUserData");
    // await console.log(data);
    // let existingUserDataAsset = await getData("userDataAsset");
    // if (!existingUserDataAsset) {
    //   existingUserDataAsset = [];
    // }
    // await console.log(existingUserDataAsset);
    // console.log(a);
    // await console.log(moment(JSON.parse(a).date).format());
    // await console.log(existingUserDataAsset);
    // const formatedExistingUserDataAsset = await existingUserDataAsset.filter(
    //   item => {
    //     if (datesAreOnSameDay(moment(item.date), moment())) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // );
    // await console.log(formatedExistingUserDataAsset);
    // await formatedExistingUserDataAsset.push(data);
    // await console.log(formatedExistingUserDataAsset);
    // await storeData("userDataAsset", formatedExistingUserDataAsset);
  };
  initHome = async () => {
    const todayUserData = await getData("todayUserData");
    if (
      todayUserData &&
      datesAreOnSameDay(moment(todayUserData.date), moment())
    ) {
      await this.setState({ todayUserData: todayUserData });
    } else {
      const userDataFormat = {
        pfc: { p: 0, f: 0, c: 0 },
        date: moment().format()
      };
      storeData("todayUserData", userDataFormat);
      LayoutAnimation.spring();
      this.setState({ todayUserData: userDataFormat });
    }
    await this.setState({ isLoading: false });
  };

  calculatedCalory() {
    const result =
      this.state.todayUserData.pfc.p * 4 +
      this.state.todayUserData.pfc.f * 9 +
      this.state.todayUserData.pfc.c * 4;
    return result;
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <NavigationEvents onDidFocus={() => this.initHome()} />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <NavigationEvents onDidFocus={() => this.initHome()} />
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
          <PfcMeter
            title={"タンパク質"}
            amount={this.state.todayUserData.pfc.p}
            color={"#EBA3C6"}
          />
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
            amount={this.state.todayUserData.pfc.f}
            color={"#9CCAEA"}
            style={{ marginRight: 40 }}
          />
          <PfcMeter
            title={"糖質"}
            amount={this.state.todayUserData.pfc.c}
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
          {this.calculatedCalory()}kcal
        </Text>

        <PlusButton
          style={{ position: "absolute", bottom: "5%", right: 15 }}
          onPress={() => this.props.navigation.navigate("AddPfc")}
        />
      </View>
    );
  }
}

export default HomeScreen;
