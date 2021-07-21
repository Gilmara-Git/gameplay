import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';


export const styles = StyleSheet.create({
    container:{
        width: 160,
        height: 60, 
        borderWidth:1, 
        borderColor: theme.colors.secondary30,        
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    text:{
        width: 29,
        height: 25,
        color: theme.colors.heading,

    }
});