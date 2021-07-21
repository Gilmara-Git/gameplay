import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type Props = TouchableOpacityProps & { 
    title: string;
}

export function ButtonYes( {title, ...rest}:Props){
    return(
        <TouchableOpacity
            style={styles.container}
            {...rest }
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
       
    )
}