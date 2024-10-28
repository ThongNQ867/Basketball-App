/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {cancelSVG, playIconSVG} from '../assets/svgXml';
import {vh, vw} from '../styles/stylesheet';
import {DiaryEntry} from '../services/typeProps';
import {moodImgSelectionData} from '../services/renderData';

interface DiaryVerifyUpdateModalComponentProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
  data: DiaryEntry | null;
}

const DiaryVerifyUpdateModalComponent: React.FC<
  DiaryVerifyUpdateModalComponentProps
> = ({visible, onClose, onUpdate, data}) => {
  const getMoodImage = (mood: string) => {
    const moodData = moodImgSelectionData.find(item => item.label === mood);
    return moodData ? moodData.img : null;
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.containerWrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Hôm nay của mẹ</Text>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                {cancelSVG(vw(6), vh(3))}
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View
                style={{
                  width: '100%',
                  marginTop: vh(4),
                  backgroundColor: '#A5C6FF',
                  borderRadius: 18,
                  alignItems: 'center',
                  paddingBottom: vh(2),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    top: -50,
                    justifyContent: 'center',
                    height: 88,
                    width: 88,
                    borderRadius: 44,
                    backgroundColor: '#19162E',
                  }}>
                  <Image
                    style={{width: 44, height: 44}}
                    source={getMoodImage(data?.mood || '')}
                  />
                  <Text
                    style={{color: '#EAE1EE', fontSize: 12, fontWeight: '700'}}>
                    {data?.mood}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: vw(2),
                    justifyContent: 'center',
                    gap: vw(2),
                    marginTop: vh(6),
                    flexWrap: 'wrap',
                  }}>
                  {data?.tag.map((tag, index) => (
                    <View
                      key={index}
                      style={{
                        borderWidth: 1,
                        borderColor: '#74A6FF',
                        padding: vw(2),
                        borderRadius: 30,
                      }}>
                      <Text style={{fontSize: 18, color: '#000000'}}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text
                  style={{
                    color: '#515151',
                    fontSize: 14,
                    fontWeight: '400',
                    marginTop: vh(1),
                  }}>
                  {data?.note}
                </Text>
              </View>
              <View style={{marginTop: vh(2)}}>
                <Text
                  style={{fontSize: 16, color: '#FFFFFF', fontWeight: '700'}}>
                  Gợi ý cải thiện tình trạng hiện tại
                </Text>
                <ScrollView horizontal style={{marginTop: vh(2)}}>
                  <View style={{marginRight: vw(2), width: 130}}>
                    {renderBoxMood(
                      'Chia sẻ',
                      'Cải thiện tâm trạng',
                      require('../assets/Mood/sach.png'),
                    )}
                  </View>
                  <View style={{marginRight: vw(2)}}>
                    {renderBoxMood(
                      'Thiền',
                      'Bình tĩnh',
                      require('../assets/Meal/yoga2.png'),
                    )}
                  </View>
                  <View style={{marginRight: vw(2)}}>
                    {renderBoxMood(
                      'Chia sẻ',
                      'Cải thiện tâm trạng',
                      require('../assets/Mood/donut.png'),
                    )}
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#19162E',
                  marginTop: vh(2),
                  padding: vw(3),
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#EAE1EE', fontSize: 14}}>
                    Nhạc thiền bình tĩnh
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: vh(1),
                      gap: vw(2),
                    }}>
                    {renderRadiusBox('#000000', '10 phút', '#EAE1EE')}
                    {renderRadiusBox('#EAE1EE', 'Thiền', 'transparent')}
                    {renderRadiusBox('#EAE1EE', 'Tâm trạng', 'transparent')}
                  </View>
                </View>
                <View>{playIconSVG(vw(14), vh(7))}</View>
              </View>
              <TouchableOpacity onPress={onUpdate} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const renderRadiusBox = (
  color: string,
  data: string,
  backgroundColor: string,
) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EAE1EE',
        backgroundColor: backgroundColor,
        borderRadius: 20,
        alignSelf: 'flex-start',
        padding: vw(2),
      }}>
      <Text style={{color: color}}>{data}</Text>
    </View>
  );
};

const renderBoxMood = (label: string, data: string, img: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#382E75',
        borderRadius: 12,
        height: 160,
        width: 130,
      }}>
      <Image
        style={{width: 100, height: 100}}
        resizeMode="contain"
        source={img}
      />
      <Text style={{color: '#FFFFFF', fontSize: 14, fontWeight: '400'}}>
        {label}
      </Text>
      <Text style={{color: '#CDCDCD', fontSize: 12}}>{data}</Text>
    </View>
  );
};

export default DiaryVerifyUpdateModalComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  containerWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',

    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#221E3D',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#fff',
  },
  cancelButton: {
    position: 'absolute',
    right: vw(5),
  },
  content: {
    padding: vw(4),
  },
  updateButton: {
    marginTop: vh(2),
    backgroundColor: '#EAE1EE',
    padding: vw(4),
    borderRadius: 30,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#221E3D',
    fontSize: 16,
  },
});
