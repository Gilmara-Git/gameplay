import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles';

type Props = RectButtonProps & { 
    title: string;
}

export function ButtonYes( {title, ...rest}:Props){
    return(
        <RectButton
            style={styles.container}
            {...rest }
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </RectButton>
       
    )
}