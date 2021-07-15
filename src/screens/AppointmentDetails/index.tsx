import React, { useState, useEffect } from 'react';
import { 
        ImageBackground, 
        Text, 
        View, 
        FlatList,
        Alert
    } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { api } from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png';

import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import  { Member , MemberProps} from  '../../components/Member';
import  { ListDivider } from  '../../components/ListDivider';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];  
}

export function AppointmentDetails(){
    const [widget, setWidget]  = useState<GuildWidget>({} as GuildWidget);
    const [ loading, setLoading ] = useState(true);

    const route = useRoute()
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget(){
        try{
           const response =  await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
           setWidget(response.data);  
             
           if(response.data.members.length === 0){
               return Alert.alert('Não há ninguém online neste servidor no momento!');
           }
        }catch{ 
            Alert.alert('Verifique se a opção Widget está habilitada no servidor.');  
        }finally {
            setLoading(false);
        }
    
    }

    useEffect(()=>{
        fetchGuildWidget()
    }, []);

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
                            { guildSelected.guild.name }
                        </Text>

                        <Text style={styles.subTitle}> 
                            { guildSelected.description}
                        </Text>
                   </View>

               </ImageBackground> 

               { 
                loading ? <Load/> :
                    
               <>
                    <ListHeader              
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList              
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item})=>(
                                <Member data={ item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                    />

                </>        

               }
                <View style={styles.footer}>
                    <ButtonIcon
                        title="Entrar na partida" />
                </View>
       </Background>

    );
}