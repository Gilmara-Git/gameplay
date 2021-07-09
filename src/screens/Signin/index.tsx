import React from 'react';

import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import IllustrationImg from "../../assets/illustration.png";


import { useAuth } from '../../hooks/auth'

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

export function SignIn() {
    const { signIn, loading } = useAuth();  

    async function handleSign(){
       try{
         await signIn()

       }catch(error){
        Alert.alert(error);
       }
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

                    { 
                        loading ? 
                        <ActivityIndicator color={theme.colors.primary} />  :
                        <ButtonIcon 
                            title='Entrar com Discord'                
                            onPress={handleSign}
                        />    
                    }

                </View>
            </View>
        </Background>
    );
}