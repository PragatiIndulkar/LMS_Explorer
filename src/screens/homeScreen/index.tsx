import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  Switch,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getStyles from './styles';
import {Picker} from '@react-native-picker/picker';

export default function HomeScreen({navigation}) {
  const styles = getStyles();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [longTitlesOnly, setLongTitlesOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      const transformed = data.map(item => ({
        ...item,
        wordCount: item.title.trim().split(/\s+/).length,
      }));
      setCourses(transformed);
      await AsyncStorage.setItem('cachedCourses', JSON.stringify(transformed));
      const uniqueIds = [...new Set(transformed.map(c => c.userId))];
      setInstructors(uniqueIds);
      setError(false);
    } catch (e) {
      console.error('Fetch error:', e);
      setError(true);
      const cached = await AsyncStorage.getItem('cachedCourses');
      if (cached) {
        const data = JSON.parse(cached);
        setCourses(data);
        const uniqueIds = [...new Set(data.map(c => c.userId))];
        setInstructors(uniqueIds);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function renderRetryComponent() {
    return (
      <View>
        <Text>Error loading. Check internet.</Text>
        <Button title="Retry" onPress={fetchData} />
      </View>
    );
  }
  useEffect(() => {
    let data = [...courses];
    if (selectedInstructor)
      data = data.filter(c => c.userId === selectedInstructor);
    if (longTitlesOnly) data = data.filter(c => c.wordCount >= 5);
    data.sort((a, b) =>
      sortAsc ? a.wordCount - b.wordCount : b.wordCount - a.wordCount,
    );
    setFiltered(data);
  }, [courses, selectedInstructor, longTitlesOnly, sortAsc]);

  if (loading) {
    return <ActivityIndicator size="large" style={{flex: 1}} />;
  }
  if (error && courses.length === 0) {
    renderRetryComponent();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.filterText}>Filter by Instructor:</Text>
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={selectedInstructor}
          onValueChange={value => setSelectedInstructor(value)}
          style={{height: 50, width: '100%'}}>
          <Picker.Item label="All" value={null} />
          {instructors.map(id => (
            <Picker.Item key={id} label={`Instructor ${id}`} value={id} />
          ))}
        </Picker>
      </View>
      <View style={styles.toggleRow}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Long Titles</Text>
        <Switch value={longTitlesOnly} onValueChange={setLongTitlesOnly} />
        <TouchableOpacity
          onPress={() => setSortAsc(!sortAsc)}
          style={styles.sortBtnStyle}>
          <Text style={{color: 'white'}}> {`Sort ${sortAsc ? '↑' : '↓'}`}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {course: item})}>
            <View style={styles.card}>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text>Instructor ID: {item.userId}</Text>
              <Text>Word Count: {item.wordCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
