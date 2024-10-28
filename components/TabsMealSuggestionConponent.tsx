/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {vh, vw} from '../styles/stylesheet';
import Modal from 'react-native-modal';

// Import your SVG components and functions

import {getSuggestionCatergoryImg} from '../services/imageHelper';
import {
  backButtonWithoutArrowSVG,
  saveIconSVG,
  wishlistIconSVG,
} from '../assets/svgXml';

interface SuggestItem {
  label: string;
  icon: React.ReactNode; // Assuming the icon is a React component
}

interface SuggestionItem {
  title: string;
  catergory: string;
  kcal: string;
  capacity: string;
  img: ImageSourcePropType;
  suggest: SuggestItem[];
}

interface TabsMealSuggestionComponentProps {
  suggestionRenderData: SuggestionItem[];
}

const TabsMealSuggestionComponent: React.FC<
  TabsMealSuggestionComponentProps
> = ({suggestionRenderData}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<SuggestionItem | null>(
    null,
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemPress = (item: SuggestionItem) => {
    setSelectedItem(item);
    toggleModal();
  };
  return (
    <View>
      <View style={{rowGap: vh(2)}}>
        {suggestionRenderData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionItem}
            onPress={() => handleItemPress(item)}>
            <Image source={item.img} style={styles.suggestionImage} />
            <View style={styles.suggestionTextContainer}>
              <View style={styles.suggestionTitleGrp}>
                <Text style={styles.suggestionTitle}>{item.title}</Text>
                <View style={styles.suggestionTitleSVGGrp}>
                  {wishlistIconSVG(vw(6), vh(3))}
                  {saveIconSVG(vw(6), vh(3))}
                </View>
              </View>
              <View style={styles.suggestionKcalContainer}>
                <Image
                  style={styles.suggestionImageCatergory}
                  source={getSuggestionCatergoryImg(item.catergory)}
                />
                <Text style={styles.suggestionKcal}>{item.kcal}</Text>
                <Text style={styles.suggestionCapacity}>{item.capacity}</Text>
              </View>
              <View style={styles.checkXGrp}>
                <View style={styles.checkXGrpItem}>
                  {item.suggest[0].icon}
                  <Text>{item.suggest[0].label}</Text>
                </View>
                <View style={styles.checkXGrpItem}>
                  {item.suggest[1].icon}
                  <Text>{item.suggest[1].label}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {selectedItem && (
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}>
            <ScrollView style={styles.modalContent}>
              <View style={styles.modalContainer}>
                <View style={styles.modalImgContainer}>
                  <Image style={styles.modalImg} source={selectedItem.img} />
                  <View style={styles.overlayContent}>
                    <View style={styles.modalTitleGrp}>
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={toggleModal}>
                        {backButtonWithoutArrowSVG(vw(4), vh(3))}
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>
                        {selectedItem.title}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{padding: vh(2), rowGap: vh(3)}}>
                {selectedItem.suggest.map((suggestItem, index) => (
                  <View key={index} style={styles.checkXGrpItem}>
                    {renderGrpData(
                      suggestItem,
                      index % 2 === 0 ? 'Mang thai' : 'Mới sinh',
                      selectedItem.title,
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.modalBottomBtnGrp}>
                <TouchableOpacity style={styles.modalBottomBtnLeft}>
                  <Text style={styles.modalBottomBtnTxT}>Thêm vào bữa ăn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBottomBtnRight}>
                  <Text style={styles.modalBottomBtnTxT}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        )}
      </View>
    </View>
  );
};

const renderGrpData = (data: SuggestItem, title: string, name: string) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={styles.modalKcal}>{title}</Text>
        <View style={styles.checkXGrp}>
          <View style={styles.checkXGrpItem}>
            {data.icon}
            <Text style={styles.modalSuggestText}>{data.label}</Text>
          </View>
        </View>
      </View>
      <View>
        {data.label === 'Không nên' ? (
          <Text style={{color: '#CDCDCD', fontWeight: '400', fontSize: 16}}>
            {name} có chứa mủ có khả năng gây ra các cơn co thắt sớm. Điều này
            không chỉ gây đau bụng mà còn có thể gây nguy hiểm cho em bé. Bằng
            mọi giá phải tránh ăn {name} vì nó làm tăng nguy cơ gây chuyển dạ
            sớm và trong trường hợp xấu nhất là sẩy thai.
          </Text>
        ) : data.label === 'Nên ăn' ? (
          <Text style={{color: '#CDCDCD', fontWeight: '400', fontSize: 16}}>
            Theo các chuyên gia, bà bầu ăn {name} khi mang thai là điều hoàn
            toàn ổn vì cung cúp nhiều chất dinh dưỡng.
          </Text>
        ) : (
          <Text style={{color: '#CDCDCD', fontWeight: '400', fontSize: 16}}>
            Từ trước đến nay chưa có bất kỳ nghiên cứu nào chỉ ra bà mẹ sau sinh
            không được ăn {name}. Theo các chuyên gia dinh dưỡng, dù có tính |
            nóng nhưng nếu biết cách ăn thì vẫn tận dụng được lợi ích tốt.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  //Modal
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  typescriptCopymodal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    flex: 1,
  },
  modalImgContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  modalImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: vh(3),
  },
  modalTitleGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: vw(5),
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: '#221E3D',
    borderTopLeftRadius: vh(2),
    borderTopRightRadius: vh(2),
  },
  modalKcal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EAE1EE',
    marginVertical: vh(1),
  },
  modalCapacity: {
    fontSize: 16,
    fontWeight: '400',
    color: '#EAE1EE',
    marginVertical: vh(1),
  },
  modalSuggestText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#CDCDCD',
  },
  modalBottomBtnGrp: {
    flexDirection: 'row',
    columnGap: vw(4),
    justifyContent: 'center',
  },
  modalBottomBtnLeft: {
    width: vw(50),
    backgroundColor: '#EAE1EE',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  modalBottomBtnRight: {
    width: vw(30),
    backgroundColor: '#96C1DE',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  modalBottomBtnTxT: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TabsMealSuggestionComponent;
