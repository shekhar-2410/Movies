import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";
var { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View>
      <Text style={{ color: "#fff", fontSize: 21 }}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.5}
        sliderWidth={width}
        itemWidth={width * 0.6}
        slideStyle={{
          display: "flex",
          alignItems: "center",
          marginVertical: 12,
        }}
        loop={true}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  // console.log("item.poster_path", item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require("../assets/images/moviePoster1.png")}
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
};
export default TrendingMovies;

const styles = StyleSheet.create({});
