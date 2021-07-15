import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';

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

import { styles } from './styles'

export function Home(){ 
    const [category, setCategory] = useState('');
    const [appointments, setAppointments ] = useState<AppointmentProps[]>([]);
    const [ loading, setLoading ] = useState(true);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') :  setCategory(categoryId);
    }

    function handleAppointmentDetails(){
        console.log("App Details")
        navigation.navigate('AppointmentDetails');
    }

    function handleAppointmentCreate(){
        console.log("App Create")
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointmentsStorage : AppointmentProps[] = response ? JSON.parse(response) : []; 

        if(category){
            setAppointments(appointmentsStorage.filter(item => item.category === category))
        }else{
            setAppointments(appointmentsStorage)
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(()=>{
        loadAppointments();
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                
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
                                    onPress={handleAppointmentDetails}
                                />
                                )}
                                ItemSeparatorComponent={ ()=> <ListDivider />}
                                contentContainerStyle={ {paddingBottom: 69}}
                                style={styles.matches}
                                showsVerticalScrollIndicator={false}
                            />
                    </>
               }
        </Background>
    );
}