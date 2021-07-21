import React, { ReactNode } from 'react';

import {
  View,
  Text,
  Modal,
  ModalProps
} from 'react-native';

import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';


type Props = ModalProps & {
    title: string;
    titleComplement:string;
    children: ReactNode;
}

export function ModalSignOut(
    {   title, 
        titleComplement,
        children, 
        ...rest }
        : Props){

const {  secondary80, secondary100 }  =  theme.colors;

  return (

    <Modal
        transparent
        animationType="fade"
        statusBarTranslucent
        { ...rest }
    >
        <View style={styles.overlay}>
      
            <LinearGradient 
                colors={[ secondary80, secondary100]}
            >
                
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleDetails}>
                        {title}
                    </Text>
                    <Text style={styles.titleComponentDetails}>
                        { titleComplement }
                    </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    { children }
                </View>

            </View>
            </LinearGradient>   
        </View>
    </Modal>

  );
}