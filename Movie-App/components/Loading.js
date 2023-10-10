import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");
const Loading = () => {
  return (
    <View style={[height, width, styles.container]}>
      <Progress.CircleSnail thickness={4} size={80} color="#f5ce42" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70%",
  },
});
