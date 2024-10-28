/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import {vw, vh} from '../styles/stylesheet';
import {backIconSVG, standingYogaSVG} from '../assets/svgXml';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../services/customHook';
import {questionData} from '../services/renderData';
import {loadData, saveData, updateData} from '../data/storage';
import {QuestionPageData} from '../services/typeProps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('window');

const QuestionPage = () => {
  useStatusBar('#AF90D6');
  const [momDad, setMomDad] = React.useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  React.useEffect(() => {
    saveData('questionData', questionData);
  }, []);

  const handleSelectMomDad = async (value: string) => {
    if (value === 'M') {
      setMomDad('M');
      const data: QuestionPageData = await loadData('questionData');
      data.isMom = true;
      await updateData('questionData', data)
        .then(() => {
          // console.log('update success');
        })
        .catch(err => {
          console.warn(err.message);
        });
    } else {
      setMomDad('D');
      const data: QuestionPageData = await loadData('questionData');
      data.isMom = false;
      await updateData('questionData', data)
        .then(() => {
          console.log('update success');
        })
        .catch(err => {
          console.warn(err.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperview}>
        <View style={styles.backtbtnContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            {backIconSVG(vh(6), vw(6))}
          </TouchableOpacity>
        </View>
        <Text style={styles.initText}>
          Là bố hay là mẹ đang mong chờ sự ra đời của con vậy ạ?
        </Text>
      </View>
      <View style={styles.lowerview}>
        <View style={styles.choices}>
          <TouchableOpacity
            style={[
              styles.choicesGrp,
              momDad === 'M' ? {opacity: 1} : {opacity: 0.4},
            ]}
            onPress={() => handleSelectMomDad('M')}>
            <Image source={require('../assets/questionsAssets/isMom.png')} />
            <Text style={styles.choicesTxt}>Mẹ nè!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.choicesGrp,
              momDad === 'D' ? {opacity: 1} : {opacity: 0.4},
            ]}
            onPress={() => handleSelectMomDad('D')}>
            <Image source={require('../assets/questionsAssets/isDad.png')} />
            <Text style={styles.choicesTxt}>Bố đây</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomGrp}>
          <TouchableOpacity
            disabled={momDad === ''}
            style={[
              styles.nextBtn,
              momDad === ''
                ? {backgroundColor: 'gray'}
                : {backgroundColor: '#E5CFEF'},
            ]}
            onPress={() => navigation.navigate('Question2')}>
            <Text style={styles.nextBtnText}>Tiếp theo</Text>
          </TouchableOpacity>
          <View style={styles.img}>{standingYogaSVG(vw(80), vh(34))}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AF90D6',
  },
  upperview: {
    flex: 0.4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backtbtnContainer: {
    width: width,
    alignItems: 'flex-start',
    position: 'relative',
    top: vh(5),
    paddingLeft: vw(5),
  },
  initText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 34,
    paddingBottom: 20,
  },
  lowerview: {
    flex: 1.6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#221E3D',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
  },
  img: {
    opacity: 0.2,
    position: 'absolute',
    bottom: 0,
  },
  bottomGrp: {
    alignItems: 'center',
  },
  choices: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: vh(7),
  },
  nextBtn: {
    position: 'absolute',
    bottom: 70,
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  choicesTxt: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: '#AF90D6',
  },
  choicesGrp: {
    rowGap: 14,
  },
});

export default QuestionPage;
