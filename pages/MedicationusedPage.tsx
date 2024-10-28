/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import QuestionPageLayout from '../components/QuestionPageLayout';
import {launchImageLibrary} from 'react-native-image-picker';
import useStatusBar from '../services/customHook';
import {QuestionPageData} from '../services/typeProps';
import {loadData, updateData} from '../data/storage';

const MedicationusedPage = () => {
  useStatusBar('#AF90D6');
  const [medicineName, setMedicineName] = React.useState<string>('');
  const [image, setImage] = React.useState<Array<string>>([]);

  const handleSubmit = async () => {
    try {
      const data: QuestionPageData = await loadData('questionData');
      data.medicine[0].name = medicineName;
      data.medicine[0].img = image;
      await updateData('questionData', data)
        .then(() => {
          console.log('update success');
        })
        .catch(err => {
          console.warn(err.message);
        });
    } catch (error) {
      console.error('Failed to load question data', error);
    }
  };

  const renderView = () => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.SectionStyle}>
            <TouchableOpacity
              style={styles.ImageStyle}
              onPress={async () => {
                try {
                  setImage([]);
                  const result: any = await launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: 8,
                  });
                  if (result.assets.length > 0) {
                    for (let i = 0; i < result.assets.length; i++) {
                      setImage(pre => {
                        return [...pre, result.assets[i].uri];
                      });
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }}>
              <Image
                style={styles.ImageStyle}
                source={
                  image.length === 0
                    ? require('../assets/Icons/image.png')
                    : require('../assets/Icons/edit.png')
                }
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Tên thuốc"
              onChangeText={setMedicineName}
              placeholderTextColor={'#E5CFEF61'}
              style={styles.textInput}
              value={medicineName}
            />
          </View>
          <ScrollView horizontal style={styles.viewImg}>
            {image?.map((v, i) => (
              <Image key={i} style={styles.imgShow} source={{uri: v}} />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.btnAdd}>
            <Text style={styles.inputTxtBtn}>Thêm</Text>
            <Text style={styles.inputIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <QuestionPageLayout
      image="pillow"
      title="Các loại thuốc mẹ đang sử dụng?"
      CustomView={renderView()}
      isDiscard={true}
      value={medicineName === '' ? 0 : 5}
      nextPage="RestScreen"
      supportFucntion={handleSubmit}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textInput: {
    width: 309,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#E5CFEF',
    color: '#E5CFEF',
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginVertical: 30,
  },
  inputTxtBtn: {
    color: '#E5CFEF61',
    fontSize: 18,
    fontWeight: '400',
  },

  inputIcon: {
    color: '#E5CFEF61',
    fontSize: 25,
    fontWeight: '200',
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageStyle: {
    position: 'absolute',
    right: 8,
    height: 25,
    width: 25,
    zIndex: 1,
  },
  viewImg: {
    marginTop: 25,
  },
  imgShow: {
    height: 115,
    width: 115,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default MedicationusedPage;
