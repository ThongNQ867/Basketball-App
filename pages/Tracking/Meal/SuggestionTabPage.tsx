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
import {RouteProp} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import useStatusBar from '../../../services/customHook';
import {searchingSVG} from '../../../assets/svgXml';
import {vh, vw} from '../../../styles/stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {tabsData} from '../../../services/renderData';
import {mealCautionData} from '../../../services/renderData';
import {fruitData} from '../../../services/renderData';
import TabsMealSuggestionComponent from '../../../components/TabsMealSuggestionConponent';

type RootStackParamList = {
  SuggestionTab: {label: string};
};

type SuggestionTabRouteProp = RouteProp<RootStackParamList, 'SuggestionTab'>;

type Props = {
  route: SuggestionTabRouteProp;
};
interface BottomCautionData {
  icon: any;
  label: string;
}

interface RenderBottomCautionData {
  data: BottomCautionData[];
}

const SuggestionTabPage: React.FC<Props> = ({route}) => {
  const {label} = route.params;
  const [currentLabel, setCurrentLabel] = React.useState<string>(label);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [renderData, setRenderData] = React.useState<any>([]);
  useStatusBar('#19162E');

  React.useEffect(() => {
    setRenderData(fruitData);
  }, []);

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
        {renderTabs(currentLabel, setCurrentLabel)}
      </View>
      <ScrollView>
        {renderCaution({data: mealCautionData})}
        <View
          style={{width: vw(100), alignItems: 'center', marginVertical: vh(1)}}>
          <TabsMealSuggestionComponent suggestionRenderData={renderData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderTabs = (
  label: string,
  setLabel: React.Dispatch<React.SetStateAction<string>>,
) => {
  return (
    <ScrollView horizontal style={styles.tabsContainer}>
      {tabsData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabItem}
          onPress={() => setLabel(item.label)}>
          {label === item.label ? (
            <View style={[styles.tabIconWrapper, {backgroundColor: '#FFC42C'}]}>
              <Image source={item.icon} style={styles.tabIcon} />
            </View>
          ) : (
            <LinearGradient
              colors={['#AF90D6', '#5C4B70']}
              style={styles.tabIconWrapper}>
              <Image source={item.icon} style={styles.tabIcon} />
            </LinearGradient>
          )}
          <Text style={styles.tabLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const renderCaution = ({data}: RenderBottomCautionData) => {
  return (
    <View style={styles.cautionGrp}>
      {data.map((v, i) => (
        <View key={i} style={styles.cautionItem}>
          {v.icon}
          <Text style={styles.cautionTxT}>{v.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default SuggestionTabPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  searchingContainer: {
    height: 200,
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
    padding: 10,
  },
  tabItem: {
    width: vw(20),
    alignItems: 'center',
    marginBottom: 20,
    marginRight: vw(2),
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
  cautionGrp: {
    flexDirection: 'row',
    alignSelf: 'auto',
    columnGap: vw(4),
    justifyContent: 'center',
  },
  cautionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(2),
  },
  cautionTxT: {fontSize: 16, fontWeight: '400', color: '#EAE1EE'},
});
