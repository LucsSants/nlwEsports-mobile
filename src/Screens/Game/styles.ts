import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  header: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:32,
    marginTop: 28,
    justifyContent: 'space-between',
  },
  logo: {
    width: 72,
    height: 40,
  },
  right: {
    width: 20,
    height: 20
  },
  cover: {
    width: "85%",
    height: 160,
    borderRadius: 8,
    marginTop: 32,
  },
  containerList: {
    flexGrow: 0,
  },
  contentList: {
    paddingLeft: 32,
    paddingRight:64,
    alignItems: 'flex-start'
  },
  emptyList: {
    color: THEME.COLORS.CAPTION_400,
    fontSize: THEME.FONT_SIZE.MD,
  },
  emptyListContent : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListContainer: {
    flexGrow:1
  }
});