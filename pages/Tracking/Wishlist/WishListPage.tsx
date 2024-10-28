/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../../services/customHook';
import PregnancyCurrentWeekComponent from '../../../components/PregnancyCurrentWeekComponent';
import LinearGradient from 'react-native-linear-gradient';
import {vh, vw} from '../../../styles/stylesheet';
import {Searchbar} from 'react-native-paper';
import {
  formattedDate,
  formattedTomorrow,
  getDateTime,
  getTimeAgoInVietnamese,
} from '../../../services/dayTimeService';
import {
  messGrpData,
  seenWishListData,
  wishListTodayData,
  wishListTomorrowData,
} from '../../../services/renderData';
import {
  checkboxSVG,
  icon66SVG,
  icon99SVG,
  nextIconSVG,
  noIconSVG,
  plusSVG,
  removeIconSVG,
  searchingSVG,
  unCheckboxSVG,
  uncheckGreenSVG,
  watchIconSVG,
  xIconWithoutborderSVG,
  yesIconSVG,
} from '../../../assets/svgXml';
import ToggleSwitch from 'toggle-switch-react-native';

interface RenderWishListToday {
  title: string;
  img: any;
  isCheck: boolean;
  user: string;
}
interface RenderWishListTomorrow {
  title: string;
  isCheck: boolean;
}

interface RenderSeenUser {
  user: string;
  img: any;
  postTime: string;
  isAnswer: boolean;
  isReject: boolean;
}

interface RenderMessGrp {
  mess: string;
  img: any;
}

const WishListPage = () => {
  useStatusBar('#19162E');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentWeek, setCurrentWeek] = React.useState<number>(16);
  const [seenUserStorage, setSeenUserStorage] = React.useState<
    RenderSeenUser[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watched, setWatched] = React.useState<number>(8);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const currentMonth = getDateTime('month');
  const [text, onChangeText] = React.useState('');
  const [toggleStates, setToggleStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Handler function to toggle the state
  const handleToggle = (key: string) => {
    setToggleStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  React.useEffect(() => {
    setSeenUserStorage(seenWishListData);
  }, []);

  const handleYesClick = (index: number) => {
    const updatedData = [...seenUserStorage];
    updatedData[index].isAnswer = true;
    updatedData[index].isReject = false;
    setSeenUserStorage(updatedData);
  };

  const handleNoClick = (index: number) => {
    const updatedData = [...seenUserStorage];
    updatedData[index].isAnswer = true;
    updatedData[index].isReject = true;
    setSeenUserStorage(updatedData);
  };

  const handleReplyClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderToggleGrp = (label: string, toggleAim: string) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: '2%',
        }}>
        <ToggleSwitch
          isOn={toggleStates[toggleAim] || false}
          onColor="#AF90D6"
          offColor="#515151"
          onToggle={() => handleToggle(toggleAim)}
          size="medium"
        />
        <Text style={styles.modalTxtDesStyle}>{label}</Text>
      </View>
    );
  };

  const renderPopUp = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mong muốn</Text>
              <Pressable onPress={closeModal} style={styles.xIconStyle}>
                {xIconWithoutborderSVG(vw(6), vh(3))}
              </Pressable>
            </View>
            <View>
              <Text style={styles.modalContentTxT}>Mong muốn của mẹ</Text>
              <TextInput
                style={styles.TxTinput}
                onChangeText={onChangeText}
                value={text}
                placeholder="Mở lòng"
                placeholderTextColor={'#CDCDCD'}
              />
            </View>
            <Text style={styles.modalContentTxT}>Thời gian</Text>
            {renderToggleGrp('today', 'Ngay hôm nay')}
            <View style={{rowGap: vh(2), marginVertical: vh(2)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                {renderTimePicker('Ngày', '23')}
                <Text style={styles.datePickerSeparator}>:</Text>
                {renderTimePicker('Tháng', '07')}
                <Text style={styles.datePickerSeparator}>:</Text>
                {renderTimePicker('Năm', '24')}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                {renderTimePicker('Giờ', '16')}
                <Text style={styles.datePickerSeparator}>:</Text>
                {renderTimePicker('Phút', '30')}
              </View>
            </View>
            {renderToggleGrp(
              'Thông báo kép cho tất cả người thân',
              'notiForrelates',
            )}
            {renderToggleGrp('Bật thông báo', 'noti')}
            <View style={styles.searchingContainer}>
              <Searchbar
                style={styles.textInput}
                icon={() => searchingSVG(vw(5), vh(4))}
                placeholder="Tìm người dùng"
                onChangeText={setSearchQuery}
                value={searchQuery}
                placeholderTextColor={'#CDCDCD'}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{backgroundColor: '#19162E'}}>
          <PregnancyCurrentWeekComponent
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
        </View>
        {renderWishListBox()}
        {renderDate(formattedDate, true)}
        <View style={styles.layout90}>{renderTask(wishListTodayData)}</View>
        <LinearGradient
          colors={[
            '#221E3D',
            '#19162E',
            '#19162E',
            '#19162E',
            '#19162E',
            '#19162E',
            '#221E3D',
          ]}>
          {renderDate(formattedTomorrow, false)}
          <View style={styles.layout90}>
            {renderTomorrowTask(wishListTomorrowData)}
            <View
              style={{
                width: '90%',
                height: 0.5,
                backgroundColor: '#FFFFFF',
                marginVertical: vh(1),
              }}></View>
          </View>
          <View style={styles.layout90}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
                width: '90%',
              }}>
              <View>{watchIconSVG(vw(7), vh(2))}</View>
              <Text style={{color: '#AF90D6', fontSize: 12, fontWeight: '400'}}>
                Đã xem {watched}
              </Text>
            </View>
            <View>
              {renderSeenUser({
                data: seenUserStorage,
                onYesClick: handleYesClick,
                onNoClick: handleNoClick,
                onReplyClick: handleReplyClick,
              })}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#EAE1EE',
                height: 54,
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                borderRadius: 30,
              }}>
              <Text style={{color: '#221E3D', fontSize: 16, fontWeight: '700'}}>
                Xem thêm
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={{marginBottom: vh(2)}}>
          {renderDreamedMonth(currentMonth.toLocaleString())}
        </View>
        <View style={{marginBottom: vh(2)}}>{renderMessToChild()}</View>
        <View style={{marginBottom: vh(2)}}>{renderMessGrp(messGrpData)}</View>
      </ScrollView>
      {renderPopUp()}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#AA3A3A',
          alignItems: 'center',
          justifyContent: 'center',
          width: vw(15),
          height: vw(15),
          position: 'absolute',
          bottom: vh(20),
          right: 20,
          backgroundColor: '#AA3A3A',
          borderRadius: 100,
          // Shadow properties for iOS to simulate a blur effect
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          // Elevation for Android
          elevation: 8,
        }}>
        {plusSVG(vw(5), vw(5), '#FFFFFF')}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const renderTimePicker = (label: string, daytime: string) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.datePickerLabel}>{label}</Text>
      <TouchableOpacity style={styles.datePickerValueContainer}>
        <Text style={styles.datePickerValue}>{daytime}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderSeenUser = ({
  data,
  onYesClick,
  onNoClick,
  onReplyClick,
}: {
  data: RenderSeenUser[];
  onYesClick: (index: number) => void;
  onNoClick: (index: number) => void;
  onReplyClick: () => void;
}) => {
  return (
    <View style={{rowGap: vh(2)}}>
      {data.map((v, i) => (
        <View key={i} style={{width: vw(90)}}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: vw(1),
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: vw(2),
              }}>
              <TouchableOpacity>{removeIconSVG(vw(6), vh(3))}</TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: vw(2),
                }}>
                <Image
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                  source={v.img}
                />
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.seenTxt, {color: '#96C1DE'}]}>
                      @{v.user}
                    </Text>
                    {v.isAnswer ? (
                      v.isReject ? (
                        <Text style={[styles.seenTxt, {color: '#CDCDCD'}]}>
                          {' '}
                          từ chối ước muốn
                        </Text>
                      ) : (
                        <Text style={[styles.seenTxt, {color: '#CDCDCD'}]}>
                          {' '}
                          chấp nhận ước muốn
                        </Text>
                      )
                    ) : (
                      <Text style={[styles.seenTxt, {color: '#CDCDCD'}]}>
                        {' '}
                        muốn tham gia
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#96C1DE',
                        fontWeight: '200',
                      }}>
                      {getTimeAgoInVietnamese(v.postTime)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: vw(1),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={onReplyClick}
                style={{
                  borderWidth: 1,
                  borderRadius: 9,

                  borderColor: '#96C1DE',
                  padding: 4,
                }}>
                <Text style={{color: '#96C1DE', fontWeight: '400'}}>
                  Trả lời
                </Text>
              </TouchableOpacity>
              {v.isAnswer ? (
                <></>
              ) : (
                <View style={{flexDirection: 'row', columnGap: vw(1)}}>
                  <TouchableOpacity onPress={() => onYesClick(i)}>
                    {yesIconSVG(vw(6), vh(3))}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onNoClick(i)}>
                    {noIconSVG(vw(6), vh(3))}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {i < data.length - 1 && (
            <View
              style={{
                borderBottomColor: '#96C1DE',
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                marginTop: vh(2),
              }}></View>
          )}
        </View>
      ))}
    </View>
  );
};

const renderMessGrp = (data: RenderMessGrp[]) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 40,
        width: '100%',
        justifyContent: 'space-around',
      }}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            backgroundColor: '#FFB9A6',
            borderRadius: 20,
            width: vw(30),
            height: 140,
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              position: 'absolute',
              top: -30,
              zIndex: 2,
            }}
            source={v.img}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 15,
            }}>
            <Image source={require('../../../assets/WishList/fourleaf.png')} />
            <Text
              style={{
                color: '#221E3D',

                textAlign: 'center',
              }}>
              "{v.mess}"
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const renderMessToChild = () => {
  return (
    <View style={{width: '100%', rowGap: vh(1)}}>
      <Text
        style={{
          textAlign: 'center',
          color: '#EAE1EE',
          fontSize: 18,
          fontWeight: '700',
        }}>
        Nhắn nhủ tới bé
      </Text>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '80%', height: 180, alignItems: 'center'}}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#E2D6CE',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 20,
              position: 'absolute',
              top: 0,
              zIndex: 2,
            }}>
            <Image source={require('../../../assets/WishList/mai.png')} />
            <Text style={{textAlign: 'center', color: '#AA3A3A'}}>@bácmai</Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              width: '100%',
              height: 130,
              borderRadius: 20,
              position: 'absolute',
              bottom: 0,
            }}>
            <View style={{position: 'absolute', top: -15, left: -10}}>
              {icon66SVG(vw(7), vh(4))}
            </View>
            <View style={{position: 'absolute', bottom: -15, right: -10}}>
              {icon99SVG(vw(7), vh(4))}
            </View>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#997CBD',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 25,
                  columnGap: vw(1),
                }}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('../../../assets/WishList/fourleaf.png')}
                />
                <Text style={{color: '#221E3D', fontSize: 12}}>20</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#997CBD',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 25,
                  columnGap: vw(1),
                }}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('../../../assets/WishList/redHeart.png')}
                />
                <Text style={{color: '#221E3D', fontSize: 12}}>12</Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingTop: vh(1),
              }}>
              <View style={{width: '80%'}}>
                <Text
                  style={{
                    color: '#EAE1EE',
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Bé Kít ngoan, khỏe mạnh không làm mẹ lo lắng nhé con.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const renderDreamedMonth = (month: string) => {
  const numbers = Array.from({length: 12}, (_, i) => i + 1);
  return (
    <View style={{backgroundColor: '#5784A1', paddingVertical: vh(2)}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#EAE1EE',
            fontSize: 18,
            fontWeight: '700',
          }}>
          THÁNG ƯỚC MUỐN
        </Text>
        <View style={{position: 'absolute', right: 20}}>
          {nextIconSVG(vw(3), vh(2), '#221E3D')}
        </View>
      </View>
      <View style={{marginVertical: vh(2)}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {numbers.map(number => (
            <View
              key={number}
              style={[
                styles.numberContainer,
                number === Number(month) ? {backgroundColor: '#AA3A3A'} : {},
              ]}>
              <Text
                style={[
                  styles.numberText,
                  number === Number(month)
                    ? {color: '#EAE1EE', fontWeight: '700'}
                    : {},
                ]}>
                {number}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: '3%',
          alignItems: 'center',
        }}>
        <View
          style={{
            columnGap: vw(1),
            flexDirection: 'row',
            flexShrink: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#221E3D',
            }}
          />
          <Text style={{flexShrink: 1}}>
            Một chuyến du lịch Hàn Quốc của 2 vợ chồng trước khi đón thành viên
            thứ 3
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#221E3D',
            justifyContent: 'center',
            alignItems: 'center',
            width: '15%',
            height: 38,
            borderRadius: 10,
          }}>
          <Text style={{fontWeight: '400', color: '#EAE1EE'}}>29.08</Text>
        </View>
      </View>
    </View>
  );
};

const renderDate = (format: string, isToday: boolean) => {
  return (
    <View style={{paddingHorizontal: vw(3), marginBottom: vh(2)}}>
      <Text
        style={[
          styles.todayStyle,
          isToday ? {} : {fontSize: 16, fontWeight: '400'},
        ]}>
        {format}
      </Text>
    </View>
  );
};

const renderTask = (data: RenderWishListToday[]) => {
  return (
    <View style={{width: '90%', rowGap: vh(3)}}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{rowGap: vh(1), width: '100%', overflow: 'hidden'}}>
          <View style={styles.todayDataFlex}>
            {v.isCheck ? (
              <TouchableOpacity>{checkboxSVG(vw(10), vh(6))}</TouchableOpacity>
            ) : (
              <TouchableOpacity>
                {unCheckboxSVG(vw(10), vh(6))}
              </TouchableOpacity>
            )}
            <Text style={styles.todayDataFlexTitle}>{v.title}</Text>
          </View>
          <View style={styles.todayDataFlex}>
            <Image
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={v.img}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.todayDataFlexDes, {color: '#96C1DE'}]}>
                @{v.user}
              </Text>
              {v.isCheck ? (
                <Text style={styles.todayDataFlexDes}>
                  {' '}
                  đã thực hiện ước muốn này
                </Text>
              ) : (
                <Text style={styles.todayDataFlexDes}> đã xem</Text>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const renderWishListBox = () => {
  return (
    <View style={styles.gradientFieldContainer}>
      <LinearGradient
        style={styles.gradientField}
        colors={['#081E2A', '#96C1DE']}>
        <View style={[styles.gradientFieldTxTContainer, {width: vw(55)}]}>
          <Text
            style={[
              styles.gradientFieldTxTAlbum,
              {textAlign: 'left', paddingLeft: vw(2)},
            ]}>
            Danh sách ước muốn
          </Text>
          <Text
            style={[
              styles.gradientFieldTxTDes,
              {textAlign: 'left', paddingLeft: vw(2)},
            ]}>
            Hãy tạo một danh sách những điều bạn muốn thực hiện và chia sẻ cùng
            người đồng hành nhé
          </Text>
        </View>
        <View
          style={[
            styles.gradientFieldImgContainer,
            {width: vw(35), alignItems: 'flex-end'},
          ]}>
          <Image source={require('../../../assets/hashtagAndHeart.png')} />
        </View>
      </LinearGradient>
    </View>
  );
};

const renderTomorrowTask = (data: RenderWishListTomorrow[]) => {
  return (
    <View style={{width: '90%', rowGap: vh(3)}}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: vw(2),
          }}>
          {v.isCheck ? (
            <TouchableOpacity>
              {uncheckGreenSVG(vw(10), vh(6))}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              {uncheckGreenSVG(vw(10), vh(6))}
            </TouchableOpacity>
          )}
          <Text
            style={{
              flexShrink: 1,
              color: '#EAE1EE',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {v.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default WishListPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221E3D',
    flex: 1,
  },
  gradientField: {
    height: 145,
    width: vw(90),
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  gradientFieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vh(2),
  },
  gradientFieldImgContainer: {
    width: vw(40),
  },
  gradientFieldTxTContainer: {
    width: vw(50),
    paddingRight: vw(3),
    justifyContent: 'center',
    rowGap: vh(1),
  },
  gradientFieldTxTAlbum: {
    textAlign: 'right',
    color: '#EAE1EE',
    fontSize: 18,
    fontWeight: '700',
  },
  gradientFieldTxTDes: {
    textAlign: 'right',
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
  },
  todayStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  todayDataFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  todayDataFlexTitle: {
    color: '#EAE1EE',
    fontSize: 14,
    fontWeight: '400',
    flexShrink: 1,
  },
  todayDataFlexDes: {
    color: '#CDCDCD',
    fontSize: 12,
    fontWeight: '400',
  },
  layout90: {
    width: vw(100),
    alignItems: 'center',
    rowGap: vh(2),
    marginBottom: vh(2),
  },
  seenTxt: {
    fontSize: 12,
    fontWeight: '400',
  },
  numberContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#96C1DE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  numberText: {
    color: '#313131',
    fontSize: 18,
    fontWeight: '400',
  },
  //Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#221E3D',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  xIconStyle: {
    position: 'absolute',
    right: '6%',
    top: 0,
  },
  modalContentTxT: {
    fontSize: 16,
    color: '#AF90D6',
    marginBottom: 10,
  },
  TxTinput: {
    borderWidth: 1,
    borderColor: '#EAE1EE',
    borderRadius: 15,
    paddingHorizontal: vw(3),
    height: 90,
    color: '#EAE1EE',
    fontSize: 16,
    marginBottom: 20,
  },
  modalTxtDesStyle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#CDCDCD',
  },
  //Date picker
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
  datePickerSeparator: {
    color: '#8B8B8B',
    fontSize: 16,
  },
  // Search bar
  searchingContainer: {
    marginVertical: vh(1),
    width: '100%',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CDCDCD80',
  },
});
