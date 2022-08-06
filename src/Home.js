import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.tabBox}>
          <TabButton
            source={require('../assets/images/search.png')}
            onPress={() => navigation.navigate('Search')}
          />
          <TabButton
            source={require('../assets/images/menu-bar.png')}
            onPress={() => null}
          />
        </View>
      ),
    });
    getMovieData();
  }, [navigation]);

  const getMovieData = async () => {
    let defaultHeaders = {
      Authorization: 'Bearer Wookie2019',
    };
    let url = 'https://wookie.codesubmit.io/movies';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: defaultHeaders,
      });
      const json = await response.json();
      setData(json.movies);
      //   console.log('MovieData=', JSON.stringify(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.flatlist}
        nestedScrollEnabled={true}
        data={[...new Set(data.reduce((a, c) => [...a, ...c?.genres], []))]}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => <GenereCard title={item} data={data} />}
      />
    </View>
  );
};

export default Home;

const GenereCard = ({title, data}) => {
  return (
    <View>
      <Text>{title}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollBox}
        showsHorizontalScrollIndicator={false}>
        {data
          .filter(c => c?.genres.includes(title))
          .map((item, index) => (
            <Image
              key={index}
              style={styles.images}
              source={{uri: item?.backdrop}}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const TabButton = ({onPress, source, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={[styles.tabImage, style]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBox: {display: 'flex', flexDirection: 'row'},
  flatlist: {padding: 20},
  horizontalScrollBox: {marginTop: 10, marginBottom: 20},
  images: {height: 150, width: 90, marginRight: 10},
  tabImage: {
    marginHorizontal: 10,
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
});
