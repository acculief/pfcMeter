import React, { Component } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { LineChart, BarChart, StackedBarChart } from "react-native-chart-kit";
import { storeData, getData } from "../StoreFunctions";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import { NavigationEvents } from "react-navigation";
import { datesAreOnSameMonth } from "../DateChecker";

export default class AnalyticsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pfcData: {
        labels: [],
        legend: [],
        data: [],
        barColors: []
      },
      caloryData: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    };
  }

  initAnalytics = async () => {
    const userDataAsset = await getData("userDataAsset");
    if (!userDataAsset) {
      await this.setState({
        isLoading: false
      });
      return;
    }
    let dates = await [];
    let pfc = await [];
    let kcal = await [];
    await userDataAsset.map(item => {
      if (datesAreOnSameMonth(moment(item.date), moment())) {
        dates.push(moment(item.date).format("MM/DD"));
        pfc.push([item.pfc.p, item.pfc.f, item.pfc.c]);
        kcal.push(item.pfc.p * 4 + item.pfc.f * 9 + item.pfc.c * 4);
      }
    });

    const pfcData = await {
      labels: dates,
      legend: ["タンパク質", "脂質", "糖質"],
      data: pfc,
      barColors: ["#EBA3C6", "#9CCAEA", "#DDC98B"]
    };

    const caloryData = await {
      labels: dates,
      datasets: [
        {
          data: kcal
        }
      ]
    };

    await this.setState({
      pfcData: pfcData,
      caloryData: caloryData,
      isLoading: false
    });
  };

  chart() {
    if (this.state.pfcData.data.length < 1) {
      return (
        <View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#666666"
            }}
          >
            データがありません
          </Text>
        </View>
      );
    }
    return (
      <View style={{ paddingLeft: 15 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#666666",
            marginVertical: 10
          }}
        >
          PFC(g)
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StackedBarChart
            data={this.state.pfcData}
            width={
              Dimensions.get("window").width +
              40 * this.state.pfcData.data.length
            }
            height={Dimensions.get("window").height / 4}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#BCBEE4",
              backgroundGradientTo: "#BCBEE4",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            style={{
              borderRadius: 16
            }}
          />
        </ScrollView>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#666666",
            marginVertical: 10
          }}
        >
          カロリー(kcal)
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={this.state.caloryData}
            width={
              Dimensions.get("window").width +
              30 * this.state.caloryData.datasets[0].data.length
            }
            height={Dimensions.get("window").height / 4}
            fromZero
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#BCBEE4",
              backgroundGradientTo: "#BCBEE4",
              decimalPlaces: 2,
              labelColor: (opacity = 1) => `rgba(0, 0, 20, ${opacity})`,
              color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              borderRadius: 16
            }}
          />
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <NavigationEvents onDidFocus={() => this.initAnalytics()} />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: "10%",
          backgroundColor: "#f5f5f5"
        }}
      >
        <NavigationEvents onDidFocus={() => this.initAnalytics()} />
        {this.chart()}
      </View>
    );
  }
}
