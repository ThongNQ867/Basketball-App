/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getDiaryWeekData, moodImgSelectionData} from '../services/renderData';
import {getDateTime} from '../services/dayTimeService';
import {vh, vw} from '../styles/stylesheet';
import {DiaryEntry} from '../services/typeProps';
import {loadData, saveData} from '../data/storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ToggleSwitch from 'toggle-switch-react-native';
import {editIconSVG} from '../assets/svgXml';

const WeekContentComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = React.useState<DiaryEntry[]>([]);
  const today = getDateTime('day');
  const [refreshing, setRefreshing] = React.useState(false);
  const loadDataFromStorage = async () => {
    try {
      const loadedData = await loadData<DiaryEntry[]>('diaryWeekData');
      if (loadedData) {
        setData(loadedData);
      } else {
        const initialData = getDiaryWeekData();
        setData(initialData);
        saveData('diaryWeekData', initialData);
      }
    } catch {
      const initialData = getDiaryWeekData();
      setData(initialData);
      saveData('diaryWeekData', initialData);
    }
  };

  const [toggleStates, setToggleStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    loadDataFromStorage();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadDataFromStorage().finally(() => setRefreshing(false));
  }, []);

  const handleToggle = (key: string) => {
    setToggleStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const getMoodImage = (mood: string) => {
    const moodData = moodImgSelectionData.find(item => item.label === mood);
    return moodData ? moodData.img : null;
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData<DiaryEntry[]>('diaryWeekData')
        .then(loadedData => {
          if (loadedData) {
            setData(loadedData);
            // console.log(loadedData);
          } else {
            const initialData = getDiaryWeekData();
            setData(initialData);
            saveData('diaryWeekData', initialData);
          }
        })
        .catch(() => {
          const initialData = getDiaryWeekData();
          setData(initialData);
          saveData('diaryWeekData', initialData);
        });

      return () => {};
    }, []),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{rowGap: vh(2), paddingBottom: vh(1)}}>
        {data.map((v, i) => (
          <View key={i} style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(2),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DiaryUpdate', {index: i})}
                disabled={Number(today) < Number(v.date)}
                style={[
                  styles.circleDate,
                  Number(today) === Number(v.date)
                    ? {backgroundColor: '#EAE1EE'}
                    : {},
                ]}>
                <Text
                  style={[
                    styles.circleDateTxT,
                    {fontSize: 12},
                    Number(today) === Number(v.date) ? {color: '#221E3D'} : {},
                  ]}>
                  {v.dayOfWeek}
                </Text>
                <Text
                  style={[
                    styles.circleDateTxT,
                    {fontSize: 18, fontWeight: '700'},
                    Number(today) === Number(v.date) ? {color: '#221E3D'} : {},
                  ]}>
                  {v.date}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 18, color: '#8B8B8B'}}>
                {Number(today) === Number(v.date) ? 'Hôm nay' : v.status}
              </Text>
            </View>
            {v.mood !== '' && v.setTime !== '' && v.note !== '' ? (
              <View
                style={{
                  marginTop: vh(1),
                  backgroundColor: '#322C56',
                  padding: vw(2),
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                    Cân nặng: {v.weight}kg
                  </Text>
                  <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                    Vòng bụng: {v.bellySize}cm
                  </Text>
                </View>
                {v.reservation.doctorname !== '' ? (
                  <View
                    style={{
                      marginTop: vh(1),
                      backgroundColor: '#382E75',
                      borderRadius: 16,
                      padding: vw(2),
                      rowGap: vh(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                        Lịch khám:
                      </Text>
                      <ToggleSwitch
                        isOn={
                          toggleStates[`reminderToggle_${v.date + i}`] || false
                        }
                        onColor="#221E3D"
                        offColor="#221E3D"
                        circleColor={'#EAE1EE'}
                        onToggle={() =>
                          handleToggle(`reminderToggle_${v.date + i}`)
                        }
                        size="medium"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                          Bác sĩ: {v.reservation.doctorname}
                        </Text>
                        <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                          {v.reservation.status}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#EAE1EE',
                          padding: vw(2),
                          borderRadius: 16,
                        }}>
                        <Text style={{fontSize: 18, color: '#221E3D'}}>
                          {v.reservation.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#382E75',
                    paddingVertical: vh(1),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: vw(2),
                    }}>
                    <Image
                      source={getMoodImage(v.mood)}
                      style={{width: 30, height: 30, marginLeft: vw(2)}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#EAE1EE',
                          fontWeight: '700',
                        }}>
                        {v.mood}
                      </Text>
                      <Text style={{fontSize: 12, color: '#CDCDCD'}}>
                        {v.setTime}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DiaryUpdate', {index: i})
                    }
                    // disabled={Number(today) > Number(v.date)}
                  >
                    {editIconSVG(vw(6), vh(3))}
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                      gap: vw(2),
                      marginTop: vh(1),
                    }}>
                    {v.tag.map((tag, index) => (
                      <View
                        key={index}
                        style={{
                          borderWidth: 1,
                          borderColor: '#EAE1EE',
                          padding: vw(1),
                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 18, color: '#EAE1EE'}}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#EAE1EE',
                        marginTop: vh(1),
                      }}>
                      Ghi chú: {v.note}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WeekContentComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vw(5),
    flex: 1,
  },
  circleDate: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
    height: 44,
    width: 44,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleDateTxT: {
    color: '#CDCDCD',
  },
});
