/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {childOnHandSVG} from '../assets/svgXml';
import {vh, vw} from '../styles/stylesheet';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('screen');

interface RenderLayout {
  expectedDateOfBirth: Date | null;
}

const ComponentRest1: React.FC<RenderLayout> = ({expectedDateOfBirth}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleTxt}>Ngày sinh dự kiến của mẹ:</Text>
      </View>
      <View style={styles.bottomGrp}>
        <View style={styles.datestyle}>
          <View style={styles.columnStyle}>
            <Text style={styles.inputTxt}>Ngày</Text>
            <View>
              <View style={styles.btnOpacity}>
                <Text style={styles.timeTxt}>
                  {expectedDateOfBirth?.getDate() ?? '-'}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.dashed}>-</Text>
          <View style={styles.columnStyle}>
            <Text style={styles.inputTxt}>Tháng</Text>
            <View style={styles.btnOpacity}>
              <Text style={styles.timeTxt}>
                {expectedDateOfBirth?.getMonth() != null
                  ? expectedDateOfBirth.getMonth() + 1
                  : '-'}
              </Text>
            </View>
          </View>
          <Text style={styles.dashed}>-</Text>
          <View style={styles.columnStyle}>
            <Text style={styles.inputTxt}>Năm</Text>
            <View style={styles.btnOpacity}>
              <Text style={styles.timeTxt}>
                {expectedDateOfBirth?.getFullYear() ?? '-'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mainImg}>{childOnHandSVG(vw(65), vh(40))}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleTxt: {
    textAlign: 'center',
    color: '#221E3D',
    fontSize: 20,
    fontWeight: '800',
  },
  datestyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width,
  },
  inputTxt: {
    color: '#221E3D',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
  },
  bottomGrp: {
    marginTop: vh(5),
  },
  btnOpacity: {
    width: width,
    alignItems: 'center',
  },
  timeTxt: {
    color: '#221E3D',
    fontSize: 36,
    fontWeight: '700',
  },
  dashed: {
    color: '#221E3D',
    position: 'relative',
    top: vh(6),
  },
  columnStyle: {
    rowGap: vh(1),
  },
  mainImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ComponentRest1;
