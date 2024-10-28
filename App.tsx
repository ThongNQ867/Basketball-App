/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import OnboardingPage from './pages/OnboardingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import QuestionPage from './pages/QuestionPage';
import Question2Page from './pages/Question2Page';
import MethodinputPage from './pages/MethodinputPage';
import MenstrualcyclePage from './pages/MenstrualcyclePage';
import MedicalhistoryPage from './pages/MedicalhistoryPage';
import MedicationusedPage from './pages/MedicationusedPage';
import RestScreenPage from './pages/RestScreenPage';
import RestScreenLastPage from './pages/RestScreenLastPage';
import HomePage from './pages/HomePage';
import {
  backButtonWithoutArrowSVG,
  dataIconSVG,
  dateIconSVG,
  homeIconSVG,
  settingsIconSVG,
  timeIconSVG,
} from './assets/svgXml';
import {vh, vw} from './styles/stylesheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DiaryPage from './pages/DiaryPage';
import TrackingPage from './pages/TrackingPage';
import WeightTrackingPage from './pages/Tracking/WeightTrackingPage';
import ChildMovementPAge from './pages/Tracking/ChildMovementPAge';
import ContractionsPage from './pages/Tracking/ContractionsPage';
import HandBookPage from './pages/Tracking/HandBookPage';
import HandBookDetailPage from './pages/Tracking/HandBookDetailPage';
import MealPage from './pages/Tracking/Meal/MealPage';
import SuggestionPage from './pages/Tracking/Meal/SuggestionPage';
import SuggestionTabPage from './pages/Tracking/Meal/SuggestionTabPage';
import MoodPage from './pages/Tracking/Feeling/MoodPage';
import WishListPage from './pages/Tracking/Wishlist/WishListPage';
import TaskListPage from './pages/TaskList/TaskListPage';
import PregnancyExaminationPage from './pages/TaskList/PregnancyExaminationPage';
import BellySizePage from './pages/Tracking/BellySizePage';
import DiaryUpdatePage from './pages/Diary/DiaryUpdatePage';
import {loadData} from './data/storage';
import {LogBox} from 'react-native';
import {QuestionPageData} from './services/typeProps';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <View style={styles.tabnavigationStyle}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#E5CFEF',
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopColor: '#000000',
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              backgroundColor: '#000000',
              height: vh(9),
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomePage}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused, size}) => {
                return focused ? (
                  <View style={[styles.container, {width: size}]}>
                    {homeIconSVG(vw(6), vh(6), color)}
                    <View style={[styles.dotStyle, {backgroundColor: color}]} />
                  </View>
                ) : (
                  <View>{homeIconSVG(vw(6), vh(6), color)}</View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Diary"
            component={DiaryPage}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused, size}) => {
                return focused ? (
                  <View style={[styles.container, {width: size}]}>
                    {dateIconSVG(vw(6), vh(6), color)}
                    <View style={[styles.dotStyle, {backgroundColor: color}]} />
                  </View>
                ) : (
                  <View>{dateIconSVG(vw(6), vh(6), color)}</View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Tracking"
            component={TrackingPage}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused, size}) => {
                return focused ? (
                  <View style={[styles.container, {width: size}]}>
                    {timeIconSVG(vw(6), vh(6), color)}
                    <View style={[styles.dotStyle, {backgroundColor: color}]} />
                  </View>
                ) : (
                  <View>{timeIconSVG(vw(6), vh(6), color)}</View>
                );
              },
            }}
          />
          <Tab.Screen
            name="TaskList"
            component={TaskListPage}
            options={() => ({
              headerShown: true,
              title: 'Việc cần làm',
              headerTitleStyle: {color: 'white'},
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#19162E',
              },
              headerShadowVisible: false,
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => navigation.goBack()}>
              //     {backButtonWithoutArrowSVG(vw(3), vh(3))}
              //   </TouchableOpacity>
              // ),
              tabBarIcon: ({color, focused, size}) => {
                return focused ? (
                  <View style={[styles.container, {width: size}]}>
                    {dataIconSVG(vw(6), vh(6), color)}
                    <View style={[styles.dotStyle, {backgroundColor: color}]} />
                  </View>
                ) : (
                  <View>{dataIconSVG(vw(6), vh(6), color)}</View>
                );
              },
            })}
          />
          <Tab.Screen
            name="Settings"
            component={HomePage}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused, size}) => {
                return focused ? (
                  <View style={[styles.container, {width: size}]}>
                    {settingsIconSVG(vw(6), vh(6), color)}
                    <View style={[styles.dotStyle, {backgroundColor: color}]} />
                  </View>
                ) : (
                  <View>{settingsIconSVG(vw(6), vh(6), color)}</View>
                );
              },
              //prevent navigate to uncomplete Page
              tabBarButton: props => (
                <TouchableOpacity
                  {...props}
                  onPress={e => {
                    e.preventDefault();
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  };

  const LoadingScreen = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );

  const [isMain, setIsMain] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    const fetchData = async () => {
      await loadData<QuestionPageData>('questionData')
        .then(value => {
          value.isFinished ? setIsMain(true) : setIsMain(false);
        })
        .catch(() => {
          setIsMain(false);
        });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* Onboarding || Main */}
      <Stack.Navigator initialRouteName={isMain ? 'Main' : 'Onboarding'}>
        {/* Diary Group */}
        <Stack.Screen
          name="DiaryUpdate"
          component={DiaryUpdatePage}
          options={{headerShown: false}}
        />
        {/* Task Group */}
        <Stack.Screen
          name="PregnancyExamination"
          component={PregnancyExaminationPage}
          options={{headerShown: false}}
        />
        {/* Tracking Group */}
        <Stack.Screen
          name="BellySize"
          component={BellySizePage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Vòng bụng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#221E3D',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="WishList"
          component={WishListPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Ước muốn',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Mood"
          component={MoodPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Tâm trạng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="SuggestionTab"
          component={SuggestionTabPage as React.ComponentType<any>}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Gợi ý dinh dưỡng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Suggestion"
          component={SuggestionPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Gợi ý dinh dưỡng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Meal"
          component={MealPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Dinh dưỡng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="WeightTracking"
          component={WeightTrackingPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Cân nặng',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#221E3D',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ChildMovement"
          component={ChildMovementPAge}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Chuyển động của bé',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Contractions"
          component={ContractionsPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Cơn gò',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="HandBook"
          component={HandBookPage}
          options={({navigation}) => ({
            headerShadowVisible: false,
            headerTitle: 'Cẩm nang mẹ bầu',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#EAE1EE',
              fontWeight: '700',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#19162E',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {backButtonWithoutArrowSVG(vw(3), vh(3))}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="HandBookDetail"
          component={HandBookDetailPage}
          options={{headerShown: false}}
        />
        {/* Main for showing all main content of the application */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        {/* OnBoarding */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingPage}
          options={{headerShown: false}}
        />
        {/* Question screens */}
        <Stack.Screen
          name="Question"
          options={{headerShown: false}}
          component={QuestionPage}
        />
        <Stack.Screen
          name="Question2"
          options={{headerShown: false}}
          component={Question2Page}
        />
        <Stack.Screen
          name="MethodInput"
          options={{headerShown: false}}
          component={MethodinputPage}
        />
        <Stack.Screen
          name="Menstrualcycle"
          options={{headerShown: false}}
          component={MenstrualcyclePage}
        />
        <Stack.Screen
          name="Medicalhistory"
          options={{headerShown: false}}
          component={MedicalhistoryPage}
        />
        <Stack.Screen
          name="Medicalused"
          options={{headerShown: false}}
          component={MedicationusedPage}
        />
        {/* Rest screen */}
        <Stack.Screen
          name="RestScreen"
          options={{headerShown: false}}
          component={RestScreenPage}
        />
        <Stack.Screen
          name="RestScreenLast"
          options={{headerShown: false}}
          component={RestScreenLastPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    height: 7,
    width: 7,
    borderRadius: 7,
  },
  tabnavigationStyle: {backgroundColor: '#221E3D', flex: 1},
});
