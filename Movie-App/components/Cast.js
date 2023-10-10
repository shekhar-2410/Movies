import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { image342 } from "../api/moviedb";
const { width, height } = Dimensions.get("window");
const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text
        style={{
          color: "#fff",
          marginVertical: 12,
          fontSize: 18,
          marginHorizontal: 8,
        }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {cast &&
          cast?.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Person", person)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: image342(person?.profile_path) }}
                  />
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    marginTop: 12,
                  }}
                >
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    marginTop: 4,
                    paddingBottom: 16,
                  }}
                >
                  {person?.name.length > 10
                    ? person?.name.slice(0, 10) + "..."
                    : person?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.2,
    // height: height * 0.40,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});
