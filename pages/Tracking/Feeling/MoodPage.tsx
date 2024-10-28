/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../../services/customHook';
import PregnancyCurrentWeekComponent from '../../../components/PregnancyCurrentWeekComponent';
import {vh, vw} from '../../../styles/stylesheet';
import {
  getMoodCardImg,
  getMoodProgressIcon,
} from '../../../services/imageHelper';
import {
  getVietnamDayOfWeek,
  getDateTime,
} from '../../../services/dayTimeService';
import {editIconSVG, plusSVG} from '../../../assets/svgXml';
import {
  getDiaryWeekData,
  moodImgSelectionData,
  moodSuggestionData,
} from '../../../services/renderData';
import {suggestionRenderData} from '../../../data/meal/suggestionData';
import {DiaryEntry} from '../../../services/typeProps';
import {loadData} from '../../../data/storage';
import {diaryWeekData} from '../../../services/storageService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface MoodSuggestion {
  img: any;
  title: string;
  des: string;
}

const MoodPage = () => {
  useStatusBar('#19162E');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [currentWeek, setCurrentWeek] = React.useState<number>(16);
  const [noteText, setNoteText] = React.useState<string>(
    'Cơ thể rất mệt mỏi, chồng và mọi người xung quanh làm gì cũng không vừa ý gây',
  );
  const [data, setData] = React.useState<DiaryEntry>();
  const [daysOfWeek, setDaysOfWeek] = React.useState([
    {day: 18, progress: 20},
    {day: 19, progress: 40},
    {day: 20, progress: 60},
    {day: 21, progress: 80},
    {day: 22, progress: 50},
    {day: 23, progress: 70},
    {day: 24, progress: 0},
  ]);
  const vietnameseDayOfWeek = getVietnamDayOfWeek();
  const today = getDateTime('day');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const returnData: DiaryEntry[] = await loadData(diaryWeekData);
        const useData = returnData.filter(
          v => Number(v.date) === Number(today),
        );
        setData(useData[0]);
      } catch (error) {
        console.error('Failed to load diary entry data', error);
      }
    };
    fetchData();
  }, [today]);

  const getImg = (label: string): any => {
    const item = moodImgSelectionData.find(v => v.label === label);
    if (item) {
      return item.img;
    } else {
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{backgroundColor: '#19162E'}}>
          <PregnancyCurrentWeekComponent
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: '#EAE1EE',
            }}>
            Tâm trạng tuần thai {currentWeek}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={{alignSelf: 'auto'}}>
              {renderProgressBar(day.progress)}
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 18,
                  color: '#EAE1EE',
                  marginVertical: 10,
                }}>
                {day.day}
              </Text>
            </View>
          ))}
        </View>
        {data &&
        data?.mood !== '' &&
        data?.tag.length > 0 &&
        data?.note !== '' ? (
          <View style={{width: vw(100), alignItems: 'center'}}>
            <View style={styles.wholeCardContainer}>
              <View style={styles.cardDayContainer}>
                <View style={styles.cardDayTitle}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    {vietnameseDayOfWeek}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    {`${today}`}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#EAE1EE',
                  }}>
                  Hôm nay
                </Text>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardHeaderContainer}>
                  <View style={styles.cardHeaderLeftGrp}>
                    <View>
                      <Image
                        style={{width: 35, height: 35, resizeMode: 'contain'}}
                        source={getImg(data.mood)}
                      />
                    </View>
                    <View style={styles.cardHeaderTitle}>
                      <Text
                        style={{
                          color: '#EAE1EE',
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        {data.mood}
                      </Text>
                      <Text
                        style={{
                          color: '#CDCDCD',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {data.setTime}
                      </Text>
                    </View>
                  </View>
                  {editIconSVG(vw(5), vh(3))}
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#382E75',
                    marginVertical: vh(2),
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                    rowGap: 10,
                    columnGap: 10,
                  }}>
                  {data.tag.map((v, i) => (
                    <View
                      key={i}
                      style={{
                        alignSelf: 'auto',
                      }}>
                      {renderMoodTag(v)}
                    </View>
                  ))}
                </View>
                <View style={{marginVertical: 10}}>
                  <Text
                    numberOfLines={2}
                    style={{color: '#EAE1EE', fontSize: 14, fontWeight: '400'}}>
                    Ghi chú: {data.note}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{width: vw(100), alignItems: 'center'}}>
            <View style={styles.wholeCardContainer}>
              <View style={styles.cardDayContainer}>
                <View style={styles.cardDayTitle}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    {vietnameseDayOfWeek}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    {`${today}`}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#EAE1EE',
                  }}>
                  Hôm nay
                </Text>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardHeaderContainer}>
                  <View style={styles.cardHeaderLeftGrp}>
                    <View>
                      <Image
                        style={{width: 35, height: 35, resizeMode: 'contain'}}
                        source={getMoodCardImg('disappointed')}
                      />
                    </View>
                    <View style={styles.cardHeaderTitle}>
                      <Text
                        style={{
                          color: '#EAE1EE',
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        U sầu
                      </Text>
                      <Text
                        style={{
                          color: '#CDCDCD',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        20:10
                      </Text>
                    </View>
                  </View>
                  {editIconSVG(vw(5), vh(3))}
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#382E75',
                    marginVertical: vh(2),
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                    rowGap: 10,
                    columnGap: 10,
                  }}>
                  {renderMoodTag('Nhu cầu tình dục cao')}
                  {renderMoodTag('Tủi thân')}
                  {renderMoodTag('Khó chịu')}
                </View>
                <View style={{marginVertical: 10}}>
                  <Text
                    numberOfLines={2}
                    style={{color: '#EAE1EE', fontSize: 14, fontWeight: '400'}}>
                    Ghi chú: {noteText}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        <View
          style={{width: vw(100), alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Diary')}
            style={{
              width: '90%',
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EAE1EE',
              borderRadius: 30,
            }}>
            <Text style={{textAlign: 'center'}}>Xem thêm</Text>
          </TouchableOpacity>
          <View
            style={{width: vw(100), alignItems: 'center', marginVertical: 20}}>
            <View style={{width: '90%'}}>
              <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
                Gợi ý cải thiện tình trạng hiện tại
              </Text>
            </View>
            <ScrollView horizontal style={{paddingLeft: vw(5)}}>
              {renderMoodSuggestion(moodSuggestionData)}
            </ScrollView>
            {renderChildMusic()}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#AA3A3A',
          alignItems: 'center',
          justifyContent: 'center',
          width: vw(15),
          height: vw(15),
          position: 'absolute',
          bottom: vh(20),
          right: 20,
          backgroundColor: '#AA3A3A',
          borderRadius: 100,
          // Shadow properties for iOS to simulate a blur effect
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          // Elevation for Android
          elevation: 8,
        }}
        onPress={() => {
          navigation.navigate('Diary');
        }}>
        {plusSVG(vw(5), vw(5), '#FFFFFF')}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const renderProgressBar = (percentage: number) => {
  const {imageSource, backgroundColor} = getMoodProgressIcon(percentage);
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progress,
            {height: `${percentage}%`, backgroundColor: backgroundColor},
          ]}>
          <Image source={imageSource} style={styles.progressIcon} />
        </Animated.View>
      </View>
    </View>
  );
};

const renderMoodTag = (name: string) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#EAE1EE',
        alignSelf: 'flex-start',
        padding: 10,
      }}>
      <Text style={{color: '#EAE1EE', fontSize: 16, fontWeight: '400'}}>
        {name}
      </Text>
    </View>
  );
};

const renderMoodSuggestion = (data: MoodSuggestion[]) => {
  return (
    <View style={{flexDirection: 'row', columnGap: 10, marginVertical: vh(2)}}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 155,
            width: 130,
            backgroundColor: '#A283C833',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <Image
            style={{width: 90, height: 90, resizeMode: 'cover'}}
            source={v.img}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: '#FFFFFF',
            }}>
            {v.title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '400',
              color: '#CDCDCD',
            }}>
            {v.des}
          </Text>
        </View>
      ))}
    </View>
  );
};

const renderChildMusic = () => {
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
      }}>
      <Text style={{color: '#19162E', fontSize: 14, fontWeight: '400'}}>
        Nhạc dưỡng thai cho bé
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#19162E',
          height: 30,
          width: '25%',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
        <Text
          style={{
            color: '#EAE1EE',
            textAlign: 'center',
          }}>
          Xem
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginTop: vh(2),
  },
  progressBar: {
    height: 200,
    width: 20,
    backgroundColor: '#E0E0E0',
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
    bottom: 0,
  },
  progressIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
  },
  wholeCardContainer: {
    width: vw(90),
    rowGap: vh(2),
  },
  cardDayContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    columnGap: vw(3),
  },
  cardDayTitle: {
    backgroundColor: '#EAE1EE',
    height: 44,
    width: 44,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardContentContainer: {
    width: '100%',
    backgroundColor: '#322C56',
    borderRadius: 16,
    padding: vw(3),
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardHeaderLeftGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(3),
  },
  cardHeaderImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cardHeaderTitle: {},
});
