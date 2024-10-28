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
import React, {useEffect} from 'react';
import {vh, vw} from '../../styles/stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/customHook';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {checkOnlyIconSVG, reFreshIconSVG} from '../../assets/svgXml';

const ContractionsPage = () => {
  useStatusBar('#19162E');

  const [history, setHistory] = React.useState<
    {count: number; time: number; last: string}[]
  >([
    {count: 12, time: Date.now() - 259200000, last: '01:45'},
    {count: 40, time: Date.now() - 86400000, last: '12:33'},
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);
  const [count, setCount] = React.useState(0);
  const [formattedTime, setFormattedTime] = React.useState('00:00');
  const [firstClick, setFirstClick] = React.useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')} Thg ${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  };

  const handleCount = () => {
    setCount(prevCount => prevCount + 1);
    if (!firstClick) {
      setFirstClick(true);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (firstClick) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1;
          // Convert seconds to mm:ss format
          const minutes = Math.floor(newTime / 60);
          const seconds = newTime % 60;
          const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
          setFormattedTime(formatted);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [firstClick]);

  // Define the maximum number of movements you want to track
  const maxClicks = 120;

  // Calculate the fill percentage based on the most recent count
  const fillPercentage = count > 0 ? (count / maxClicks) * 100 : 0;

  const handleRefresh = () => {
    setCount(1);
    setElapsedTime(0);
  };

  const handleCheckSpace = () => {
    const now = Date.now();
    setHistory(prevHistory => [
      ...prevHistory,
      {count, time: now, last: formattedTime},
    ]);
    setCount(0);
    setElapsedTime(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainerGrp}>
        <Text style={styles.imgTxT}>90</Text>
        <TouchableOpacity
          style={styles.imgContainerGrpImg}
          onPress={handleCount}>
          <AnimatedCircularProgress
            size={vw(50)} // Diameter of the circle
            width={20} // Width of the circle border
            fill={fillPercentage} // Percentage of the circle to fill
            tintColor="#FFD700" // Color of the filled part
            backgroundColor="#382E75" // Color of the unfilled part
            rotation={0}
            lineCap="round">
            {_ => (
              <View style={styles.circle}>
                {count > 0 ? (
                  <Text
                    style={{color: '#EAE1EE', fontSize: 36, fontWeight: '700'}}>
                    {count}
                  </Text>
                ) : (
                  <Image
                    source={require('../../assets/MOVE1.png')}
                    style={styles.imageStyle}
                  />
                )}
              </View>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
        <Text style={styles.imgTxT}>30</Text>
      </View>
      <Text style={styles.imgTxT}>60</Text>
      <View style={styles.desTxTContainer}>
        {count <= 0 ? (
          <Text style={styles.desTxT}>
            Nhấp vào nút trên khi cơn gò bắt đầu
          </Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: vw(100),
            }}>
            <TouchableOpacity onPress={handleRefresh}>
              {reFreshIconSVG(vw(8), vw(8))}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCheckSpace}>
              <View
                style={{
                  backgroundColor: '#82BA5F',
                  borderRadius: vw(8),
                  width: vw(8),
                  height: vw(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {checkOnlyIconSVG(vw(5), vw(5))}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.historyGrp}>
        <ScrollView>
          <Text style={{color: '#EAE1EE', fontWeight: '700', fontSize: 18}}>
            Lịch sử
          </Text>
          <View style={styles.historyGrpTitle}>
            <View style={styles.historyGrpTitleContainer}>
              <Text style={styles.historyGrpTitleTxT}>Thời gian</Text>
            </View>
            <View style={styles.historyGrpTitleContainer}>
              <Text style={styles.historyGrpTitleTxT}>Kéo dài</Text>
            </View>
            <View style={styles.historyGrpTitleContainer}>
              <Text style={styles.historyGrpTitleTxT}>Số lần</Text>
            </View>
          </View>
          {history.map((entry, index) => (
            <View key={index} style={styles.historyGrpItem}>
              <View style={styles.historyGrpTitleContainer}>
                <Text style={styles.historyGrpItemTxT}>
                  {formatDate(entry.time)}
                </Text>
              </View>
              <View style={styles.historyGrpTitleContainer}>
                <Text style={styles.historyGrpItemTxT}>{entry.last}</Text>
              </View>
              <View style={styles.historyGrpTitleContainer}>
                <Text style={styles.historyGrpItemTxT}>{entry.count}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ContractionsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  imgContainerGrp: {
    width: vw(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: vh(2),
  },
  imgTxT: {
    textAlign: 'center',
    color: '#EAE1EE',
    fontWeight: '700',
    fontSize: 18,
  },
  imgContainerGrpImg: {
    alignSelf: 'auto',
  },
  desTxT: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#EAE1EE',
  },
  desTxTContainer: {
    marginVertical: vh(3),
  },
  historyGrp: {
    flex: 1,
    backgroundColor: '#19162E',
    paddingVertical: vh(2),
    paddingHorizontal: vw(2),
  },
  historyGrpTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: vw(100),
    marginTop: vh(2),
  },
  historyGrpTitleContainer: {
    width: vw(33),
  },
  historyGrpTitleTxT: {
    textAlign: 'center',
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '700',
  },
  historyGrpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: vw(100),
    marginTop: vh(2),
  },
  historyGrpItemTxT: {
    textAlign: 'center',
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
  },
  circle: {
    borderRadius: vw(50),
    borderWidth: 20,
    borderColor: '#382E75',
    width: vw(50),
    height: vw(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
  },
});
