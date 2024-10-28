/* eslint-disable prettier/prettier */
import React from 'react';
import QuestionPageLayout from '../components/QuestionPageLayout';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import useStatusBar from '../services/customHook';
import {QuestionPageData} from '../services/typeProps';
import {loadData, updateData} from '../data/storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('screen');

const MenstrualcyclePage = () => {
  useStatusBar('#AF90D6');
  const [amount, setAmount] = React.useState({first: 0, second: 0});

  const getCombinedValue = (num1: number, num2: number) => {
    return `${num1}${num2}`;
  };

  const fetchData = async () => {
    try {
      const data: QuestionPageData = await loadData('questionData');
      data.averageMenstrualCycle = Number(
        getCombinedValue(amount.first, amount.second),
      );
      await updateData('questionData', data)
        .then(() => {
          console.log('update success');
        })
        .catch((err: any) => {
          console.warn(err.message);
        });
    } catch (error) {
      console.error('Failed to load question data', error);
    }
  };

  const handleChange = (isFirst: boolean) => {
    setAmount(prevAmount => {
      const newValue = isFirst ? prevAmount.first : prevAmount.second;
      const updatedValue = newValue === 9 ? 0 : newValue + 1;
      return isFirst
        ? {...prevAmount, first: updatedValue}
        : {...prevAmount, second: updatedValue};
    });
  };

  const renderView = () => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.inputDay}
          onPress={() => handleChange(true)}>
          <Text style={styles.chosendayTxt}>{amount.first}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputDay}
          onPress={() => handleChange(false)}>
          <Text style={styles.chosendayTxt}> {amount.second}</Text>
        </TouchableOpacity>
        <Text style={styles.dayTxt}>ngày</Text>
      </SafeAreaView>
    );
  };

  return (
    <QuestionPageLayout
      image="pillow"
      title="Chu kỳ kinh nguyệt trung bình?"
      CustomView={renderView()}
      isDiscard={true}
      value={5}
      nextPage="Medicalhistory"
      supportFucntion={fetchData}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    width: width,
  },
  dayTxt: {
    color: '#E5CFEF',
    fontWeight: '400',
    fontSize: 18,
  },
  inputDay: {
    flexDirection: 'row',
    height: 70,
    columnGap: 10,
  },
  chosendayTxt: {
    width: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5CFEF',
    color: '#E5CFEF',
    fontWeight: '400',
    textAlignVertical: 'center',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MenstrualcyclePage;
