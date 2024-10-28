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
import useStatusBar from '../services/customHook';
import {vh, vw} from '../styles/stylesheet';
import {getTrackingImageSource} from '../services/imageHelper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getDateTime} from '../services/dayTimeService';
import {loadData} from '../data/storage';
import {DiaryEntry} from '../services/typeProps';
import {getDiaryWeekData} from '../services/renderData';

interface TrackingFieldModel {
  img: string;
  label: string;
  onPress?: () => void;
}

const TrackingPage = () => {
  useStatusBar('#221E3D');
  const today = getDateTime('day');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [moodIndex, setMoodIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const loadedData = await loadData<DiaryEntry[]>('diaryWeekData');
        if (loadedData) {
          const todayIndex = loadedData.findIndex(
            item => Number(item.date) === Number(today.toLocaleString()),
          );
          setMoodIndex(todayIndex);
        } else {
          const initialData = getDiaryWeekData();
          const todayIndex = initialData.findIndex(
            item => Number(item.date) === Number(today.toLocaleString()),
          );
          setMoodIndex(todayIndex);
        }
      } catch (error) {
        const initialData = getDiaryWeekData();
        const todayIndex = initialData.findIndex(
          item => Number(item.date) === Number(today.toLocaleString()),
        );
        setMoodIndex(todayIndex);
      }
    };

    loadDataFromStorage();
  }, [today]);

  const handleNavigation = (page: string) => {
    navigation.navigate(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titleTxT}>Bộ đo</Text>
        <View style={styles.trackingTopField}>
          <TrackingField
            img="weight"
            label="Cân nặng"
            onPress={() =>
              navigation.navigate('WeightTracking', {
                updateItemIndex: moodIndex,
              })
            }
          />
          <TrackingField
            img="belly"
            label="Vòng bụng"
            onPress={() =>
              navigation.navigate('BellySize', {updateItemIndex: moodIndex})
            }
          />
          <TrackingField
            img="smilingFace"
            label="Tinh thần"
            onPress={() => navigation.navigate('Mood')}
          />
        </View>
        <View style={styles.gradientFieldContainer}>
          <LinearGradient
            style={styles.gradientField}
            colors={['#96C1DE', '#081E2A']}>
            <View style={styles.gradientFieldImgContainer}>
              <Image source={require('../assets/pregnancyandHeart.png')} />
            </View>
            <View style={styles.gradientFieldTxTContainer}>
              <Text style={styles.gradientFieldTxTAlbum}>Album ảnh</Text>
              <Text style={styles.gradientFieldTxTDes}>
                Hãy tạo một danh sách những điều bạn muốn thực hiện và chia sẻ
                cùng người đồng hành nhé
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.trackingTopField}>
          <TrackingField
            img="hambarger"
            label="Bữa ăn"
            onPress={() => handleNavigation('Meal')}
          />
          <TrackingField img="medicalTool" label="Bệnh án" />
          <TrackingField
            img="identityCard"
            label="Cẩm nang"
            onPress={() => handleNavigation('HandBook')}
          />
        </View>
        <TouchableOpacity
          style={styles.gradientFieldContainer}
          onPress={() => {
            navigation.navigate('WishList');
          }}>
          <LinearGradient
            style={styles.gradientField}
            colors={['#081E2A', '#96C1DE']}>
            <View style={[styles.gradientFieldTxTContainer, {width: vw(55)}]}>
              <Text
                style={[
                  styles.gradientFieldTxTAlbum,
                  {textAlign: 'left', paddingLeft: vw(2)},
                ]}>
                Danh sách ước muốn
              </Text>
              <Text
                style={[
                  styles.gradientFieldTxTDes,
                  {textAlign: 'left', paddingLeft: vw(2)},
                ]}>
                Hãy tạo một danh sách những điều bạn muốn thực hiện và chia sẻ
                cùng người đồng hành nhé
              </Text>
            </View>
            <View
              style={[
                styles.gradientFieldImgContainer,
                {width: vw(35), alignItems: 'flex-end'},
              ]}>
              <Image source={require('../assets/hashtagAndHeart.png')} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.trackingTopField}>
          <TouchableOpacity
            style={styles.trackingFieldContainer}
            onPress={() => handleNavigation('ChildMovement')}>
            <LinearGradient
              colors={['#AF90D6', '#5C4B70']}
              style={[
                styles.trackingFieldImgContainer,
                {
                  flexDirection: 'row',
                  width: vw(55),
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                },
              ]}>
              <Image source={require('../assets/insideChild.png')} />
              <Image source={require('../assets/clock.png')} />
            </LinearGradient>
            <Text style={styles.trackingFieldTxT}>Chuyển động của bé</Text>
          </TouchableOpacity>
          <TrackingField
            img="contractions"
            label="Cơn gò"
            onPress={() => handleNavigation('Contractions')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TrackingField: React.FC<TrackingFieldModel> = ({img, label, onPress}) => {
  return (
    <TouchableOpacity style={styles.trackingFieldContainer} onPress={onPress}>
      <LinearGradient
        colors={['#AF90D6', '#5C4B70']}
        style={styles.trackingFieldImgContainer}>
        <Image source={getTrackingImageSource(img)} />
      </LinearGradient>
      <Text style={styles.trackingFieldTxT}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TrackingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
    paddingTop: vh(2),
  },
  titleTxT: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: vh(3),
  },
  trackingFieldContainer: {
    alignSelf: 'auto',
    alignItems: 'center',
  },
  trackingFieldImgContainer: {
    height: 87,
    width: 87,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  trackingFieldTxT: {
    color: '#EAE1EE',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  trackingTopField: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(100),
  },
  gradientField: {
    height: 145,
    width: vw(90),
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  gradientFieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vh(2),
  },
  gradientFieldImgContainer: {
    width: vw(40),
  },
  gradientFieldTxTContainer: {
    width: vw(50),
    paddingRight: vw(3),
    justifyContent: 'center',
    rowGap: vh(1),
  },
  gradientFieldTxTAlbum: {
    textAlign: 'right',
    color: '#EAE1EE',
    fontSize: 18,
    fontWeight: '700',
  },
  gradientFieldTxTDes: {
    textAlign: 'right',
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
  },
});
