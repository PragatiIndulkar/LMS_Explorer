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
  });

export default getStyles;
