import React from 'react';
import { View, Image, FlatList} from 'react-native';

import { styles } from './styles';
import LogoImg from '../../assets/logo-nlw-esports.png' 
import { Heading } from '../../components/Heading';

import { GAMES } from '../../utils/games';
import { GameCard } from '../../components/GameCard';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={LogoImg} style={styles.logo}/>
      <Heading 
        title="Encontre seu duo!" 
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList 
        data={GAMES}
        renderItem={({item}) =><GameCard data={item}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatListStyle}
        contentContainerStyle={styles.contentList}
        
      />

      
      
    </View>
  );
}