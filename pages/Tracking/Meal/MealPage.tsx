/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import useStatusBar from '../../../services/customHook';
import {
  caloriesIconSVG,
  carbsIconSVG,
  consumeIconSVG,
  fatIconSVG,
  nextIconSVG,
  proteinIconSVG,
} from '../../../assets/svgXml';
import {vh, vw} from '../../../styles/stylesheet';
import BarChartComponent from '../../../components/BarChartComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PregnancyCurrentWeekComponent from '../../../components/PregnancyCurrentWeekComponent';
import {formattedDate} from '../../../services/dayTimeService';

interface RenderNutrition {
  icon: any;
  title: string;
  amounts: number;
}

interface NutritionProps {
  data: RenderNutrition[];
}

interface RenderMeal {
  title: string;
  kcal: number;
}

interface MealProps {
  data: RenderMeal[];
}

const data = {
  labels: ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  datasets: [
    {
      data: [1700, 1650, 1507, 2000, 2000, 500, 0, 0, 0, 0],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#19162E',
  backgroundGradientTo: '#19162E',
  fillShadowGradientOpacity: 1,
  color: () => `#997CBD`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  barRadius: 10,
};

const MealPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [currentWeek, setCurrentWeek] = React.useState<number>(16);
  const [nutritionData, setNutritionData] = React.useState<RenderNutrition[]>([
    {
      icon: proteinIconSVG(vw(8), vh(5)),
      title: 'Protein',
      amounts: 20,
    },
    {
      icon: carbsIconSVG(vw(8), vh(5)),
      title: 'Carbs',
      amounts: 50,
    },
    {
      icon: fatIconSVG(vw(8), vh(5)),
      title: 'Fat',
      amounts: 10,
    },
    {
      icon: carbsIconSVG(vw(8), vh(5)),
      title: 'Vitamins',
      amounts: 30,
    },
  ]);
  const [kcalData, setKcalData] = React.useState<RenderNutrition[]>([
    {
      icon: caloriesIconSVG(vw(12), vh(7)),
      title: 'Năng lượng đốt cháy',
      amounts: 100,
    },
    {
      icon: consumeIconSVG(vw(12), vh(7)),
      title: 'Tiêu thụ',
      amounts: 320,
    },
  ]);

  const [mealData, setMealData] = React.useState<RenderMeal[]>([
    {
      title: 'Bữa sáng',
      kcal: 320,
    },
    {
      title: 'Bữa trưa',
      kcal: 320,
    },
    {
      title: 'Bữa tối',
      kcal: 320,
    },
  ]);

  useStatusBar('#19162E');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PregnancyCurrentWeekComponent
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
        />
        <View>
          <View style={styles.infoGrp}>
            <View style={styles.milkGrp}>
              <View style={styles.milkGrpTxTContainer}>
                <Text style={styles.milkGrpTxT}>
                  Sữa và các sản phẩm từ sữa là nguồn cung cấp canxi hoàn hảo
                  cho mẹ bầu tuần 16 - 17, ngoài ra mẹ bầu có thể dùng nhiều
                  loại trái cây, nước cam.
                </Text>
              </View>
              <View style={styles.milkGrpImg}>
                <Image source={require('../../../assets/Meal/milk.png')} />
              </View>
            </View>

            <View style={styles.yogaGrp}>
              <View style={styles.yogaGrpTxTContainer}>
                <Text style={styles.yogaGrpTxT}>
                  Các bài tập nhẹ như Yoga, Pilates, rất quan trọng để giữ cho
                  bản thân khỏe mạnh
                </Text>
              </View>
              <View style={styles.yogaGrpImg}>
                <Image
                  source={require('../../../assets/Meal/sittingYoga.png')}
                />
              </View>
            </View>

            <View style={styles.suggestGrp}>
              <View style={styles.suggestGrpTxtContainer}>
                <Text style={styles.suggestGrpTxT}>Gợi ý dinh dưỡng</Text>
              </View>
              <TouchableOpacity
                style={styles.suggestGrpBtn}
                onPress={() => navigation.navigate('Suggestion')}>
                <Text style={styles.suggestGrpBtnTxT}>Xem</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{paddingHorizontal: vw(3), marginVertical: vh(2)}}>
              <Text style={styles.todayStyle}>{formattedDate}</Text>
            </View>
            <View>{renderNutritions({data: nutritionData})}</View>
            <View>{renderKcalData({data: kcalData})}</View>
          </View>
          <View>{renderDailyMeal({data: mealData})}</View>
        </View>
        <View>
          <View style={styles.statisticGrp}>
            <Text style={styles.statisticGrpTxT}>
              Thống kê năng lượng tiêu thụ
            </Text>
            <Text style={styles.statisticGrpTxT}>TUẦN THAI 16</Text>
          </View>
          <BarChartComponent data={data} chartConfig={chartConfig} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderNutritions = ({data}: NutritionProps) => {
  return (
    <View style={styles.renderNutritionsContainer}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.renderNutritionsItemBox,
            index % 2 === 0 ? {backgroundColor: '#997CBD'} : {},
          ]}>
          {item.icon}
          <Text style={styles.renderNutritionsAmounts}>{item.amounts}g</Text>
          <Text style={styles.renderNutritionsTitle}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

const renderKcalData = ({data}: NutritionProps) => {
  return (
    <View style={styles.renderKcalContainer}>
      <View style={styles.renderKcalLeftBox}>
        {data[0].icon}
        <Text style={styles.renderKcalAmounts}>{data[0].amounts} Kcal</Text>
        <Text style={styles.renderKcalTitle}>{data[0].title}</Text>
      </View>
      <View style={styles.renderKcalRightBox}>
        {data[1].icon}
        <Text style={[styles.renderKcalAmounts, {color: '#EAE1EE'}]}>
          {data[1].amounts}/1808 Kcal
        </Text>
        <Text style={[styles.renderKcalTitle, {color: '#EAE1EE'}]}>
          {data[1].title}
        </Text>
      </View>
    </View>
  );
};

const renderDailyMeal = ({data}: MealProps) => {
  return (
    <View style={styles.dailyMealContainer}>
      {data.map((v, i) => (
        <TouchableOpacity key={i} style={styles.dailyMealGrp}>
          <View style={styles.dailyMealGrpLeft}>
            <Image source={require('../../../assets/Meal/Meal.png')} />
            <View style={styles.dailyMealGrpTxT}>
              <Text style={styles.dailyMealTitle}>{v.title}</Text>
              <Text style={styles.dailyMealvalue}>{v.kcal} kcal</Text>
            </View>
          </View>
          {nextIconSVG(vw(3), vh(2), '#EAE1EE')}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MealPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19162E',
  },
  infoGrp: {
    width: vw(100),
    alignItems: 'center',
    rowGap: vh(2),
  },
  milkGrp: {
    width: vw(90),
    height: 116,
    backgroundColor: '#997CBD',
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
    paddingLeft: vw(2),
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
  suggestGrp: {
    backgroundColor: '#FFFFFF',
    height: 57,
    width: vw(95),
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
  },
  suggestGrpTxtContainer: {
    width: '70%',
  },
  suggestGrpTxT: {
    color: '#19162E',
    fontSize: 14,
    fontWeight: '400',
  },
  suggestGrpBtn: {
    width: '30%',
    backgroundColor: '#19162E',
    borderRadius: 50,
    height: '70%',
    justifyContent: 'center',
  },
  suggestGrpBtnTxT: {
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  todayStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  //
  renderNutritionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  renderNutritionsItemBox: {
    width: vw(20),
    height: 120,
    borderWidth: 2,
    borderColor: '#997CBD',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  renderNutritionsAmounts: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EAE1EE',
  },
  renderNutritionsTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#EAE1EE',
    fontWeight: '400',
  },
  //
  renderKcalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(3),
    marginVertical: vh(2),
    columnGap: vw(2),
  },
  renderKcalLeftBox: {
    flex: 3,
    borderWidth: 2,
    borderColor: '#96C1DE',
    borderRadius: 16,
    padding: vw(3),
    backgroundColor: '#96C1DE',
  },
  renderKcalRightBox: {
    flex: 2,
    borderWidth: 2,
    borderColor: '#96C1DE',
    borderRadius: 16,
    padding: vw(3),
  },
  renderKcalAmounts: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  renderKcalTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#515151',
  },
  dailyMealContainer: {
    backgroundColor: '#322C56',
    padding: vh(2),
    rowGap: vh(2),
  },
  dailyMealGrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyMealGrpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(4),
  },
  dailyMealGrpTxT: {
    rowGap: vh(1),
  },
  dailyMealTitle: {
    color: '#EAE1EE',
    fontSize: 16,
    fontWeight: '700',
  },
  dailyMealvalue: {
    color: '#C1BED6',
    fontSize: 16,
    fontWeight: '400',
  },
  statisticGrp: {
    marginVertical: vh(2),
    width: vw(100),
  },
  statisticGrpTxT: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
