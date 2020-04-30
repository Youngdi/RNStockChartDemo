// import { PixelRatio } from 'react-native'
// const PR = PixelRatio.get()
const PR = 2;

const type = {
  // base: 'Avenir-Book',
  // bold: 'Avenir-Black',
  // emphasis: 'HelveticaNeue-Italic'
};

// const size = {
//   h1: 38,
//   h2: 34,
//   h3: 30,
//   h4: 26,
//   h5: 20,
//   h6: 19,
//   input: 18,
//   regular: 17,
//   large: 16,
//   text: 15,
//   medium: 14,
//   small: 13,
//   tiny: 12,
//   navHeader: 16
// }

const size = {
  navHeader: 34 / PR,
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  large: 36 / PR,
  text: 15,
  medium: 32 / PR,
  small: 24 / PR,
  tiny: 12,
};

const style = {
  h1: {
    // fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    // fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    // fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    // fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    // fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    // fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    // fontFamily: type.base,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
