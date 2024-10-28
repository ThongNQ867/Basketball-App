/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CalendarList} from 'react-native-calendars';
import LocaleConfig from '../services/localeConfig';
import useStatusBar from '../services/customHook';
import {vh, vw} from '../styles/stylesheet';
import WeekContentComponent from '../components/WeekContentComponent';
import {loadData, saveData} from '../data/storage';
import {DiaryEntry} from '../services/typeProps';
import {getDiaryWeekData} from '../services/renderData';
import {useFocusEffect} from '@react-navigation/native';

const DiaryPage: React.FC = () => {
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const [data, setData] = React.useState<DiaryEntry[]>([]);
  const [isMonth, setIsMonth] = React.useState<boolean>(false);
  const current = 16;
  const itemWidth = 44;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWeek, setCurrentWeek] = React.useState<number>(16);
  const scrollViewRef = React.useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (!isMonth && scrollViewRef.current) {
        const xOffset = (currentWeek - 1) * itemWidth;
        scrollViewRef.current.scrollTo({x: xOffset, animated: true});
      }
    }, [isMonth, currentWeek]),
  );

  useFocusEffect(
    React.useCallback(() => {
      setIsMonth(false);
    }, []),
  );

  useStatusBar('#19162E');

  React.useEffect(() => {
    LocaleConfig;
  }, []);

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      saveData('diaryWeekData', data);
    }
  }, [data]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.diaryMode}>
        <View style={styles.switchMode}>
          <ModeButton
            isActive={!isMonth}
            onPress={() => setIsMonth(false)}
            title="Tuần"
            position="left"
          />
          <ModeButton
            isActive={isMonth}
            onPress={() => setIsMonth(true)}
            title="Tháng"
            position="right"
          />
        </View>
        {isMonth ? (
          <View style={styles.daysOfMonth}>
            {weekDays.map((day, index) => (
              <DayOfWeek key={index} day={day} />
            ))}
          </View>
        ) : (
          <ScrollView horizontal ref={scrollViewRef}>
            {Array.from({length: 41}, (_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.currentWeekGrp,
                  index + 1 === current ? {backgroundColor: '#AA3A3A'} : {},
                ]}
                disabled>
                <Text
                  style={[
                    styles.currentWeekGrpTxt,
                    index + 1 !== current ? {color: '#8B8B8B'} : {},
                  ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={{flex: 1}}>
        {!isMonth ? (
          <View style={{paddingTop: vh(1)}}>
            <WeekContentComponent />
          </View>
        ) : (
          <CalendarRender />
        )}
      </View>
    </SafeAreaView>
  );
};

const CalendarRender = () => {
  const today = new Date().toISOString().split('T')[0];

  function getCurrentWeekDatesFormatted(): string[] {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const datesOfCurrentWeekFormatted = [];

    // Calculate the date of the last Sunday
    const lastSunday = new Date(currentDate);
    lastSunday.setDate(currentDate.getDate() - currentDayOfWeek);

    // Loop to get all dates from Sunday to Saturday
    for (let i = 0; i < 7; i++) {
      const day = new Date(lastSunday);
      day.setDate(lastSunday.getDate() + i);
      // Format the date as 'YYYY-MM-DD'
      const formattedDate = day.toISOString().split('T')[0];
      datesOfCurrentWeekFormatted.push(formattedDate);
    }

    return datesOfCurrentWeekFormatted;
  }

  const arr = getCurrentWeekDatesFormatted();

  const markedDates = arr.reduce((acc: any, date: string, index: number) => {
    const isSunday = new Date(date).getDay() === 0; // Check if the date is Sunday
    acc[date] = {
      color: date === today ? '#FFFFFF' : '#AF90D6', // Set color to white if date is today, else use default color
      ...(index === 0 && {startingDay: true}), // Add startingDay property for the first date
      ...(index === arr.length - 1 && {endingDay: true}), // Add endingDay property for the last date
      ...(isSunday && {text: '16'}), // Add the week number for Sundays
    };
    return acc;
  }, {});

  return (
    <CalendarList
      theme={{
        calendarBackground: '#221E3D',
        dayTextColor: '#ffffff',
        todayTextColor: '#221E3D',
        textMonthFontWeight: '800',
        monthTextColor: '#96C1DE',
        textMonthFontSize: 18,
        textDayFontSize: 18,
        textDayFontWeight: '400',
      }}
      firstDay={1}
      markedDates={markedDates}
      current={today}
      markingType="period"
    />
  );
};

interface ModeButtonProps {
  isActive: boolean;
  onPress: () => void;
  title: string;
  position: 'left' | 'right';
}

const ModeButton: React.FC<ModeButtonProps> = React.memo(
  ({isActive, onPress, title, position}) => (
    <TouchableOpacity
      style={[
        styles.modeBtn,
        isActive && {
          backgroundColor: '#96C1DE',
          borderTopStartRadius: position === 'left' ? 20 : 0,
          borderBottomStartRadius: position === 'left' ? 20 : 0,
          borderTopEndRadius: position === 'right' ? 20 : 0,
          borderBottomEndRadius: position === 'right' ? 20 : 0,
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.modeTxt,
          isActive
            ? {fontWeight: '700', fontSize: 18, color: '#221E3D'}
            : {fontWeight: '400', fontSize: 18, color: '#96C1DE'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  ),
);

interface DayOfWeekProps {
  day: string;
}

const DayOfWeek: React.FC<DayOfWeekProps> = React.memo(({day}) => (
  <View>
    <Text style={styles.daysOfMonthTxt}>{day}</Text>
  </View>
));

export default DiaryPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221E3D',
    flex: 1,
  },
  diaryMode: {
    backgroundColor: '#19162E',
    height: 130,
    overflow: 'hidden',
    paddingHorizontal: vw(3),
    paddingTop: vh(2),
    rowGap: vh(1),
  },
  switchMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  daysOfMonth: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modeBtn: {
    height: vh(5),
    width: 100,
    justifyContent: 'center',
  },
  modeTxt: {
    textAlign: 'center',
  },
  daysOfMonthTxt: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 18,
    height: 44,
    textAlignVertical: 'center',
  },
  currentWeekGrp: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginRight: vw(2),
    backgroundColor: '#322C56',
  },
  currentWeekGrpTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
});
