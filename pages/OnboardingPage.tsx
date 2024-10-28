/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import carousel from '../data/carousel.json';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {vh, vw} from '../styles/stylesheet';
import {
  bathSVG,
  childSVG,
  momAndDoctorSVG,
  momAndchildSVG,
  yogaSVG,
} from '../assets/svgXml';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../services/customHook';

const {width} = Dimensions.get('window');
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

interface CarouselItems {
  title: string;
  icon: any;
  description: string;
}

const OnboardingPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const carouselListRef = React.useRef<FlatList<CarouselItems> | null>();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const renderItems: React.FC<{item: CarouselItems}> = ({item}) => {
    return (
      <View style={styles.flatliststyle}>
        <Image source={require('../assets/MamaMate.png')} />
        <Text style={styles.titleText}>{item.title}</Text>
        <Image source={require('../assets/heart.png')} />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const onViewRef = React.useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });
  const renderContent = () => {
    switch (currentIndex) {
      case 1:
        return (
          <View style={styles.momAndchild}>
            {momAndchildSVG(vw(50), vh(30))}
          </View>
        );
      case 2:
        return <View style={styles.yoga}>{yogaSVG(vw(90), vh(30))}</View>;
      case 3:
        return <View style={styles.bath}>{bathSVG(vw(90), vh(35))}</View>;
      case 4:
        return <View style={styles.child}>{childSVG(vw(100), vh(37))}</View>;
      default:
        return <View>{momAndDoctorSVG(vw(80), vh(20))}</View>;
    }
  };

  useStatusBar('#AF90D6');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperview}>{renderContent()}</View>
      <View style={styles.lowerview}>
        <FlatList
          horizontal
          data={carousel}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
          ref={ref => {
            carouselListRef.current = ref;
          }}
          style={styles.carousel}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
        />
        <View style={styles.discardView}>
          <View style={styles.pagging}>
            {carousel.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.circle,
                  {backgroundColor: i === currentIndex ? 'white' : 'grey'},
                ]}
              />
            ))}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Question')}>
            <Text style={styles.discardTxt}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AF90D6',
  },
  upperview: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width,
    zIndex: 2,
  },
  lowerview: {
    flex: 1.4,
    alignItems: 'center',
    backgroundColor: '#221E3D',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
  },
  flatliststyle: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    rowGap: 16,
    width: width,
    paddingHorizontal: 40,
    marginTop: vh(12),
  },
  carousel: {
    height: 130,
  },
  titleText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  pagging: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },
  discardView: {
    marginBottom: 50,
  },
  discardTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: '#A0A0A0',
  },

  momAndchild: {
    position: 'relative',
    top: vh(8),
  },
  yoga: {
    position: 'relative',
    top: vh(8),
  },
  bath: {
    position: 'relative',
    top: vh(8),
  },
  child: {
    position: 'absolute',
    top: 0,
    width: width,
    height: vh(40),
  },
});

export default OnboardingPage;
