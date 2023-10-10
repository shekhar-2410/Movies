import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { image342 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const MovieList = ({ data, title, hideSeeAll }) => {

  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={{ color: "#fff", fontSize: 16 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: "#f5ce42", fontSize: 16 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie on row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 8, gap: 12 }}
      >
        {data?.map((item, id) => {
          return (
            <TouchableWithoutFeedback
              key={id}
              onPress={() => navigation.push("Movie", item)}
            >
              <View>
                <Image
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 14,
                  }}
                  source={{ uri: image342(item.poster_path) }}
                />
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  {item.original_title?.length > 14
                    ? item.original_title.slice(0, 14) + "..."
                    : item.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
});
