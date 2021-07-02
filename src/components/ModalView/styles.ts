import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    overlay:{
        backgroundColor: theme.colors.overlay,
        flex: 1

    },
    container: {
        flex:1,
        marginTop:100

    },
    bar:{
        width: 39,
        height: 2,
        borderRadius: 2,
        backgroundColor: theme.colors.secondary30,
        alignSelf: 'center',
        marginTop: 13,
    }
})