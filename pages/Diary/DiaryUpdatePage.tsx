/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DiaryEntry} from '../../services/typeProps';
import {loadData, saveData, updateData} from '../../data/storage';
import {getDateTime} from '../../services/dayTimeService';
import useStatusBar from '../../services/customHook';
import {vh, vw} from '../../styles/stylesheet';
import {
  cameraIconSVG,
  cancelSVG,
  cruzIconSVG,
  editIconSVG,
  examinationScheduleIconSVG,
  glassOfWaterFullIconSVG,
  glassOfWaterSVGIcon,
  lengthDiaryIconSVG,
  noteIconSVG,
  searchingSVG,
  weightDiaryIconSVG,
} from '../../assets/svgXml';
import {
  diaryModalData,
  getDiaryWeekData,
  moodImgSelectionData,
  moodReasonData,
  sexStatusData,
  StatementData,
} from '../../services/renderData';
import {Searchbar} from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import DatePicker from 'react-native-date-picker';
import DiaryVerifyUpdateModalComponent from '../../components/DiaryVerifyUpdateModalComponent';
import {launchImageLibrary} from 'react-native-image-picker';

type DiaryUpdateRouteParams = {
  index: number;
};

interface RenderGlassProps {
  filledGlasses: boolean[];
  onGlassClick: (index: number) => void;
}

const DiaryUpdatePage = () => {
  useStatusBar('#19162E');
  const route =
    useRoute<RouteProp<{params: DiaryUpdateRouteParams}, 'params'>>();
  const {index} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [entry, setEntry] = React.useState<DiaryEntry | null>(null);
  const currentMonth = getDateTime('month');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [filledGlasses, setFilledGlasses] = React.useState<boolean[]>(
    Array(8).fill(false),
  );
  const [selectedMoodReasons, setSelectedMoodReasons] = React.useState<
    string[]
  >([]);
  const [selectedStatements, setSelectedStatements] = React.useState<string[]>(
    [],
  );
  const [selectedSexStatuses, setSelectedSexStatuses] = React.useState<
    string[]
  >([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [toggleStates, setToggleStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [date, setDate] = React.useState<Date>(new Date());
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState(moodImgSelectionData);
  const [reservationBox, setReservationBox] = React.useState({
    isSave: false,
    doctorName: '',
    hour: date.getHours(),
    minute: date.getMinutes(),
    status: '',
  });
  const [isModalUpdateVisible, setIsModalUpdateVisible] = React.useState(false);
  const [image, setImage] = React.useState<Array<string>>([]);

  const currentHour = getDateTime('hour');
  const currentMinute = getDateTime('minute');

  // Handler function to toggle the state
  const handleToggle = (key: string) => {
    setToggleStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await loadData<DiaryEntry[]>('diaryWeekData');
          if (data && data[index]) {
            setEntry(data[index]);
          } else {
            const initialData = getDiaryWeekData();
            setEntry(initialData[index]);
            saveData('diaryWeekData', initialData);
          }
        } catch (error) {
          console.error('Error fetching diary data:', error);
          const initialData = getDiaryWeekData();
          setEntry(initialData[index]);
          saveData('diaryWeekData', initialData);
        }
      };

      fetchData();
    }, [index]),
  );

  const handleGlassClick = (index1: number) => {
    setFilledGlasses(prevState => {
      const newFilledGlasses = [...prevState];
      newFilledGlasses[index1] = !newFilledGlasses[index1];
      return newFilledGlasses;
    });
  };

  const toggleSelectItem = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderStatusCheckBox = (
    label: string,
    data: String[],
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const handleCancel = (item: string) => {
      toggleSelectItem(item, selectedItems, setSelectedItems);
    };
    return (
      <View style={{rowGap: vh(2), marginTop: vh(2)}}>
        <Text style={{color: '#AF90D6', fontSize: 16, fontWeight: '400'}}>
          {label}
        </Text>
        <Searchbar
          style={styles.textInput}
          icon={() => searchingSVG(vw(5), vh(5))}
          placeholder="Tìm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={'#CDCDCD'}
        />
        <View style={styles.selectedContainer}>
          {selectedItems.map((item, indexn) => (
            <View key={indexn} style={styles.selectedCheckbox}>
              <Text style={styles.selectedText}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleCancel(item)}
                style={{
                  height: vw(5),
                  width: vw(5),
                  borderRadius: 30,
                  backgroundColor: '#515151',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.6,
                }}>
                {cancelSVG(vw(3), vh(2), '#100F11')}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: vw(2),
            rowGap: vh(1),
          }}>
          {data.map((v, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                toggleSelectItem(v.toString(), selectedItems, setSelectedItems)
              }
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#CDCDCD',
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 25,
                },
                reservationBox.status.includes(v.toString())
                  ? {borderColor: '#AF90D6'}
                  : {},
              ]}>
              <Text
                style={[
                  {color: '#CDCDCD', fontWeight: '400', fontSize: 14},
                  reservationBox.status.includes(v.toString())
                    ? {color: '#AF90D6'}
                    : {},
                ]}>
                {v}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const swapWithCenter = (i: number) => {
    const centerIndex = Math.floor(images.length / 2);
    const newImages = [...images];
    [newImages[i], newImages[centerIndex]] = [
      newImages[centerIndex],
      newImages[i],
    ];
    setImages(newImages);
  };

  // console.log(images[2].label);

  const handleUpdatePressed = async () => {
    const formatTime = (value: number) =>
      value < 10 ? `0${value}` : value.toString();
    const combineTags = [
      ...selectedMoodReasons,
      ...selectedStatements,
      ...selectedSexStatuses,
    ];
    const updateReservation = {
      doctorname: reservationBox.doctorName,
      status: reservationBox.status,
      time:
        formatTime(Number(reservationBox.hour)) +
        ':' +
        formatTime(Number(reservationBox.minute)),
    };
    const dataforUpdating = {
      dayOfWeek: entry?.dayOfWeek ?? '',
      date: entry?.date ?? '',
      status: 'Trạng thái',
      setTime:
        formatTime(Number(currentHour)) +
        ':' +
        formatTime(Number(currentMinute)),
      weight: entry?.weight ?? 60,
      bellySize: entry?.bellySize ?? 80,
      reservation: updateReservation,
      mood: images[2].label,
      tag: combineTags,
      note: textInputValue,
    };
    setEntry(dataforUpdating);
    setIsModalUpdateVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsModalUpdateVisible(false);
  };

  const handleYestoUpdate = () => {
    loadData<any[]>('diaryWeekData')
      .then(existingData => {
        if (existingData && Array.isArray(existingData)) {
          if (index >= 0 && index < existingData.length) {
            existingData[index] = entry;
            return updateData('diaryWeekData', existingData).then(
              () => existingData,
            );
          } else {
            throw new Error('Invalid index: ' + index);
          }
        } else {
          throw new Error('No existing data or data is not an array');
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((updatedData: any[]) => {
        console.log('Data updated successfully');
      })
      .catch(error => {
        console.error('Error in data operation:', error);
      });
    navigation.navigate('Diary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.pageLayout}>
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
            {entry?.date} tháng {currentMonth.toLocaleString()} (Ngày 101)
          </Text>
          {renderChildInfoBox()}
          {renderMomInfoGrp(navigation, setImage, image, entry, index)}
          <RenderGlass
            filledGlasses={filledGlasses}
            onGlassClick={handleGlassClick}
          />
          {nutriSuggestion(navigation)}
          {renderReservation(
            handleOpenModal,
            reservationBox.isSave,
            reservationBox.doctorName,
            reservationBox.hour,
            reservationBox.minute,
            reservationBox.status,
            toggleStates,
            handleToggle,
          )}
          <View style={{}}>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              Sức khỏe
            </Text>
            <View style={styles.containerMood}>
              {images.map((img, ind) => (
                <View key={ind}>
                  <TouchableOpacity onPress={() => swapWithCenter(ind)}>
                    <Image source={img.img} style={styles.image} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#EAE1EE',
                      textAlign: 'center',
                      fontWeight: '700',
                      marginTop: vh(1),
                    }}>
                    {ind === 2 ? img.label : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {renderStatusCheckBox(
            'Lý do khiến mẹ có tâm trạng đó?',
            moodReasonData,
            selectedMoodReasons,
            setSelectedMoodReasons,
          )}
          {renderStatusCheckBox(
            'Thể trạng của mẹ hôm nay thế nào?',
            StatementData,
            selectedStatements,
            setSelectedStatements,
          )}
          {renderStatusCheckBox(
            'Hoạt động tình dục',
            sexStatusData,
            selectedSexStatuses,
            setSelectedSexStatuses,
          )}
          <View
            style={{
              backgroundColor: '#382E75',
              padding: vw(3),
              borderRadius: 16,
              marginTop: vh(2),
              rowGap: vh(1),
            }}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: vw(2),
                alignItems: 'center',
              }}>
              {noteIconSVG(vw(8), vh(4))}
              <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
                Ghi chú
              </Text>
            </View>
            <TextInput
              numberOfLines={4}
              value={textInputValue}
              onChangeText={newValue => setTextInputValue(newValue)}
              multiline
              style={{
                backgroundColor: '#D9D9D90F',
                borderRadius: 8,
                height: 100,
                color: '#EAE1EE',
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleUpdatePressed}
            style={{
              borderWidth: 1,
              borderColor: '#EAE1EE',
              backgroundColor: '#EAE1EE',
              borderRadius: 30,
              height: 60,
              justifyContent: 'center',
              marginTop: vh(2),
            }}>
            <Text style={{textAlign: 'center', color: '#221E3D', fontSize: 16}}>
              Cập nhật
            </Text>
          </TouchableOpacity>
          <DiaryVerifyUpdateModalComponent
            visible={isModalUpdateVisible}
            onClose={handleCloseUpdateModal}
            onUpdate={handleYestoUpdate}
            data={entry}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}>
        <ScrollView style={styles.modalContainer}>
          <View style={{alignItems: 'center', paddingTop: vh(3)}}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{position: 'absolute', top: vh(2), right: vw(5)}}>
              {cancelSVG(vw(6), vh(3), '#CDCDCD')}
            </TouchableOpacity>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              Lịch khám
            </Text>
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              Ngày {entry?.date} tháng {currentMonth.toLocaleString()}
            </Text>
          </View>
          <View style={{paddingHorizontal: vw(4)}}>
            <View style={{marginTop: vh(2), rowGap: vh(2)}}>
              <Text style={{color: '#AF90D6', fontSize: 16, fontWeight: '400'}}>
                Tên bác sĩ
              </Text>
              <TextInput
                placeholder="Nhập tên"
                placeholderTextColor={'#CDCDCD'}
                value={reservationBox.doctorName}
                onChange={e =>
                  setReservationBox({
                    isSave: false,
                    doctorName: e.nativeEvent.text,
                    hour: reservationBox.hour,
                    minute: reservationBox.minute,
                    status: reservationBox.status,
                  })
                }
                style={styles.textInputmodal}
              />
            </View>
            <View style={{marginTop: vh(2), rowGap: vh(2)}}>
              <Text style={{color: '#AF90D6', fontSize: 16, fontWeight: '400'}}>
                Mục đích
              </Text>
              <Searchbar
                style={styles.textInput}
                icon={() => searchingSVG(vw(5), vh(5))}
                placeholder="Tìm"
                onChangeText={setSearchQuery}
                value={searchQuery}
                placeholderTextColor={'#CDCDCD'}
              />
              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', gap: vw(3)}}>
                {diaryModalData.map((v, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      setReservationBox({
                        isSave: false,
                        doctorName: reservationBox.doctorName,
                        hour: reservationBox.hour,
                        minute: reservationBox.minute,
                        status: v.toString(),
                      })
                    }
                    key={i}
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderRadius: 25,
                        alignSelf: 'auto',
                      },
                      reservationBox.status.includes(v.toString())
                        ? {backgroundColor: '#AF90D6', borderColor: '#AF90D6'}
                        : {},
                    ]}>
                    <Text
                      style={[
                        {color: '#CDCDCD', fontWeight: '400', fontSize: 14},
                        reservationBox.status.includes(v.toString())
                          ? {color: '#221E3D'}
                          : {},
                      ]}>
                      {v}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <Text
                  style={{color: '#AF90D6', fontSize: 16, fontWeight: '400'}}>
                  Thời gian
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: vw(10),
                    marginTop: vh(1),
                  }}>
                  {renderTimePicker(
                    'Giờ',
                    reservationBox.hour.toString(),
                    setOpen,
                  )}
                  <Text style={styles.datePickerSeparator}>:</Text>
                  {renderTimePicker(
                    'Phút',
                    reservationBox.minute.toString(),
                    setOpen,
                  )}
                </View>
              </View>
              {renderToggleAnouncement(
                toggleStates,
                handleToggle,
                'Nhắc nhở trước 1 ngày',
                1,
              )}
              {renderToggleAnouncement(
                toggleStates,
                handleToggle,
                'Thông báo kép cho bạn đời',
                2,
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                setReservationBox({
                  isSave: true,
                  doctorName: reservationBox.doctorName,
                  hour: reservationBox.hour,
                  minute: reservationBox.minute,
                  status: reservationBox.status,
                });
              }}
              style={{
                backgroundColor: '#EAE1EE',
                borderRadius: 30,
                height: 60,
                justifyContent: 'center',
                marginTop: vh(2),
              }}>
              <Text
                style={{textAlign: 'center', color: '#221E3D', fontSize: 16}}>
                Lưu
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              mode="time"
              date={date}
              locale="vi"
              onConfirm={datet => {
                setOpen(false);
                setReservationBox({
                  isSave: false,
                  doctorName: reservationBox.doctorName,
                  hour: datet.getHours(),
                  minute: datet.getMinutes(),
                  status: reservationBox.status,
                });
                setDate(datet);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const renderToggleAnouncement = (
  toggleStates: {[key: string]: boolean},
  handleToggle: (key: string) => void,
  label: string,
  index: number,
) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: vw(2),
      }}>
      <ToggleSwitch
        isOn={toggleStates[`reminderToggle_${index}`] || false}
        onColor="#AF90D6"
        offColor="#AF90D6"
        circleColor={'#EAE1EE'}
        onToggle={() => handleToggle(`reminderToggle_${index}`)}
        size="medium"
      />
      <Text style={{color: '#AF90D6', fontSize: 16, fontWeight: '400'}}>
        {label}
      </Text>
    </View>
  );
};

const renderTimePicker = (label: string, daytime: string, setOpen: any) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.datePickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.datePickerValueContainer}
        onPress={() => setOpen(true)}>
        <Text style={styles.datePickerValue}>{daytime}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderReservation = (
  setModal: () => void,
  isSave: boolean,
  doctorName: string,
  hour: number,
  minute: number,
  status: string,
  toggleStates: {[key: string]: boolean},
  handleToggle: (key: string) => void,
) => {
  const formatTime = (value: number) =>
    value < 10 ? `0${value}` : value.toString();
  return (
    <>
      {isSave && doctorName !== '' ? (
        <View
          style={{
            marginVertical: vh(2),
            rowGap: vh(2),
            backgroundColor: '#382E75',
            padding: vw(3),
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(2),
              }}>
              {examinationScheduleIconSVG(vw(8), vh(4))}
              <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
                Lịch khám:
              </Text>
            </View>
            <ToggleSwitch
              isOn={toggleStates[`reminderToggle_${3}`] || false}
              onColor="#221E3D"
              offColor="#221E3D"
              circleColor={'#EAE1EE'}
              onToggle={() => handleToggle(`reminderToggle_${3}`)}
              size="medium"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '400'}}>
                Bác sĩ {doctorName} khoa sản
              </Text>
              <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '400'}}>
                {status}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: '#EAE1EE',
                  paddingVertical: vh(1),
                  paddingHorizontal: vw(2),
                  borderRadius: 10,
                  color: '#221E3D',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                {formatTime(hour)}:{formatTime(minute)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{marginVertical: vh(2), rowGap: vh(2)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: vw(2),
            }}>
            {examinationScheduleIconSVG(vw(8), vh(4))}
            <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
              Lịch khám:
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setModal()}
              style={{
                width: 42,
                height: 42,
                backgroundColor: '#AF90D6',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {cruzIconSVG(vw(8), vh(4))}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#EAE1EE',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Nhập lịch
          </Text>
        </View>
      )}
    </>
  );
};

const nutriSuggestion = (navigation: NativeStackNavigationProp<any>) => {
  return (
    <View style={{marginTop: vh(2), rowGap: vh(2)}}>
      <Text style={{color: '#EAE1EE', fontSize: 18, fontWeight: '700'}}>
        Dinh dưỡng hôm nay
      </Text>
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: 42,
            height: 42,
            backgroundColor: '#AF90D6',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {cruzIconSVG(vw(8), vh(4))}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#EAE1EE',
          fontSize: 16,
          fontWeight: '400',
          textAlign: 'center',
        }}>
        Nhập thông tin bữa ăn
      </Text>
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
  );
};

const RenderGlass: React.FC<RenderGlassProps> = ({
  filledGlasses,
  onGlassClick,
}) => {
  const filledCount = filledGlasses.filter(isFilled => isFilled).length;

  return (
    <View
      style={{
        backgroundColor: '#5784A1',
        borderRadius: 10,
        paddingVertical: vh(1),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: vw(2),
        }}>
        <Text>Uống nước</Text>
        <Text>Mục tiêu: {filledCount * 0.25}/2l</Text>
      </View>
      <View style={styles.iconContainer}>
        {filledGlasses.map((isFilled, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onGlassClick(index)}
            style={styles.iconWrapper}>
            {isFilled
              ? glassOfWaterFullIconSVG(vw(8), vh(6))
              : glassOfWaterSVGIcon(vw(8), vh(6))}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const renderMomInfoGrp = (
  navigation: NativeStackNavigationProp<any>,
  setImage: React.Dispatch<React.SetStateAction<string[]>>,
  image: string[],
  entry: DiaryEntry | null,
  dataIndex: number,
) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: vh(4),
        marginBottom: vh(2),
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            setImage([]);
            const result: any = await launchImageLibrary({
              mediaType: 'photo',
              selectionLimit: 1,
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
        {image.length > 0 ? (
          <Image
            source={{uri: image[0]}}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          cameraIconSVG(vw(10), vh(5))
        )}
      </TouchableOpacity>
      <View
        style={{height: vh(20), width: '28%', justifyContent: 'space-between'}}>
        {renderMominfoBox(
          'Cân nặng',
          entry?.weight.toLocaleString() + 'kg' ?? '0kg',
          '#AF90D6',
          navigation,
          'WeightTracking',
          dataIndex,
        )}
        {renderMominfoBox(
          'Vòng bụng',
          entry?.bellySize.toLocaleString() + 'cm' ?? '0cm',
          'transparent',
          navigation,
          'BellySize',
          dataIndex,
        )}
      </View>
      <View style={{height: vh(20), width: '28%', alignItems: 'center'}}>
        <View style={{position: 'absolute', top: -40}}>
          <Image source={require('../../assets/Diary/pregnancy.png')} />
        </View>
        <View
          style={{height: '100%', width: '100%', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={[
              styles.momInfoBox,
              {
                backgroundColor: '#221E3D',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#AF90D6',
              },
            ]}>
            <Text style={{color: '#EAE1EE'}}>Nhiệt độ</Text>
            <Text style={{color: '#221E3D', fontWeight: '700', fontSize: 16}}>
              {cruzIconSVG(vw(6), vh(3), '#EAE1EE')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const renderMominfoBox = (
  label: string,
  data: string,
  backColor: string,
  navigation: NativeStackNavigationProp<any>,
  destination: string,
  dataIndex: number,
) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(destination, {updateItemIndex: dataIndex})
      }
      style={[
        styles.momInfoBox,
        {
          backgroundColor: backColor,
          justifyContent: 'space-evenly',
          paddingLeft: '10%',
          borderWidth: 1,
          borderColor: '#AF90D6',
        },
      ]}>
      <Text style={{color: '#EAE1EE'}}>{label}</Text>
      <Text
        style={[
          {fontWeight: '700', fontSize: 16},
          backColor === 'transparent' ? {color: '#AF90D6'} : {color: '#221E3D'},
        ]}>
        {data}
      </Text>
      <View style={{position: 'absolute', right: '5%', top: '5%'}}>
        {editIconSVG(vw(4), vh(2))}
      </View>
    </TouchableOpacity>
  );
};

const renderChildInfoBox = () => {
  return (
    <View style={{marginTop: vh(5), marginBottom: vh(2)}}>
      <View style={styles.childInfoBox}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.childInfoBoxTxT}>Tuổi thai: </Text>
          <Text style={[styles.childInfoBoxTxT, {fontWeight: '700'}]}>
            16 tuần 2 ngày
          </Text>
          <Image
            style={styles.kidImg}
            source={require('../../assets/Diary/kid.png')}
          />
        </View>
        <View style={{flexDirection: 'row', paddingTop: 15}}>
          <View style={styles.childInfoiconGrp}>
            {weightDiaryIconSVG(vw(10), vh(5))}
            <Text style={styles.childInfoiconTxt}>110 gam</Text>
          </View>
          <View style={styles.childInfoBox60}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                backgroundColor: '#AF90D6',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('../../assets/Diary/quaLe.png')} />
            </View>
          </View>
          <View style={styles.childInfoiconGrp}>
            {lengthDiaryIconSVG(vw(10), vh(5))}
            <Text style={styles.childInfoiconTxt}>17 cm</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', paddingTop: 5}}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#EAE1EE',
                fontWeight: '400',
                fontSize: 14,
              }}>
              Kích thước của Kít tương tự{' '}
              <Text style={{color: '#E5CE7F'}}>một quả Lê</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiaryUpdatePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19162E',
    flex: 1,
  },
  pageLayout: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
  },
  childInfoBox: {
    backgroundColor: '#322C56',
    width: '100%',
    height: 232,
    padding: '3%',
    borderRadius: 16,
  },
  childInfoBoxTxT: {
    color: '#FFB9A6',
    fontSize: 16,
  },
  kidImg: {
    height: 106,
    width: 75,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: -50,
  },
  childInfoiconGrp: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInfoiconTxt: {
    textAlign: 'center',
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '700',
  },
  childInfoBox60: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: vh(20),
    width: '38%',
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10, // Adjust this value for more/less blur
    elevation: 10, // Adjust this value for more/less shadow depth
  },
  momInfoBox: {
    width: '100%',
    height: '47%',
    borderRadius: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(2), // Adjust padding if needed
  },
  iconWrapper: {
    marginHorizontal: vw(1), // Adjust margin if needed
  },
  suggestGrp: {
    backgroundColor: '#FFFFFF',
    height: 57,
    width: '100%',
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
  textInput: {
    width: vw(90),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CDCDCD80',
    color: '#EAE1EE',
  },
  selectedCheckbox: {
    borderColor: '#AF90D6',
    backgroundColor: '#AF90D6', // Light pink background
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 14,
    borderRadius: 25,
    columnGap: vw(1),
    alignItems: 'center',
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: vw(2),
    rowGap: vh(1),
  },
  selectedText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
  },
  modalContainer: {
    backgroundColor: '#221E3D',
    flex: 1,
  },
  textInputmodal: {
    width: vw(90),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CDCDCD80',
    borderRadius: 30,
    padding: vh(2),
    color: '#CDCDCD',
  },

  // Date picker
  datePickerSeparator: {
    color: '#8B8B8B',
    fontSize: 16,
  },
  datePickerContainer: {
    alignItems: 'center',
  },
  datePickerLabel: {
    color: '#8B8B8B',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  datePickerValueContainer: {
    borderWidth: 1,
    borderColor: '#EAE1EE',
    height: 50,
    width: 50,
    borderRadius: 20,
    padding: 10,
  },
  datePickerValue: {
    color: '#EAE1EE',
    fontSize: 18,
    textAlign: 'center',
  },
  containerMood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
  },
});
