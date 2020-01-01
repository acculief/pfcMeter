import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { storeData, getData } from "../StoreFunctions";
import moment from "moment-timezone/builds/moment-timezone-with-data";

export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = async () => {
    const userDataAsset = await getData("userDataAsset");
    let dates = await [];
    let pfc = await [];
    await userDataAsset.map(item => {
      dates.push(moment(item.date).format("MM/DD"));
      pfc.push([item.pfc.p, item.pfc.f, item.pfc.c]);
    });

    const data = await {
      labels: dates,
      legend: ["p", "f", "c"],
      data: pfc,
      barColors: ["#EBA3C6", "#9CCAEA", "#DDC98B"]
    };
    await this.setState({ data: data, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5"
        }}
      >
        <StackedBarChart
          data={this.state.data}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            borderRadius: 16
          }}
        />
      </View>
    );
  }
}
