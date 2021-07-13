import React from 'react';
import { ImageBackground, Text, View, FlatList  } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png';

import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import  { Member } from  '../../components/Member';
import  { ListDivider } from  '../../components/ListDivider';



export function AppointmentDetails(){
    const members = [ 
        { 
            id: "1", 
            username: 'Gilmara', 
            avatar_url: "https://github.com/gilmara-git.png", 
            status: 'online'
        },

        { 
            id: "2", 
            username: 'Rodrigo', 
            avatar_url: "https://github.com/rodrigorgtic.png", 
            status: 'offline'
        },

]

    return (
       <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            color={theme.colors.primary}
                            size={24}
                        />
                    </BorderlessButton>
                }
               
            />

               <ImageBackground
                style={styles.banner}
                source={BannerImg}                
               >
                   <View style={styles.bannerContent}>
                        <Text style={styles.title}> 
                            Lendários          
                        </Text>

                        <Text style={styles.subTitle}> 
                            É hoje que vamos chegar ao challenger sem perder uma partida de md10         
                        </Text>
                   </View>

               </ImageBackground> 

               <ListHeader              
                title="Jogadores"
                subtitle="Total3"
               />

               <FlatList              
                    data={members}
                    keyExtractor={item => item.id}
                    renderItem={({ item})=>(
                        <Member data={ item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    style={styles.members}
               />
                <View style={styles.footer}>
                    <ButtonIcon
                        title="Entrar na partida" />
                </View>

       </Background>

    );
}