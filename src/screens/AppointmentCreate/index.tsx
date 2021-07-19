import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { 
    Text, 
    View,
    ScrollView,
    KeyboardAvoidingView, 
    Alert  
} from 'react-native';
import  { useNavigation}  from '@react-navigation/native'

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';


import { Feather } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import  { CategorySelect } from  '../../components/CategorySelect';
import  { GuildIcon } from  '../../components/GuildIcon';
import  { SmallInput } from  '../../components/SmallInput';
import { TextArea } from  '../../components/TextArea';
import { Button } from  '../../components/Button';
import { ModalView } from  '../../components/ModalView';
import { Guilds } from  '../../components/Guilds';
import { GuildProps } from '../../components/Guild';


export function AppointmentCreate(){    
    const [category, setCategory] = useState('');
    const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
    const [ guild, setGuild ] =  useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');
    
    const navigation = useNavigation();

   console.log('linha47',day)
    
    function handleCategorySelect(categoryId: string){
        setCategory(categoryId);
    }

    function handleOpenGuilds(){
        setOpenGuildsModal(true);
    }
    
    function handleCloseGuilds(){
        setOpenGuildsModal(false);
    }
    
    function handleGuildSelect( guildSelect: GuildProps){
        setGuild(guildSelect);        
        setOpenGuildsModal(false);
    }

   
    async function handleSave(){
        
        if(!day) return Alert.alert('Preencha o dia.');
        if(!month) return Alert.alert('Preencha o mês.');
        if(!hour) return Alert.alert('Preencha a hora.');
        if(!minute) return Alert.alert('Preencha o minuto.');
        if(!description) return Alert.alert('Preencha uma descrição.');
       

        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} as ${hour}:${minute}h`,
            description
        }
    
        if(!newAppointment.category) {
           return Alert.alert('Por favor selecione uma categoria acima!')
        }


        const storage  = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];
       
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS, 
            JSON.stringify([...appointments, newAppointment])
            );

            navigation.navigate('Home');    
    }
    

    return (
        <KeyboardAvoidingView 
            style={styles.container}
          
        >
            <Background>
                <ScrollView>
                            <Header
                                title="Agendar Partida"               
                            /> 

                            <Text style={ [
                                styles.label, 
                                { 
                                    marginLeft: 24,
                                    marginTop: 36,
                                    marginBottom: 18

                                    }]}>
                                Categoria
                                </Text> 
                    
                            <CategorySelect
                                hasCheckBox
                                categorySelected={category}
                                setCategory={handleCategorySelect}
                                /> 

                            <View style={styles.form}>
                                <RectButton onPress={handleOpenGuilds}>
                                    <View style={styles.select}> 
                                        
                                    {                                 
                                        guild.icon ? <GuildIcon 
                                                        guildId={guild.id} 
                                                        iconId={guild.icon}
                                                        /> 
                                                    :  <View style={styles.image}/>                                    
                                    }

                                        <View style={styles.selectBody}>
                                            <Text style={styles.label}>
                                                { 
                                                    guild.name ? guild.name : ' Selecione um servidor'
                                                }
                                            
                                            </Text>
                                        </View>

                                        <Feather
                                            name='chevron-right'
                                            color={theme.colors.heading}
                                            size={18}
                                        />

                                    </View>
                                </RectButton>  
                            
                                
                                <View style={styles.field}>
                                    <View>
                                        <Text style={styles.label}>
                                            Dia e mês
                                        </Text>

                                        <View style={styles.column}>
                                            <SmallInput maxLength={2}
                                                        onChangeText={setDay}                                                                                       
                                            />

                                            <Text style={styles.divider}>
                                                /
                                            </Text>
                                            <SmallInput maxLength={2}
                                                        onChangeText={setMonth}
                                            />
                                        </View>  
                                                            
                                    </View>

                                    <View>
                                        <Text style={styles.label}>
                                            Hora e minuto
                                        </Text>

                                        <View style={styles.column}>
                                            <SmallInput maxLength={2}                                                        
                                                        onChangeText={setHour}
                                            />

                                            <Text style={styles.divider}>
                                                :
                                            </Text>
                                            <SmallInput maxLength={2}
                                                        onChangeText={setMinute}
                                            />
                                        </View>                     
                                    </View>
                                </View>
                                    
                                    <View style={ [styles.field, { marginBottom: 12}]}>
                                        <Text style={styles.label}>
                                            Descrição
                                        </Text>

                                        <Text style={styles.caracteresLimit}>
                                            Max 100 caracteres
                                        </Text>
                                    </View>


                                    <TextArea
                                        multiline
                                        maxLength={100}
                                        numberOfLines={5}
                                        autoCorrect={false}
                                        onChangeText={setDescription}
                                    />   

                                <View style={styles.footer}>
                                    <Button title="Agendar" 
                                            onPress={handleSave}
                                    />
                                </View>
                                    
                            </View>           
                </ScrollView>
            </Background>

            <ModalView 
                visible={openGuildsModal}
                closeModal={handleCloseGuilds}                                            
            >
                  <Guilds handleGuildSelect={handleGuildSelect}/>                  
            </ModalView>
       </KeyboardAvoidingView>

    );
}