/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ComponentRest1 from '../components/ComponentRest1';
import ComponentRest2 from '../components/ComponentRest2';
import ComponentRest3 from '../components/ComponentRest3';
import ComponentRest4 from '../components/ComponentRest4';
import {vh, vw} from '../styles/stylesheet';
import {backIconSVG} from '../assets/svgXml';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../services/customHook';
import {loadData} from '../data/storage';
import {QuestionPageData} from '../services/typeProps';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {width, height} = Dimensions.get('window');

const RestScreenPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  const [firstDate, setFirstDate] = React.useState(new Date());
  const [expectedDateOfBirth, setExpectedDateOfBirth] =
    React.useState<Date | null>(null);

  const handlePagination = () => {
    if (layoutIndex < 4) {
      setLayoutIndex(pre => pre + 1);
    } else {
      navigation.navigate('RestScreenLast');
    }
  };

  const convertToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data: QuestionPageData = await loadData('questionData');
        setFirstDate(convertToDate(data.calculateValue));
      } catch (error) {
        console.error('Failed to load question data', error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (firstDate) {
      const newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + 7); // Add 7 days
      newDate.setMonth(newDate.getMonth() + 9); // Add 9 months
      setExpectedDateOfBirth(newDate);
    }
  }, [firstDate]);

  const renderItem = () => {
    switch (layoutIndex) {
      case 1:
        return <ComponentRest1 expectedDateOfBirth={expectedDateOfBirth} />;
      case 2:
        return <ComponentRest2 />;
      case 3:
        return <ComponentRest3 />;
      case 4:
        return <ComponentRest4 />;
    }
  };
  useStatusBar('#96C1DE');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{height: '80%', width: vw(100)}}>
        <View style={styles.upperview}>
          {layoutIndex === 1 ? (
            <View style={styles.imageHalf}>
              <Image source={require('../assets/halfTimetable.png')} />
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.backBtnOpa}
            onPress={() => {
              if (layoutIndex > 1) {
                setLayoutIndex(pre => pre - 1);
              } else {
                navigation.goBack();
              }
            }}>
            {backIconSVG(vw(6), vh(6))}
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>{renderItem()}</View>
      </ScrollView>

      <View style={styles.btnGrp}>
        {layoutIndex === 1 ? (
          <TouchableOpacity style={styles.disBtn}>
            <Text style={styles.disBtnTxt}>Tính lại</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disBtn}>
            <Text style={styles.disBtnTxt}>Bỏ qua</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextBtn} onPress={handlePagination}>
          <Text style={styles.nextBtnTxt}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96C1DE',
    width: width,
  },
  imageHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  upperview: {
    alignItems: 'flex-start',
    // height: '20%',
  },
  mainContent: {
    paddingTop: vh(6),
    // height: '80%',
    width: vw(100),
    alignItems: 'center',
  },
  backBtnOpa: {
    zIndex: 1,
    position: 'relative',
    top: vh(3),
    left: vw(8),
  },
  btnGrp: {
    height: '20%',
    width: width,
    alignItems: 'center',
    rowGap: vh(1),
  },
  disBtn: {
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#221E3D',
  },
  nextBtn: {
    backgroundColor: '#221E3D',
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disBtnTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#221E3D',
  },
  nextBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#96C1DE',
  },
});

export default RestScreenPage;
