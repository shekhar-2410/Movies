import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fetchSearchMovie, image185 } from "../api/moviedb";
const SearchScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovie({
        query: value,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResult(data.results);
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };
  const handleDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={styles.container}>
      <View style={styles.inputContaine}>
        <TextInput
          style={{ fontSize: 16, color: "#fff" }}
          placeholder="Search Movies"
          placeholderTextColor="white"
          onChangeText={handleDebounce}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{ backgroundColor: "gray", padding: 3, borderRadius: 50 }}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ color: "#fff", marginVertical: 8, marginLeft: 8 }}>
          Result({result.length})
        </Text>
        {loading ? (
          <Loading />
        ) : result.length > 0 ? (
          <View style={styles.mapContainer}>
            {result.map((item, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    navigation.navigate("Movie", item);
                  }}
                >
                  <Image
                    style={{
                      height: height * 0.33,
                      width: width * 0.44,
                      borderRadius: 8,
                      marginVertical: 8,
                    }}
                    // source={require("../assets/images/moviePoster2.png")}
                    source={{ uri: image185(item?.poster_path) }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    {item?.title.length > 10
                      ? item?.title.slice(0, 10) + "..."
                      : item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              style={{
                height: height * 0.6,
                width: width * 1,
                marginVertical: 8,
              }}
              source={require("../assets/images/movieTime.png")}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 8,
  },
  inputContaine: {
    padding: 8,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 16,
    marginTop: 40,
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
