import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getStyles from './styles';
export default function DetailScreen({route, navigation}) {
  const styles = getStyles();
  const {course} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    checkFavorite();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoadingComments(true);
    setCommentsError(false);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${course.id}/comments`,
      );
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (e) {
      console.error('Error fetching comments:', e);
      setCommentsError(true);
    } finally {
      setLoadingComments(false);
    }
  };
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
  const renderComment = ({item}) => (
    <View style={styles.commentSection}>
      <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      <Text style={{fontStyle: 'italic'}}>{item.email}</Text>
      <Text>{item.body}</Text>
    </View>
  );

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

      <Text style={[styles.title, {marginTop: 20}]}>Course Reviews</Text>

      {loadingComments ? (
        <ActivityIndicator size="small" style={{marginTop: 10}} />
      ) : commentsError ? (
        <Text style={{color: 'red', marginTop: 10}}>
          Failed to load reviews.
        </Text>
      ) : comments.length === 0 ? (
        <Text style={{marginTop: 10}}>No reviews available.</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={item => item.id.toString()}
          renderItem={renderComment}
          style={{marginTop: 10}}
        />
      )}
    </View>
  );
}
