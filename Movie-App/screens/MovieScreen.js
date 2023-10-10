import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchCreditMovie,
  fetchDetailedMovie,
  fetchSimilarMovie,
} from "../api/moviedb";
import { image500 } from "../api/moviedb";
const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavorite, setisFavorite] = useState(false);
  const [movieDetails, setmovieDetails] = useState({});
  const [cast, setCast] = useState(null);
  const [similarMovie, setsimilarMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getCastDetails(item.id);
    getSimilarMovieDetails(item.id);
  }, [item]);
  // moviedetails
  const getMovieDetails = async (id) => {
    const data = await fetchDetailedMovie(id);
    if (data) setmovieDetails(data);
    setLoading(false);
  };
  // castDetails
  const getCastDetails = async (id) => {
    const data = await fetchCreditMovie(id);
    if (data && data.cast && Array.isArray(data.cast)) {
      setCast(data.cast);
    } else {
      setCast([]); // Set an empty array if there is no valid cast data
    }
    setLoading(false);
  };
  // similarmovie
  const getSimilarMovieDetails = async (id) => {
    const data = await fetchSimilarMovie(id);
    if (data && data.results) setsimilarMovie(data.results);
    setLoading(false);
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        // source={require("../assets/images/moviePoster2.png")}
        source={{ uri: image500(movieDetails.poster_path) }}
        style={styles.backgroundImage}
      >
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
              color={isFavorite ? "#f5ce42" : "#fff"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
      {loading ? (
        <Loading />
      ) : (
        <>
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.9)", "rgba(23,23,23,1)"]}
            style={{
              width,
              height: height - height * 0.5,
              position: "absolute",
              pointerEvents: "none",
              // bottom: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 27,
              marginTop: -25,
            }}
          >
            {movieDetails?.original_title}
          </Text>
          <View>
            {movieDetails.id ? (
              <Text style={styles.testStyle}>
                {movieDetails?.status} .{" "}
                {movieDetails?.release_date?.split("-")[0]} .
                {movieDetails?.runtime}min
              </Text>
            ) : null}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {movieDetails?.genres?.map((item, index) => {
              return (
                <Text key={index} style={styles.testStyle}>
                  {item?.name}
                  {index < item?.name.length - 1 && "  "}
                </Text>
              );
            })}
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                paddingHorizontal: 10,
                marginVertical: 12,
              }}
            >
              {movieDetails?.overview}
            </Text>
          </View>
          {/* cast */}

          {cast?.length > 0 ? (
            <Cast cast={cast} navigation={navigation} />
          ) : null}
          {/* similar movie */}
          {similarMovie?.length > 0 ? (
            <MovieList
              title={"Similar Movie"}
              hideSeeAll={true}
              data={similarMovie}
            />
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
  backgroundImage: {
    width: width,
    height: height * 0.45,
  },
  safeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    padding: 16,
  },
  testStyle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "300",
    marginVertical: 6,
  },
  linearGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.55, // Adjust this value as needed
  },
});
