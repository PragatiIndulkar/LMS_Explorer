import {StyleSheet} from 'react-native';

const getStyles = () =>
  StyleSheet.create({
    container: {flex: 1, padding: 10},
    card: {
      padding: 10,
      backgroundColor: '#dfe0f2',
      marginBottom: 8,
      borderRadius: 5,
    },
    pickerStyle: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#dfe0f2',
      borderRadius: 8,
      marginVertical: 10,
    },
    filterText: {fontWeight: 'bold', fontSize: 25},
    btnStyle: {
      backgroundColor: '#212345',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    title: {fontWeight: 'bold', fontSize: 20},
    searchComponent: {
      height: 40,
      borderColor: 'black',
      backgroundColor: '#dfe0f2',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    filterRow: {flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5},
    toggleRow: {
      backgroundColor: '#8f94f2',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      justifyContent: 'space-between',
    },
    sortBtnStyle: {
      backgroundColor: '#212345',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
  });

export default getStyles;
