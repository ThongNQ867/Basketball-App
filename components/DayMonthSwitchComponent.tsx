/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {vh, vw} from '../styles/stylesheet';
import {useFocusEffect} from '@react-navigation/native';

interface ModeButtonProps {
  isActive: boolean;
  onPress: () => void;
  title: string;
  position: 'left' | 'right';
}

interface DayMonthSwitchComponentProps {
  isMonth: boolean;
  setIsMonth: (isMonth: boolean) => void;
  current: number;
  onSelectWeek: (week: number) => void;
}

const DayMonthSwitchComponent: React.FC<DayMonthSwitchComponentProps> = ({
  isMonth,
  setIsMonth,
  current,
  onSelectWeek,
}) => {
  const [isSelected, setIsSelected] = React.useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWeek, setCurrentWeek] = React.useState<number>(16);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const itemWidth = 44 + vw(1);

  useFocusEffect(
    React.useCallback(() => {
      if (!isMonth && scrollViewRef.current) {
        const xOffset = (currentWeek - 1) * itemWidth;
        scrollViewRef.current.scrollTo({x: xOffset, animated: true});
      }
    }, [isMonth, currentWeek, scrollViewRef, itemWidth]),
  );

  return (
    <SafeAreaView>
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
          <></>
        ) : (
          <ScrollView horizontal ref={scrollViewRef}>
            {Array.from({length: 41}, (_, index) => {
              const weekNumber = index + 1;
              const isDisabled = weekNumber > current;

              return (
                <TouchableOpacity
                  onPress={() => {
                    !isDisabled && onSelectWeek(weekNumber);
                    setIsSelected(weekNumber);
                  }}
                  key={index}
                  disabled={isDisabled}
                  style={[
                    styles.currentWeekGrp,
                    weekNumber === current
                      ? {
                          backgroundColor: '#AA3A3A',
                        }
                      : {},
                    isDisabled
                      ? {
                          opacity: 0.5,
                        }
                      : {},
                    isSelected === index + 1 && current !== index + 1
                      ? {backgroundColor: 'white'}
                      : {},
                  ]}>
                  <Text
                    style={[
                      styles.currentWeekGrpTxt,
                      isDisabled ? {color: '#888'} : {},
                      isSelected === index + 1 && current !== index + 1
                        ? {color: '#221E3D'}
                        : {},
                    ]}>
                    {weekNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

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

export default DayMonthSwitchComponent;

const styles = StyleSheet.create({
  diaryMode: {
    overflow: 'hidden',
    paddingHorizontal: vw(3),
    paddingVertical: vh(2),
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
