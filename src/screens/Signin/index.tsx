import React from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native';
import { styles } from './styles';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth'

import IllustrationImg from "../../assets/illustration.png";
import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

export function SignIn() {
    const navigation = useNavigation();
    const { user } = useAuth();  

    function handleSign(){
        navigation.navigate('Home')
    }

    return (
        <Background>
            <View style={styles.container}>           
                <Image source={IllustrationImg}
                    style={styles.image}
                    resizeMode="stretch" />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {'\n'}
                        e organize suas {'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        com seu amigos
                    </Text>

                    <ButtonIcon 
                    title='Entrar com Discord'                
                    onPress={handleSign}
                    />    
                </View>
            </View>
        </Background>
    );
}