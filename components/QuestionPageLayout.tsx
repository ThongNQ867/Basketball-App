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
import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getImageSource} from '../services/imageHelper';
import {vh, vw} from '../styles/stylesheet';
import {backIconSVG} from '../assets/svgXml';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

interface RenderLayout {
  image: string;
  title: string;
  CustomView?: ReactNode;
  isDiscard?: boolean;
  // Get the user's choice => can be null
  value?: number;
  // Name of navigation page
  nextPage: string;
  supportFucntion?: () => void;
}

const QuestionPageLayout: React.FC<RenderLayout> = ({
  image,
  title,
  CustomView,
  isDiscard,
  value = -1,
  nextPage,
  supportFucntion,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePagination = () => {
    supportFucntion && supportFucntion();
    if (value === -1) {
    }

    if (value && value > 0 && value <= 4) {
      navigation.navigate(nextPage, {value});
    }

    if (value === 5) {
      navigation.navigate(nextPage);
    }
  };

  const handleDiscardPagination = () => {
    navigation.navigate(nextPage);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.upperview}>
          <TouchableOpacity
            style={styles.backBtnOpa}
            onPress={() => {
              navigation.goBack();
            }}>
            {backIconSVG(vh(6), vw(6))}
          </TouchableOpacity>
          <View style={styles.titleImgContainer}>
            <Image
              style={{width: vw(35), height: vw(35), resizeMode: 'contain'}}
              source={getImageSource(image)}
            />
          </View>
        </View>
        <View style={styles.lowerview}>
          <ScrollView>
            <View style={styles.bottomGrp}>
              <Text style={styles.titleTxt}>{title}</Text>
            </View>
            <View style={styles.mainContent}>{CustomView}</View>
          </ScrollView>
          <View style={styles.btnGrp}>
            {isDiscard === true ? (
              <TouchableOpacity
                style={styles.disBtn}
                onPress={handleDiscardPagination}>
                <Text style={styles.disBtnTxt}>Bỏ qua</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {(value && value > 0) || value === -1 ? (
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handlePagination}>
                <Text style={styles.nextBtnTxt}>Tiếp theo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.nextBtn, {backgroundColor: 'gray'}]}
                disabled>
                <Text style={styles.nextBtnTxt}>Tiếp theo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#AF90D6',
  },

  upperview: {
    alignItems: 'flex-start',
    height: vh(16),
  },
  lowerview: {
    height: height - vh(16),
    alignItems: 'center',
    backgroundColor: '#221E3D',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
  },
  btnGrp: {
    width: width,
    backgroundColor: '#221E3D',
    alignItems: 'center',
    paddingBottom: vh(5),
    rowGap: vh(1),
  },
  bottomGrp: {
    alignItems: 'center',
    marginTop: vh(10),
  },
  titleImgContainer: {
    position: 'relative',
    top: vh(5),
    width: width,
    alignItems: 'center',
    zIndex: 1,
  },
  backBtnOpa: {
    zIndex: 2,
    position: 'relative',
    left: vw(5),
    top: vh(5),
  },
  titleTxt: {
    width: width,
    fontSize: 20,
    color: '#E5CFEF',
    textAlign: 'center',
    paddingVertical: vh(2),
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    fontWeight: '800',
    borderBottomColor: '#3E3C62C4',
  },
  mainContent: {
    marginTop: vh(5),
    width: width,
  },
  disBtn: {
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5CFEF',
  },
  nextBtn: {
    backgroundColor: '#E5CFEF',
    height: 54,
    width: 315,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E5CFEF',
  },
  nextBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#221E3D',
  },
});

export default QuestionPageLayout;
