import React from "react";
import PfcMeter from "../components/PfcMeter";
import PlusButton from "../components/PlusButton";
import { View } from "react-native";

export default function AddPfc() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 80,
        backgroundColor: "#f5f5f5"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <PlusButton style={{}} />
        <PfcMeter
          style={{ marginHorizontal: 20 }}
          title={"タンパク質"}
          amount={20}
          color={"#EBA3C6"}
        />
        <PlusButton style={{}} />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <PlusButton style={{}} />
        <PfcMeter
          title={"脂質"}
          amount={20}
          color={"#9CCAEA"}
          style={{ marginHorizontal: 20 }}
        />
        <PlusButton style={{}} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <PlusButton style={{}} />
        <PfcMeter
          title={"糖質"}
          amount={20}
          color={"#DDC98B"}
          style={{ marginHorizontal: 20 }}
        />
        <PlusButton style={{}} />
      </View>
    </View>
  );
}
