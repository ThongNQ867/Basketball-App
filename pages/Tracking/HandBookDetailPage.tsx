/* eslint-disable prettier/prettier */
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../services/typeProps';
import {vh, vw} from '../../styles/stylesheet';
import {renderHandBookTitle} from '../../services/renderData';
import {backButtonWithoutArrowSVG, cancelSVG} from '../../assets/svgXml';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getHandBookImgDetail} from '../../services/imageHelper';
import {
  commonPregnancyConditions,
  fetalDevelopment,
  givingBirthJourney,
  improveMood,
  physicalExercise,
  smartPrenatalCare,
  stagesOfPregnancy,
} from '../../data/handbook/hanbookData';
import Modal from 'react-native-modal';

type HandBookDetailRouteProp = RouteProp<RootStackParamList, 'HandBookDetail'>;
interface Detail {
  desTitle: string;
  main: string;
  content: string;
}

interface RenderDataItem {
  img: number;
  title: string;
  smallDes: string;
  detail: Detail;
}

const HandBookDetailPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [renderData, setRenderData] = React.useState<RenderDataItem[]>([]);
  const route = useRoute<HandBookDetailRouteProp>();
  const {id} = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<RenderDataItem | null>(
    null,
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    switch (id) {
      case 0:
        setRenderData(stagesOfPregnancy);
        break;
      case 1:
        setRenderData(smartPrenatalCare);
        break;
      case 2:
        setRenderData(commonPregnancyConditions);
        break;
      case 3:
        setRenderData(fetalDevelopment);
        break;
      case 4:
        setRenderData(givingBirthJourney);
        break;
      case 5:
        setRenderData(improveMood);
        break;
      case 6:
        setRenderData(physicalExercise);
        break;
      default:
        break;
    }
  }, [id]);

  const handleNavigation = () => {
    navigation.goBack();
  };

  const handleItemPress = (item: RenderDataItem) => {
    setSelectedItem(item);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {headerRenderView(id, handleNavigation)}
      <ScrollView>{renderContent(renderData, handleItemPress)}</ScrollView>
      {selectedItem && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}>
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalTitleGrp}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              <TouchableOpacity onPress={toggleModal}>
                {cancelSVG(vw(4), vh(3), '#AF90D6')}
              </TouchableOpacity>
            </View>
            <View style={styles.modalImgContainer}>
              <Image
                style={styles.modalImg}
                source={getHandBookImgDetail(selectedItem.img)}
              />
            </View>
            <View
              style={{
                padding: vh(2),
              }}>
              <Text style={styles.modalDescription}>
                {selectedItem.detail.desTitle}:
              </Text>
              <Text style={styles.modalMain}>{selectedItem.detail.main}</Text>
              <Text style={styles.modalContentText}>
                {selectedItem.detail.content}
              </Text>
            </View>
            <View style={styles.modalBottomBtnGrp}>
              <TouchableOpacity style={styles.modalBottomBtnLeft}>
                <Text style={styles.modalBottomBtnTxT}>Chia sẻ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBottomBtnRight}>
                <Text style={styles.modalBottomBtnTxT}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

const headerRenderView = (id: number, navigate: () => void) => {
  return (
    <View style={styles.headerImgContainer}>
      <ImageBackground
        style={styles.headerImg}
        source={require('../../assets/handbook/detailTopImage.png')}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerBackIcon} onPress={navigate}>
            {backButtonWithoutArrowSVG(vw(4), vh(3))}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{renderHandBookTitle(id)}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const renderContent = (
  data: RenderDataItem[],
  onPress: (item: RenderDataItem) => void,
) => {
  return (
    <View style={styles.renderCntScrollView}>
      {data.map((v, i) => (
        <TouchableOpacity
          key={i}
          style={styles.renderCntContainer}
          onPress={() => onPress(v)}>
          <View style={styles.renderCntImgContainer}>
            <Image
              style={styles.renderCntImg}
              source={getHandBookImgDetail(v.img)}
            />
          </View>
          <View style={styles.renderCntTxTContainer}>
            <Text style={styles.renderCntTitle}>{v.title}</Text>
            <Text style={styles.renderCntsmallDes} numberOfLines={2}>
              {v.smallDes}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HandBookDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221E3D',
  },
  headerImg: {
    width: vw(100),
    height: 155,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    width: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerBackIcon: {
    position: 'absolute',
    left: vw(4),
    zIndex: 2,
  },
  headerImgContainer: {
    width: vw(100),
    borderRadius: 90,
  },
  renderCntScrollView: {
    width: vw(100),
    rowGap: vh(2),
    alignItems: 'center',
    paddingVertical: vh(2),
  },
  renderCntContainer: {
    height: 290,
    width: vw(90),
    backgroundColor: '#382E75',
    paddingHorizontal: vw(4),
    paddingTop: vh(2),
    borderRadius: 10,
  },
  renderCntTxTContainer: {
    paddingVertical: vh(1),
    rowGap: vh(1),
  },
  renderCntTitle: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 16,
    color: '#EAE1EE',
  },
  renderCntsmallDes: {
    color: '#CDCDCD',
    fontSize: 12,
    fontWeight: '400',
  },
  renderCntImgContainer: {
    width: 'auto',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
  },
  renderCntImg: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  // For Modal
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#382E75',
    borderTopLeftRadius: vh(2),
    borderTopRightRadius: vh(2),
    maxHeight: vh(80),
  },
  modalTitleGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: vh(2),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EAE1EE',
    flex: 1,
    paddingRight: vw(2),
  },
  modalDescription: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EAE1EE',
    marginVertical: vh(1),
  },
  modalMain: {
    fontSize: 16,
    fontWeight: '400',
    color: '#EAE1EE',
    marginVertical: vh(1),
  },
  modalContentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#CDCDCD',
  },
  closeButton: {
    marginTop: vh(2),
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: vh(1),
    paddingHorizontal: vw(4),
    borderRadius: vh(1),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: vh(2),
  },
  modalImgContainer: {
    width: vw(100),
    height: 200,
  },
  modalImg: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
  },
  modalBottomBtnGrp: {
    flexDirection: 'row',
    paddingHorizontal: vw(4),
    justifyContent: 'space-between',
    paddingBottom: vh(2),
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
