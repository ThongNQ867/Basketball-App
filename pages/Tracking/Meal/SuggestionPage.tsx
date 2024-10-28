/* eslint-disable prettier/prettier */
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from 'react-native-paper';
import useStatusBar from '../../../services/customHook';
import {vh, vw} from '../../../styles/stylesheet';
import {nextIconSVG, searchingSVG} from '../../../assets/svgXml';

import LinearGradient from 'react-native-linear-gradient';
import {suggestionRenderData} from '../../../data/meal/suggestionData';
import {mealSuggestionData, tabsData} from '../../../services/renderData';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TabsMealSuggestionComponent from '../../../components/TabsMealSuggestionConponent';

interface BottomTabsData {
  icon: ImageSourcePropType;
  label: string;
}

interface RenderBottomTabsData {
  data: BottomTabsData[];
}

const SuggestionPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [searchQuery, setSearchQuery] = React.useState('');
  useStatusBar('#19162E');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchingContainer}>
        <Searchbar
          style={styles.textInput}
          icon={() => searchingSVG(vw(5), vh(5))}
          placeholder="Tìm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={'#CDCDCD'}
        />
      </View>
      <ScrollView>
        <View>{renderTabs(navigation)}</View>
        <View style={styles.infoGrp}>
          <View style={styles.milkGrp}>
            <View style={styles.milkGrpTxTContainer}>
              <Text style={styles.milkGrpTxT}>
                Sữa và các sản phẩm từ sữa là nguồn cung cấp canxi hoàn hảo cho
                mẹ bầu tuần 16 - 17, ngoài ra mẹ bầu có thể dùng nhiều loại trái
                cây, nước cam.
              </Text>
            </View>
            <View style={styles.milkGrpImg}>
              <Image source={require('../../../assets/Meal/milk.png')} />
            </View>
          </View>
          <View style={styles.sugestionGrp}>
            <View style={styles.sugestionGrpLeft}>
              <Image source={require('../../../assets/Meal/note.png')} />
              <Text style={styles.sugestionTxT}>Gợi ý dành riêng cho mẹ</Text>
            </View>
            {nextIconSVG(vw(3), vh(2), '#AF90D6')}
          </View>
          <TabsMealSuggestionComponent
            suggestionRenderData={suggestionRenderData}
          />
          <View style={styles.sugestionGrp}>
            <View style={styles.sugestionGrpLeft}>
              <Image
                source={require('../../../assets/Meal/fullSittingYoga.png')}
              />
              <Text style={styles.sugestionTxT}>Vận động</Text>
            </View>
            {nextIconSVG(vw(3), vh(2), '#AF90D6')}
          </View>
          <View style={styles.yogaGrp}>
            <View style={styles.yogaGrpTxTContainer}>
              <Text style={styles.yogaGrpTxT}>
                Các bài tập nhẹ như Yoga, Pilates, rất quan trọng để giữ cho bản
                thân khỏe mạnh
              </Text>
            </View>
            <View style={styles.yogaGrpImg}>
              <Image source={require('../../../assets/Meal/sittingYoga.png')} />
            </View>
          </View>
          {renderBottomTabs({data: mealSuggestionData})}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderTabs = (navigation: NativeStackNavigationProp<any>) => {
  return (
    <View style={styles.tabsContainer}>
      {tabsData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabItem}
          onPress={() =>
            navigation.navigate('SuggestionTab', {label: item.label})
          }>
          <LinearGradient
            colors={['#AF90D6', '#5C4B70']}
            style={styles.tabIconWrapper}>
            <Image source={item.icon} style={styles.tabIcon} />
          </LinearGradient>
          <Text style={styles.tabLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const renderBottomTabs = ({data}: RenderBottomTabsData) => {
  return (
    <ScrollView horizontal style={styles.bottomTabsGrp}>
      {data.map((v, i) => (
        <View key={i} style={styles.bottomTabsItem}>
          <Image style={styles.bottomTabsImg} source={v.icon} />
          <Text style={styles.bottomTabsTxT}>{v.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default SuggestionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingContainer: {
    height: 80,
    width: vw(100),
    backgroundColor: '#19162E',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
  },
  textInput: {
    width: vw(90),
    backgroundColor: '#493E904D',
  },
  tabsContainer: {
    marginTop: vh(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tabItem: {
    width: vw(20),
    alignItems: 'center',
    marginBottom: 20,
  },
  tabIconWrapper: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  tabIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  infoGrp: {
    width: vw(100),
    alignItems: 'center',
    rowGap: vh(2),
  },
  milkGrp: {
    width: vw(90),
    height: 116,
    backgroundColor: '#AF90D63B',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  milkGrpTxT: {
    color: '#EAE1EE',
    fontWeight: '400',
    fontSize: 14,
  },
  milkGrpImg: {
    width: vw(25),
    alignItems: 'flex-end',
  },
  milkGrpTxTContainer: {
    width: vw(65),
    justifyContent: 'center',
    paddingLeft: vw(3),
  },
  sugestionGrp: {
    flexDirection: 'row',
    width: vw(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(7),
  },
  sugestionGrpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(2),
  },
  sugestionTxT: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  suggestionItem: {
    flexDirection: 'row',
    width: vw(90),
    backgroundColor: '#EAE1EE',
    borderRadius: 16,
    padding: vh(2),
    alignItems: 'center',
  },
  suggestionImage: {
    width: vw(20),
    height: vw(20),
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: vw(3),
  },
  suggestionTextContainer: {
    flex: 1,
    rowGap: vh(1),
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionKcal: {
    fontSize: 14,
    color: '#555555',
  },
  suggestionCapacity: {
    fontSize: 14,
    color: '#555555',
  },
  suggestionKcalContainer: {
    flexDirection: 'row',
    columnGap: vw(2),
    alignItems: 'center',
  },
  suggestionImageCatergory: {
    width: vw(4),
    height: vw(4),
    resizeMode: 'cover',
  },
  checkXGrp: {
    flexDirection: 'row',
    columnGap: vw(8),
  },
  checkXGrpItem: {
    flexDirection: 'row',
    alignSelf: 'auto',
    alignItems: 'center',
    columnGap: vw(2),
  },
  suggestionTitleSVGGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(3),
  },
  suggestionTitleGrp: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  yogaGrp: {
    width: vw(90),
    height: 83,
    backgroundColor: '#E56877',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  yogaGrpTxTContainer: {
    width: vw(65),
    justifyContent: 'center',
    paddingLeft: vw(2),
  },
  yogaGrpImg: {
    width: vw(25),
    alignItems: 'flex-end',
  },
  yogaGrpTxT: {
    color: '#EAE1EE',
    fontWeight: '400',
    fontSize: 14,
  },
  bottomTabsGrp: {
    flexDirection: 'row',
    marginBottom: vh(3),
    marginHorizontal: vw(5),
  },
  bottomTabsItem: {
    height: 140,
    width: 130,
    backgroundColor: '#A283C833',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
  },
  bottomTabsImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bottomTabsTxT: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
  },
});
