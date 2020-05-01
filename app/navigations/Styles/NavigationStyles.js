import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.snow,
    paddingHorizontal: 7,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: Fonts.size.large,
    width: '50%',
  },
});
