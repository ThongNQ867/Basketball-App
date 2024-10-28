/* eslint-disable prettier/prettier */
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import QuestionPageLayout from '../components/QuestionPageLayout';
import {getTitleSource} from '../services/imageHelper';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../services/customHook';
import {QuestionPageData} from '../services/typeProps';
import {loadData, updateData} from '../data/storage';
import DatePicker from 'react-native-date-picker';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('screen');

type MethodInputParams = {
  value: number;
};

type RootStackParamList = {
  MethodInput: MethodInputParams;
};

const MethodinputPage = () => {
  useStatusBar('#AF90D6');
  const route = useRoute<RouteProp<RootStackParamList, 'MethodInput'>>();
  const {value} = route.params;
  const [open, setOpen] = React.useState(false);

  const [date, setDate] = React.useState(new Date());

  const fetchData = async () => {
    try {
      const data: QuestionPageData = await loadData('questionData');
      data.calculateValue = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      await updateData('questionData', data)
        .then()
        .catch(error => {
          console.error('Failed to update question data', error);
        });
    } catch (error) {
      console.error('Failed to load question data', error);
    }
  };

  const handleOpenDatePicker = () => {
    setOpen(true);
  };

  const renderView = () => {
    return value !== 3 ? (
      <SafeAreaView style={styles.container}>
        <View style={styles.columnStyle}>
          <Text style={styles.inputTxt}>Ngày</Text>
          <View>
            <TouchableOpacity
              style={styles.btnOpacity}
              onPress={handleOpenDatePicker}>
              <Text style={styles.timeTxt}>{date.getDate()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.dashed}>-</Text>
        <View style={styles.columnStyle}>
          <Text style={styles.inputTxt}>Tháng</Text>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={handleOpenDatePicker}>
            <Text style={styles.timeTxt}>{date.getMonth() + 1}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dashed}>-</Text>
        <View style={styles.columnStyle}>
          <Text style={styles.inputTxt}>Năm</Text>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={handleOpenDatePicker}>
            <Text style={styles.timeTxt}>{date.getFullYear()}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          mode="date"
          locale="vi"
          date={date}
          onConfirm={datet => {
            setOpen(false);
            setDate(datet);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SafeAreaView>
    ) : (
      <View>
        <Text>For 3 only</Text>
      </View>
    );
  };

  return (
    <QuestionPageLayout
      image="sanitaryNapkin"
      title={`${getTitleSource(value)}?`}
      CustomView={renderView()}
      isDiscard={false}
      value={5}
      nextPage="Menstrualcycle"
      supportFucntion={fetchData}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width,
    alignItems: 'center',
    marginTop: 30,
  },
  inputTxt: {
    color: '#AF90D6',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
  },
  btnOpacity: {
    borderWidth: 1,
    borderColor: '#E5CFEF',
    height: 70,
    width: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTxt: {
    color: '#E5CFEF',
    fontSize: 18,
    fontWeight: '400',
  },
  dashed: {
    color: '#E5CFEF',
    position: 'relative',
    top: 15,
  },
  columnStyle: {
    rowGap: 13,
  },
});

export default MethodinputPage;
