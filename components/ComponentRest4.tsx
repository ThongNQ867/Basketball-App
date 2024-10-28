/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {mamaMateRedSVG, sleepingChildSVG} from '../assets/svgXml';
import {vh, vw} from '../styles/stylesheet';

const ComponentRest4 = () => {
  return (
    <View style={styles.container}>
      {mamaMateRedSVG(vw(30), vh(10))}
      <Text style={styles.titleTxt}>
        Con sẽ <Text style={styles.titleTxtinline}>"Tốt bụng và dịu dàng"</Text>{' '}
        như bố mẹ mong muốn.
      </Text>
      {sleepingChildSVG(vw(80), vh(40))}
      <Text style={styles.titleTxt}>
        Hơn nữa con sẽ cùng mẹ thật khỏe mạnh và hạnh phúc.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 30,
    // rowGap: vh(1),
  },

  titleTxt: {
    textAlign: 'center',
    color: '#221E3D',
    fontSize: 20,
    fontWeight: '800',
  },
  titleTxtinline: {
    textAlign: 'center',
    color: '#AA3A3A',
    fontSize: 20,
    fontWeight: '800',
  },
});

export default ComponentRest4;
