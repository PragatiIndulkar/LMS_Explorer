import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getStyles from './styles';
export default function DetailScreen({route, navigation}) {
  const styles = getStyles();
  const {course} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setIsFavorite(favs.includes(course.id));
  };

  const toggleFavorite = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    let updated;
    if (favs.includes(course.id)) {
      updated = favs.filter(id => id !== course.id);
    } else {
      updated = [...favs, course.id];
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {course.title}</Text>
      <Text>Instructor ID: {course.userId}</Text>
      <Text>Description: {course.body}</Text>
      <Text>Word Count: {course.wordCount}</Text>
      <Text style={{fontSize: 20}}>{isFavorite ? '⭐ Favorited' : ''}</Text>
      <TouchableOpacity
        style={[styles.Btn, {marginVertical: 10}]}
        onPress={toggleFavorite}>
        <Text style={styles.text}>
          {isFavorite ? 'Unmark Favorite' : 'Mark as Favorite'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Btn} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>{'Back'}</Text>
      </TouchableOpacity>
    </View>
  );
}
