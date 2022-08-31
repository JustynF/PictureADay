import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImageData from "../../@types/ImageData";

interface Props {
  data: ListRenderItemInfo<ImageData>;
}

const ImageListItem: React.FC<Props> = ({ data }) => {
  const { width } = useWindowDimensions();
  const { item, index } = data;
  const translateY = useRef<Animated.Value>(new Animated.Value(50)).current;
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * (400 / 3),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * (400 / 3),
        useNativeDriver: true,
      }),
    ]).start();
  });

  const imageSize = width - 48;

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={{ height: imageSize / 2, width: imageSize }}
          source={{uri:item.url}}
          resizeMode="stretch"
        />
        <Icon
          style={{ position: 'absolute', right: 0, padding: 16 }}
          name="favorite-border"
          size={24}
          color="#54D3C2"
          onPress={() =>{
            console.log("ressed")
          }}


        />
      </View>
      <View style={{ padding: 8, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const textStyle = {
  color: 'rgba(128,128,128, 0.46)',
  fontFamily: 'WorkSans-Regular',
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
    // overflow: 'hidden',
    elevation: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  imageContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  title: { flex: 1, fontSize: 22, fontFamily: 'WorkSans-SemiBold' },
  subText: {
    ...textStyle,
    flex: 1,
    paddingRight: 4,
  }
});

export default ImageListItem;
