/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/customHook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {
  addTimelineIconSVG,
  backButtonWithoutArrowSVG,
  checkOnlyIconSVG,
} from '../../assets/svgXml';
import {vh, vw} from '../../styles/stylesheet';
import {pregnancyExamData} from '../../services/renderData';
interface CheckItemData {
  isDone: boolean;
  title: string;
  date: string;
}

interface RenderCheckList {
  trimester: number;
  data: CheckItemData[];
}

const PregnancyExaminationPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [examNum, setExamNum] = React.useState<number>(1);
  const [examData, setExamData] =
    React.useState<RenderCheckList[]>(pregnancyExamData);
  useStatusBar('#B95649');

  const toggleCheckbox = (triIndex: number, itemIndex: number) => {
    setExamData(prevData => {
      const newData = [...prevData];
      newData[triIndex].data[itemIndex].isDone =
        !newData[triIndex].data[itemIndex].isDone;
      return newData;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderHeader(navigation, setExamNum, examNum)}</View>
      <ScrollView>
        <View>{renderCheckList(examData, examNum, toggleCheckbox)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderCheckList = (
  data: RenderCheckList[],
  num: number,
  toggleCheckbox: (triIndex: number, itemIndex: number) => void,
) => {
  return (
    <View>
      {data.map((v, i) => (
        <View key={i}>
          {v.trimester === num ? (
            <View style={{rowGap: vh(2), marginVertical: vh(3)}}>
              {v.data.map((va, ind) => (
                <View
                  key={ind}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    width: vw(100),
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '80%',
                      columnGap: vw(2),
                    }}>
                    <TouchableOpacity
                      onPress={() => toggleCheckbox(i, ind)}
                      style={{
                        backgroundColor: va.isDone ? '#82BA5F' : 'transparent',
                        borderRadius: 30,
                        height: 24,
                        width: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: va.isDone ? 0 : 1,
                        borderColor: va.isDone ? '' : '#515151',
                      }}>
                      {checkOnlyIconSVG(vw(4), vh(2))}
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          color: '#EAE1EE',
                          textDecorationLine: va.isDone
                            ? 'line-through'
                            : 'none',
                          opacity: va.isDone ? 0.5 : 1,
                        }}>
                        {va.title}
                      </Text>
                      <Text
                        style={{
                          color: '#96C1DE',
                          fontSize: 12,
                          opacity: va.isDone ? 0.5 : 1,
                        }}>
                        {va.date}
                      </Text>
                    </View>
                  </View>
                  <View>{addTimelineIconSVG(vw(6), vh(3))}</View>
                </View>
              ))}
            </View>
          ) : (
            <></>
          )}
        </View>
      ))}
    </View>
  );
};

const renderHeader = (
  navigation: NativeStackNavigationProp<any>,
  setNum: React.Dispatch<React.SetStateAction<number>>,
  examNum: number,
) => {
  const numbers = Array.from({length: 3}, (_, i) => i + 1);
  return (
    <LinearGradient
      colors={['#B95649', '#FFDADAC7']}
      style={{
        height: 160,
        width: vw(100),
        overflow: 'hidden',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{paddingLeft: vw(5), justifyContent: 'space-evenly'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: vw(5),
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {backButtonWithoutArrowSVG(vw(6), vh(3), '#221E3D')}
            </TouchableOpacity>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              Xét nghiệm
            </Text>
          </View>
          <View style={{rowGap: vh(1)}}>
            <Text style={{color: '#EAE1EE', fontSize: 14, fontWeight: '400'}}>
              3 tam ca nguyệt
            </Text>
            <View
              style={{flexDirection: 'row', width: '100%', columnGap: vw(2)}}>
              {numbers.map((number, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setNum(i + 1)}
                  style={{
                    alignSelf: 'flex-start',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: '#221E3D',
                    borderRadius: 10,
                    backgroundColor:
                      i + 1 === examNum ? '#221E3D' : 'transparent',
                  }}>
                  <Text
                    style={[
                      styles.numberStyle,
                      i + 1 === examNum ? {color: '#FFFFFF'} : {},
                    ]}>
                    {number}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{position: 'absolute', right: vw(13), zIndex: 2}}
            source={require('../../assets/TaskList/medicalHeart.png')}
          />

          <Image
            style={{resizeMode: 'contain'}}
            source={require('../../assets/TaskList/doctor.png')}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default PregnancyExaminationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  numberStyle: {
    textAlign: 'center',
    color: '#221E3D',
    fontSize: 18,
    fontWeight: '700',
  },
});
