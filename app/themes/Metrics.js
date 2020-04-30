import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const PR = 2;

// Used via Metrics.baseMargin
const metrics = {
  isSmallDevice: width <= 320 && height <= 568,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 32 / PR,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 2 / PR,
  leftPadding: 32 / PR,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  ratio: PixelRatio.get(),
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
};

export default metrics;
