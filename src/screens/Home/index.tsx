import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database'

import { Profile }  from '../../components/Profile';
import { ButtonAdd } from  '../../components/ButtonAdd';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentProps } from '../../components/Appointment';
import  { ListDivider } from '../../components/ListDivider';
import  { Load } from '../../components/Load';
import { ModalSignOut } from '../../components/ModalSignOut';
import { ButtonNo } from '../../components/ButtonNo';
import { ButtonYes } from '../../components/ButtonYes';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';


export function Home(){ 
    const [category, setCategory] = useState('');
    const [appointments, setAppointments ] = useState<AppointmentProps[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ openModal, setOpenModal ] = useState(false);

    const { signOut } = useAuth();
    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') :  setCategory(categoryId);
    }

  async function handleAppointmentDetails(guildSelected : AppointmentProps){
  
        navigation.navigate('AppointmentDetails', { guildSelected } );
    }

    function handleAppointmentCreate(){     
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage : AppointmentProps[] = response ? JSON.parse(response) : []; 
        
        if(category){
            setAppointments(storage.filter(item => item.category === category))
        }else{  
            setAppointments(storage.filter(item => item.category !== ""))
        }
        setLoading(false);
    }

    function handleCloseModalSignOut(){
        setOpenModal(false);
    }

    function handleOpenModalSignOut(){
        setOpenModal(true);
    }

    function handleSignOut(){
        signOut();
    }

    useFocusEffect(useCallback(()=>{
        loadAppointments();
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <RectButton
                    onPress={handleOpenModalSignOut}
                >
                    <Profile/>
                </RectButton>
                
                <ButtonAdd
                     onPress={handleAppointmentCreate} 
                />
            </View>

                <CategorySelect
                    categorySelected={category} 
                    setCategory={handleCategorySelect}   
                /> 

               {    
                    loading ? <Load /> :
                    <>  
                        <ListHeader
                            title='Partidas agendadas'
                            subtitle={`Total ${appointments.length}`}
                        />
                                    
                            <FlatList
                                data={appointments}
                                keyExtractor={ item => item.id}
                                renderItem={({ item }) => (
                                <Appointment data={ item }
                                    onPress={()=> handleAppointmentDetails(item)}
                                />
                                )}
                                ItemSeparatorComponent={ ()=> <ListDivider />}
                                contentContainerStyle={ {paddingBottom: 69}}
                                style={styles.matches}
                                showsVerticalScrollIndicator={false}
                            />
                    </>
               }
               <ModalSignOut
                    visible={openModal}
                    title="Deseja sair do Game"
                    titleComplement="Play"
               >
                  
                        <ButtonNo
                            onPress={handleCloseModalSignOut}                            
                            title="Não"
                        />
                        <ButtonYes
                            onPress={handleSignOut}
                            title="Sim"
                        />
                 
               </ModalSignOut>
        </Background>
    );
}