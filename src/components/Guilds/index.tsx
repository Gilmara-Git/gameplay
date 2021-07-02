import React from  'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildProps } from '../Guild';
import  { ListDivider } from '../ListDivider';

import { styles } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps ) => void;
}

export function Guilds({ handleGuildSelect }: Props){

    const guilds = [
        {
            id: '1', 
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2', 
            name: 'Moçada punk',
            icon: 'image.png',
            owner: false
        },
        {
            id: '3', 
            name: 'Canários',
            icon: 'image.png',
            owner: false
        },
        {
            id: '4', 
            name: 'xctiva',
            icon: 'image.png',
            owner: true
        }
];

    return(

            <View style={styles.container}>
                <FlatList
                    data={guilds}
                    keyExtractor={(item => item.id )} 
                    renderItem={({item}) =>(
                        <Guild data={item}
                               onPress={()=>handleGuildSelect(item)}       
                        />
                    )} 
                    showsVerticalScrollIndicator={false} 
                    ItemSeparatorComponent={ () => <ListDivider />}
                    style={styles.guilds}             
                />

            </View>

  

    )
};