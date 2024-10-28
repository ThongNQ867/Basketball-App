/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {vh, vw} from '../styles/stylesheet';
import {mamaMateRedSVG} from '../assets/svgXml';

const ComponentRest3 = () => {
  return (
    <View style={styles.container}>
      {mamaMateRedSVG(vw(30), vh(10))}
      <View>
        <Text style={styles.titleTxt}>Bố mẹ sắp đuợc thăng chức rồi!</Text>
        <Text style={styles.titleTxt}>
          Mamamate sẽ giúp mẹ và con khỏe mạnh thôi mà!
        </Text>
      </View>
      <View>
        <Image source={require('../assets/mamaWithFlor.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: vh(1),
    paddingHorizontal: 30,
  },
  titleTxt: {
    textAlign: 'center',
    color: '#221E3D',
    fontSize: 20,
    fontWeight: '800',
  },
});

export default ComponentRest3;
