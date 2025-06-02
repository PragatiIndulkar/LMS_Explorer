import {StyleSheet} from 'react-native';

const getStyles = () =>
  StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
    Btn: {
      backgroundColor: '#212345',
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    text: {color: 'white', fontSize: 18},
    commentSection: {
      marginBottom: 10,
      padding: 8,
      borderWidth: 1,
      backgroundColor: '#dfe0f2',
      borderColor: 'black',
      borderRadius: 6,
    },
  });

export default getStyles;
