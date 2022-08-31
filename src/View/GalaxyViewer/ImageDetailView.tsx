import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Pressable,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../Config';

interface Props {route:any}

const infoHeight = 364.0;

const ImageDetailView: React.FC<Props> = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const marginTop =
    Platform.OS === 'ios' ? Math.max(insets.top, 20) : StatusBar.currentHeight;

  const favIconScale = useRef<Animated.Value>(new Animated.Value(0.1));
  const opacity1 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity2 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity3 = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(favIconScale.current, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(opacity1.current, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2.current, {
        toValue: 1,
        duration: 500,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity3.current, {
        toValue: 1,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const boxedInfoItem = (text1: string, text2: string) => (
    <View style={styles.boxInfoContainer}>
      <Text style={[styles.textStyle, styles.boxInfoTitle]}>{text1}</Text>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>{text2}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ height: window.width / 1.2 }}
        source={{uri:route.params.itemData.url}}
      >
        <View
          style={{
            flex: 1,
            shadowColor: 'grey',
            shadowOffset: { width: 1.1, height: 1.1 },
            shadowOpacity: 0.2,
            shadowRadius: 10.0,
          }}
        >
          <ScrollView
            style={[
              styles.scrollContainer,
              {
                marginTop: window.width / 1.2 - 24,
                paddingBottom: insets.bottom,
              },
            ]}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: infoHeight,
              // maxHeight: tempHeight > infoHeight ? tempHeight : infoHeight,
            }}
          >
            <Text style={styles.imageTitle}>{route.params.itemData.title}</Text>
            <View style={styles.imageDateContainer}>
              <Text
                style={[
                  styles.textStyle,
                  { flex: 1 },
                ]}
              >
                {route.params.itemData.date}
              </Text>
              <Text style={styles.textStyle}>{route.params.itemData.service_version}</Text>
              <Icon name="star" size={24} color="#54D3C2" />
            </View>
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: 8,
                opacity: opacity1.current,
              }}
              renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
            >

            </Animated.View>
            <Animated.Text
              style={[styles.imageDescription, { opacity: opacity2.current }]}
            >
              {route.params.itemData.explanation}
            </Animated.Text>
          </ScrollView>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            { marginTop, opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'darkgrey', borderless: true, radius: 28 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-ios" size={24} color="white" />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 8,
    elevation: 16,
  },
  imageTitle: {
    fontSize: 22,
    fontFamily: 'WorkSans-SemiBold',
    letterSpacing: 0.27,
    paddingTop: 32,
    paddingLeft: 18,
    paddingRight: 16,
  },
  imageDateContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'WorkSans-Regular',
    color: 'darkslategrey',
    letterSpacing: 0.27,
  },
  boxInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    margin: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: 'grey',
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.22,
    shadowRadius: 8.0,
  },
  boxInfoTitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: 'rgb(0, 182, 240)',
  },
  imageDescription: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'justify',
    color: 'darkslategrey',
    letterSpacing: 0.27,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addView: {
    width: 48,
    height: 48,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageDetailView;
