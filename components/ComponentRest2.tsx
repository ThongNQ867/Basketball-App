/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {vh} from '../styles/stylesheet';

const ComponentRest2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>
        Ứng dụng này sẽ giúp bố mẹ cảm thấy yên tâm hơn nếu như được cung cấp
        một số thông tin chi tiết hơn nữa ạ
      </Text>
      <Image
        source={require('../assets/Frame.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: vh(4),
    paddingHorizontal: 30,
  },
  titleTxt: {
    textAlign: 'center',
    color: '#221E3D',
    fontWeight: '800',
    fontSize: 20,
  },
});

export default ComponentRest2;
