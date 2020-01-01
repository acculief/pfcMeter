import React, { useState } from "react";
import PfcMeter from "../components/PfcMeter";
import PlusButton from "../components/PlusButton";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { storeData, getData } from "../StoreFunctions";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import { datesAreOnDiffrentDay, datesAreOnSameDay } from "../DateChecker";

const options = [
  { label: "0.5g", value: "0.5" },
  { label: "1g", value: "1" },
  { label: "5g", value: "5" }
];

export default function AddPfc(props) {
  const [pfc, setPfc] = useState({ p: 0, f: 0, c: 0 });
  const [amount, setAmount] = useState(1);

  const setPfcCondition = (pfcString, status, amount) => {
    // if (pfc[pfcString] === 0) {
    //   setPfc(prevState => ({
    //     ...prevState,
    //     [pfcString]:
    //       status === "plus"
    //         ? prevState[pfcString] + amount
    //         : prevState[pfcString]
    //   }));
    //   return;
    // }
    setPfc(prevState => ({
      ...prevState,
      [pfcString]:
        status === "plus"
          ? prevState[pfcString] + amount
          : prevState[pfcString] - amount
    }));
  };

  const onSetPfc = async () => {
    const prevUserData = await getData("todayUserData");
    const { p, f, c } = await prevUserData.pfc;
    const userDataFormat = await {
      pfc: { p: p + pfc.p, f: f + pfc.f, c: c + pfc.c },
      date: prevUserData.date
    };
    await storeData("todayUserData", userDataFormat);
    let existingUserDataAsset = await getData("userDataAsset");
    if (!existingUserDataAsset) {
      existingUserDataAsset = [];
    }
    const formatedExistingUserDataAsset = await existingUserDataAsset.filter(
      item => {
        datesAreOnDiffrentDay(moment(item.date), moment());
      }
    );
    await formatedExistingUserDataAsset.push(userDataFormat);
    await storeData("userDataAsset", formatedExistingUserDataAsset);
    await props.navigation.popToTop();
    await console.log(formatedExistingUserDataAsset);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <View style={{ flex: 2, justifyContent: "space-around", paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <PlusButton
            minus
            onPress={() => setPfcCondition("p", "minus", amount)}
          />
          <PfcMeter
            style={{ marginHorizontal: 20 }}
            title={"タンパク質"}
            amount={pfc.p}
            color={"#EBA3C6"}
          />
          <PlusButton onPress={() => setPfcCondition("p", "plus", amount)} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <PlusButton
            minus
            onPress={() => setPfcCondition("f", "minus", amount)}
          />
          <PfcMeter
            title={"脂質"}
            amount={pfc.f}
            color={"#9CCAEA"}
            style={{ marginHorizontal: 20 }}
          />
          <PlusButton onPress={() => setPfcCondition("f", "plus", amount)} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <PlusButton
            minus
            onPress={() => setPfcCondition("c", "minus", amount)}
          />
          <PfcMeter
            title={"糖質"}
            amount={pfc.c}
            color={"#DDC98B"}
            style={{ marginHorizontal: 20 }}
          />
          <PlusButton onPress={() => setPfcCondition("c", "plus", amount)} />
        </View>
      </View>
      <View style={{ flex: 0.6 }}>
        <SwitchSelector
          options={options}
          initial={1}
          onPress={value => setAmount(Number(value))}
          textColor={"#666666"}
          selectedColor={"#f5f5f5"}
          buttonColor={"#BCBEE4"}
          borderColor={"#BCBEE4"}
          bold
          textStyle={{ fontSize: 20 }}
          selectedTextStyle={{ fontSize: 20 }}
          style={{
            marginTop: 20,
            width: Dimensions.get("window").width / 1.5,
            shadowRadius: 3,
            shadowOpacity: 0.2,
            shadowOffset: {
              height: 2,
              width: 0
            },
            shadowColor: "gray"
          }}
        />
        <TouchableOpacity
          onPress={onSetPfc}
          style={{
            marginTop: 30,
            alignSelf: "center",
            backgroundColor: "white",
            height: Dimensions.get("window").height / 18,
            width: Dimensions.get("window").width / 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: Dimensions.get("window").width / 4,
            shadowRadius: 3,
            shadowOpacity: 0.2,
            shadowOffset: {
              height: 2,
              width: 0
            },
            shadowColor: "gray"
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#666666"
            }}
          >
            決定
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
