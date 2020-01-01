import React, { Component } from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function PlusButton(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[
        props.style,
        {
          backgroundColor: "white",
          height: 70,
          width: 70,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
          shadowRadius: 3,
          shadowOpacity: 0.2,
          shadowColor: "gray"
        }
      ]}
    >
      <Icon size={40} name={"plus"} color={"#888888"} />
    </TouchableOpacity>
  );
}
