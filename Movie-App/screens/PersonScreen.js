import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { useRoute } from "@react-navigation/native";
import { fetchPersonDeatils, fetchPersonMovie } from "../api/moviedb";
import { image342 } from "../api/moviedb";
const PersonScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavorite, setisFavorite] = useState(false);
  const [movieName, setmovieName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [personDetail, setpersonDetail] = useState({});

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
    },
    android: {
      elevation: 5, // Adjust the elevation as needed
    },
  });
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getMovieDettails(item.id);
  }, [item]);
  // persondetails
  const getPersonDetails = async (id) => {
    const data = await fetchPersonDeatils(id);
    if (data) setpersonDetail(data);
    setLoading(false);
  };
  // personmoviedetails
  const getMovieDettails = async (id) => {
    const data = await fetchPersonMovie(id);
    if (data && data.cast && Array.isArray(data.cast)) {
      setmovieName(data.cast);
    } else {
      setmovieName([]);
    }

    setLoading(false);
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: "#f5ce42",
            padding: 1,
            borderRadius: 6,
          }}
        >
          <ChevronLeftIcon size="24" strokeWidth={2.5} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setisFavorite(!isFavorite)}>
          <HeartIcon
            size={24}
            strokeWidth={1.5}
            color={isFavorite ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 8,
            }}
          >
            <View style={[styles.imageContainer, shadowStyle]}>
              <View style={styles.image}>
                <Image
                  style={{ height: height * 0.3, width: width * 0.5 }}
                  // source={require("../assets/images/castImage2.png")}
                  source={{
                    uri: image342(personDetail?.profile_path),
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 23, textAlign: "center", color: "#fff" }}>
              {personDetail?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: "rgba(242, 233, 233, 0.6)",
              }}
            >
              {personDetail?.place_of_birth}
            </Text>
          </View>
          <View style={styles.constainer}>
            <View
              style={{
                borderRightWidth: 2,
                borderColor: "rgba(242, 233, 233, 0.6)",
                paddingRight: 20,
                marginLeft: 8,
              }}
            >
              <Text style={styles.texttitle}>Gender </Text>
              <Text style={styles.texsubtitle}>
                {personDetail?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 2,
                borderColor: "rgba(242, 233, 233, 0.6)",
                paddingRight: 20,
              }}
            >
              <Text style={styles.texttitle}>Birthday</Text>
              <Text style={styles.texsubtitle}>{personDetail?.birthday}</Text>
            </View>
            <View
              style={{
                borderRightWidth: 2,
                borderColor: "rgba(242, 233, 233, 0.6)",
                paddingRight: 20,
              }}
            >
              <Text style={styles.texttitle}>Known for</Text>
              <Text style={styles.texsubtitle}>
                {personDetail?.known_for_department}
              </Text>
            </View>
            <View>
              <Text style={styles.texttitle}>Populity</Text>
              <Text style={styles.texsubtitle}>{personDetail?.popularity}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 18, color: "#fff", marginBottom: 8 }}>
              Biography
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(242, 233, 233, 0.6)",
              }}
            >
              {personDetail?.biography}
            </Text>
            <MovieList title={"Movies"} data={movieName} hideSeeAll={true} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
  safeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    padding: 8,
  },
  imageContainer: {
    alignItems: "center",
  },

  image: {
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: "gray",
  },
  constainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#666665",
    borderRadius: 16,
    marginVertical: 8,
    gap: 16,
  },
  texttitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
  texsubtitle: {
    textAlign: "center",
    color: "rgba(242, 233, 233, 0.6)",
    fontSize: 14,
  },
});
