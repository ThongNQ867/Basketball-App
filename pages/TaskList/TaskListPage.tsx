/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
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
import {vh, vw} from '../../styles/stylesheet';
import {formattedDate, getDateTime} from '../../services/dayTimeService';
import {doctorListData, remindData} from '../../services/renderData';
import {Rating} from '@kolking/react-native-rating';
import {
  clockIconSVG,
  examinationScheduleIconSVG,
  plusSVG,
} from '../../assets/svgXml';
import ToggleSwitch from 'toggle-switch-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface RenderReservedDoctor {
  name: string;
  department: string;
  location: string;
  rating: number;
  workFrom: string;
  workTo: string;
  img: any;
}

interface RenderReminder {
  title: string;
  des: string;
  icon: any;
  time: Array<string>;
}

const TaskListPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const today = getDateTime('day');
  useStatusBar('#19162E');
  const scrollViewRef = React.useRef<ScrollView>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWeek, setCurrentWeek] = React.useState<number>(Number(today));
  const itemWidth = 48;

  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        const timeout = setTimeout(() => {
          const xOffset = (currentWeek - 1) * itemWidth;
          scrollViewRef.current?.scrollTo({x: xOffset, animated: true});
        }, 0); // Set timeout to 0 to wait until the ScrollView has been rendered
        return () => clearTimeout(timeout);
      }
    }, [currentWeek, itemWidth]),
  );

  const [toggleStates, setToggleStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Handler function to toggle the state
  const handleToggle = (key: string) => {
    setToggleStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 15,
          width: vw(100),
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: '#19162E',
        }}></View>
      <ScrollView style={{paddingTop: vh(2)}}>
        <View style={{paddingHorizontal: vw(5)}}>
          <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
            {formattedDate}
          </Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          {days.map((day, i) => (
            <View
              key={i}
              style={[
                styles.dayBox,
                day === today ? {backgroundColor: '#96C1DE'} : {},
              ]}>
              <Text
                style={[
                  styles.dayText,
                  day === today ? {color: '#221E3D', fontWeight: '700'} : {},
                ]}>{`${day}`}</Text>
            </View>
          ))}
        </ScrollView>
        <View>
          {renderReservedDoctor(doctorListData[0], handleToggle, toggleStates)}
        </View>
        <View>{renderReminder(remindData, handleToggle, toggleStates)}</View>
        <View>{renderPregnancyExamination(navigation)}</View>
        <View>{renderTaskBox()}</View>
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
        }}>
        {plusSVG(vw(5), vw(5), '#FFFFFF')}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const renderTaskBox = () => {
  return (
    <View style={{width: vw(100), alignItems: 'center', marginBottom: 40}}>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 145,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            opacity: 0.2,
            position: 'absolute',
          }}
          source={require('../../assets/TaskList/taskBackGround.png')}
        />
        <View
          style={{
            width: '50%',
            height: '100%',
            paddingLeft: vw(5),
            justifyContent: 'center',
          }}>
          <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
            NHIỆM VỤ
          </Text>
          <Text style={{color: '#EAE1EE', fontSize: 14, fontWeight: '400'}}>
            Những đầu công việc bạn tự đặt ra trong việc chăm sóc mẹ và bé
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderPregnancyExamination = (
  navigation: NativeStackNavigationProp<any>,
) => {
  return (
    <View
      style={{
        width: vw(100),
        alignItems: 'center',
        marginTop: vh(2),
        marginBottom: vh(2),
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PregnancyExamination')}>
        <LinearGradient
          colors={['#B95649', '#FFDADAC7']}
          style={{
            width: '90%',
            height: 145,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: vw(5),
              width: '50%',
            }}>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              XÉT NGHIỆM KHÁM THAI
            </Text>
            <Text style={{color: '#EAE1EE', fontSize: 14}}>
              3 tam ca nguyệt
            </Text>
          </View>
          <Image
            style={{position: 'absolute', bottom: 0, right: '17%', zIndex: 2}}
            source={require('../../assets/TaskList/medicalHeart.png')}
          />
          <Image source={require('../../assets/TaskList/doctor.png')} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const renderReminder = (
  data: RenderReminder[],
  handleToggle: (key: string) => void,
  toggleStates: {[key: string]: boolean},
) => {
  return (
    <View
      style={{
        width: vw(100),
        alignItems: 'center',
        rowGap: vh(2),
        marginTop: vh(2),
      }}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            borderWidth: 1,
            borderColor: '#AD9AB5',
            width: '90%',
            padding: 10,
            borderRadius: 16,
            rowGap: vh(1),
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: vw(2),
                  alignItems: 'center',
                }}>
                {v.icon}
                <Text
                  style={{color: '#96C1DE', fontSize: 18, fontWeight: '700'}}>
                  {v.title}
                </Text>
              </View>
              <ToggleSwitch
                isOn={toggleStates[`reminderToggle_${i}`] || false}
                onColor="#EAE1EE"
                offColor="#EAE1EE"
                circleColor={'#221E3D'}
                onToggle={() => handleToggle(`reminderToggle_${i}`)}
                size="medium"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '400'}}>
                {v.des}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: vw(1),
              }}>
              {v.time.map((time, ind) => (
                <View
                  key={ind}
                  style={{
                    backgroundColor: '#997CBD',
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                  }}>
                  <Text style={{color: '#EAE1EE', fontSize: 18}}>{time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const renderReservedDoctor = (
  data: RenderReservedDoctor,
  handleToggle: (key: string) => void,
  toggleStates: {[key: string]: boolean},
) => {
  const doctorKey = 'doctorToggle_0';
  return (
    <View style={{paddingHorizontal: vw(5)}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', columnGap: vw(2)}}>
        <Image
          style={{width: 40, height: 40, resizeMode: 'contain'}}
          source={require('../../assets/WishList/father.png')}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#96C1DE', fontSize: 16, fontWeight: '700'}}>
            @bốcủakít
          </Text>
          <Text style={{color: '#CDCDCD', fontSize: 16, fontWeight: '700'}}>
            {' '}
            đã đặt khám
          </Text>
        </View>
      </View>
      <View style={{width: '100%', marginTop: vh(2)}}>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#AD9AB5',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            flexDirection: 'row',
            columnGap: vw(4),
          }}>
          <Image style={{zIndex: -1}} source={data.img} />
          <View style={{justifyContent: 'space-around'}}>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              {data.name}
            </Text>
            <Text style={styles.txtStyle}>
              {data.department} - {data.location}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(1),
              }}>
              <Rating size={20} rating={data.rating} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#CDCDCD',
                }}>{`${data.rating}`}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(2),
              }}>
              {clockIconSVG(vw(6), vh(3))}
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txtStyle}>{data.workFrom} am</Text>
                <Text style={styles.txtStyle}> - {data.workTo} pm</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#382E75',
          padding: 10,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          rowGap: vh(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', columnGap: vw(2)}}>
            {examinationScheduleIconSVG(vw(6), vh(3))}
            <Text style={{color: '#EAE1EE', fontSize: 16, fontWeight: '700'}}>
              Lịch khám:
            </Text>
          </View>
          <View>
            <ToggleSwitch
              isOn={toggleStates[doctorKey] || false}
              onColor="#221E3D"
              offColor="#221E3D"
              onToggle={() => handleToggle(doctorKey)}
              size="medium"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.examScheduleTxt}>Bác sĩ Trần Thái Linh</Text>
            <Text style={styles.examScheduleTxt}>XN sinh hóa</Text>
          </View>
          <View
            style={{
              backgroundColor: '#EAE1EE',
              paddingHorizontal: vw(2),
              paddingVertical: 5,
              borderRadius: 8,
            }}>
            <Text>16:30</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  scrollView: {
    paddingHorizontal: vw(2),
    paddingVertical: vh(2),
  },
  dayBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#322C56',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: vw(1),
  },
  dayText: {
    color: '#EAE1EE',
    fontSize: 18,
    fontWeight: '400',
  },
  txtStyle: {
    color: '#C1BED6',
    fontSize: 12,
    fontWeight: '400',
  },
  examScheduleTxt: {
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
  },
});
