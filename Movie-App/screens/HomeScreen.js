import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useEffect } from "react";
import {
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "../api/moviedb";
const HomeScreen = () => {
  const navigation = useNavigation([1, 2, 3, 4]);
  const [trendingMovie, settrendingMovie] = useState([]);
  const [upcomingMovie, setupcomingMovie] = useState([]);
  const [topratedMovie, settopratedMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopratedMovie();
  }, []);
  // trendingmovie
  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();

    if (data && data.results) settrendingMovie(data.results);
    setLoading(false);
  };
  // upcomingmovie
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();

    if (data && data.results) setupcomingMovie(data.results);
    setLoading(false);
  };
  // topratedmovie
  const getTopratedMovie = async () => {
    const data = await fetchTopRatedMovie();

    if (data && data.results) settopratedMovie(data.results);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.iconContainer}>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text style={styles.textStyle}>
            <Text
              style={{
                color: "#f5ce42",
                fontSize: 27,
                textDecorationLine: "underline",
              }}
            >
              M
            </Text>
            ovies
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Trending movie */}
          {trendingMovie.length > 0 && <TrendingMovies data={trendingMovie} />}

          {/* MovieList */}
          <MovieList title={"UpcomingMovie"} data={upcomingMovie} />
          <MovieList title={"Top Rated Movie"} data={topratedMovie} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 8,
  },
  iconContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "600",
  },
});
