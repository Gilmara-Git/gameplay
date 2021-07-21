import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        width: 160,
        height: 60, 
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    text:{
        width: 29,
        height: 25,
        color: theme.colors.heading

    }
});