/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {backPinkbuttonSVG} from '../assets/svgXml';
import {vh, vw} from '../styles/stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../services/customHook';
import {QuestionPageData} from '../services/typeProps';
import {loadData, updateData} from '../data/storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('window');

const RestScreenLastPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [babySize, setBabySize] = React.useState({
    height: 0.1,
    weight: 0.1,
  });

  useStatusBar('#221E3D');

  const handleSubmit = async () => {
    try {
      const data: QuestionPageData = await loadData('questionData');
      data.isFinished = true;
      await updateData('questionData', data)
        .then(() => {
          console.log('update success');
          navigation.navigate('Main');
        })
        .catch(err => {
          console.warn(err.message);
        });
    } catch (error) {
      console.error('Failed to load question data', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperview}>
        <TouchableOpacity
          style={styles.backBtnOpa}
          onPress={() => {
            navigation.goBack();
          }}>
          {backPinkbuttonSVG(vw(6), vh(6))}
        </TouchableOpacity>
        <View style={styles.titleImgContainer}>
          <Image source={require('../assets/RestAssets/sesameSeeds.png')} />
        </View>
      </View>
      <View style={styles.lowerview}>
        <View style={styles.mainContent}>
          <Text style={styles.titleTxt}>Hiện tại con giống như một:</Text>
          <Text style={styles.desTxt}>“HẠT VỪNG”</Text>
          <Image source={require('../assets/heart.png')} />
          <View>
            <Text>Cân nặng: {babySize.weight}kg</Text>
            <Text>Chiều cao: {babySize.height}cm</Text>
          </View>
        </View>

        <View style={styles.btnGrp}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleSubmit}>
            <Text style={styles.nextBtnTxt}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
    width: width,
  },
  upperview: {
    alignItems: 'flex-start',
    flex: 0.5,
  },
  mainContent: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: vh(2),
  },
  lowerview: {
    flex: 1.5,
    backgroundColor: '#A283C8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  backBtnOpa: {
    zIndex: 1,
    position: 'relative',
    top: vh(3),
    left: vw(8),
  },
  btnGrp: {
    position: 'absolute',
    bottom: vh(6),
    width: width,
    alignItems: 'center',
  },
  titleImgContainer: {
    width: width,
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
    top: vh(8),
  },
  nextBtn: {
    backgroundColor: '#E5CFEF',
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#221E3D',
  },
  titleTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  desTxt: {
    color: '#221E3D',
    fontWeight: '800',
    fontSize: 24,
  },
});

export default RestScreenLastPage;
