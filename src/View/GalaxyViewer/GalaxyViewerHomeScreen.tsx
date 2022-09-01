import React, {useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import useHomeViewModel from '../../ViewModel/GalaxyHomeViewModel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageListItem from './ImageListItem';
import Config from '../../Config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CalendarPopup from './CalendarPopupView';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const HALF_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const GalaxyViewerHome = () => {
  const inset = useSafeAreaInsets();

  const {
    images,
    showCal,
    startDate,
    endDate,
    getImages,
    setStartDate,
    setEndDate,
    setShowCal,
    data,
    isLoading,
    isFetching,
  } = useHomeViewModel();

  useEffect(() => {
    getImages(data);
  }, [data]);

  const navigation = useNavigation();
  return (
    <>
      <View />
      <View style={{flex: 1, backgroundColor: 'rgb(242, 242, 242)'}}>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'white',
            paddingBottom: inset.bottom,
          }}
          data={images}
          renderItem={(payload) =>
            payload.index > 0 ? (
              <Pressable
                onPress={() => {
                  console.log(payload.item.title);
                  navigation.navigate('DetailView', {
                    itemData: payload.item,
                  });
                }}>
                <ImageListItem {...{data: payload}} />
              </Pressable>
            ) : (
              <View>
                <View style={styles.stickyHeaderContainer}>
                  {!isLoading && !isFetching && payload ? (
                    <>
                      <Text style={styles.imageCountText}>
                        {images.length} Images Found
                      </Text>
                      <Pressable
                        style={{flexDirection: 'row', padding: 8}}
                        android_ripple={{color: 'lighgrey'}}
                        onPress={() => console.log('How did this PRINT? THAT')}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'WorkSans-Regular',
                          }}>
                          Filter
                        </Text>
                        <Icon
                          style={{paddingHorizontal: 8}}
                          name="sort"
                          size={24}
                          color="#54D3C2"
                        />
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Text style={styles.imageCountText}>Loading Images</Text>
                      <Pressable
                        style={{flexDirection: 'row', padding: 8}}
                        android_ripple={{color: 'lighgrey'}}
                        onPress={() => console.log('How did this PRINT? THAT')}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'WorkSans-Regular',
                          }}>
                          fetching
                        </Text>
                        <ActivityIndicator size="small" color="#0000ff" />
                      </Pressable>
                    </>
                  )}
                </View>
                <Pressable
                  onPress={() => {
                    console.log(payload.item.title);
                    navigation.navigate('DetailView', {
                      itemData: payload.item,
                    });
                  }}>
                  <ImageListItem {...{data: payload}} />
                </Pressable>
              </View>
            )
          }
          keyExtractor={item => item.url.toString()}
          stickyHeaderIndices={[0]}
          nestedScrollEnabled
          onEndReachedThreshold={0.5}
          ListHeaderComponent={() => (
            <View style={{flex: 1, backgroundColor: 'rgb(242, 242, 242)'}}>
              <View style={{flex: 1, flexDirection: 'row', padding: 16}}>
                <Text style={{backgroundColor: 'rgb(242, 242, 242)'}} />
              </View>
              <View style={styles.headerDetailContainer}>
                <Pressable
                  style={({pressed}) => [
                    styles.headerSectionContainer,
                    {opacity: !Config.isAndroid && pressed ? 0.6 : 1},
                  ]}
                  android_ripple={{color: 'lighgrey'}}
                  onPress={() => setShowCal(true)}>
                  <Text style={styles.headerDetailTitle}>Choose date</Text>
                  <Text style={{fontSize: 16, fontFamily: 'WorkSans-Regular'}}>
                    {String(startDate.getDate()).padStart(2, '0')},{' '}
                    {HALF_MONTHS[startDate.getMonth()]} -{' '}
                    {String(endDate.getDate()).padStart(2, '0')},{' '}
                    {HALF_MONTHS[endDate.getMonth()]}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
      <CalendarPopup
        {...{showCal, setShowCal}}
        minimumDate={new Date()}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onApplyClick={(startData, endData) => {
          if (startData != null && endData != null) {
            setStartDate(startData);
            setEndDate(endData);
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerDetailTitle: {
    color: 'darkgrey',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'WorkSans-Regular',
  },
  headerSectionContainer: {flex: 1, paddingHorizontal: 8, paddingVertical: 4},
  stickyHeaderContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    // marginHorizontal: 8,
  },
  imageCountText: {
    flex: 1,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'WorkSans-Regular',
  },
});

export default GalaxyViewerHome;
