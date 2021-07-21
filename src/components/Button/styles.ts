import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme';

export const styles =  StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.primary,
        borderRadius: 8, 
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary 
    },    
    title:{
        flex:1,
        color: theme.colors.heading,
        fontFamily: theme.fonts.text500,
        fontSize: 15,
        textAlign: 'center'
    }
});