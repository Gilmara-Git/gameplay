import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  overlay:{
      flex:1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end', 
 
  },  
  container: { 
    height: 152,  
    marginTop:26,
  },
  title:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 26
        
  },
  titleDetails: {
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading
  },
  titleComponentDetails: {
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.primary
  },
  buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: 24
  }
 
});