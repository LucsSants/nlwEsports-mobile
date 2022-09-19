import { useEffect, useState } from 'react';
import { Image, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'

import { styles } from './styles';
import LogoImg from '../../assets/logo-nlw-esports.png' 
import { Heading } from '../../components/Heading';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation()

  function handleOpenGame({ id,title,bannerUrl }: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl})
  }

  useEffect(()=> {
    fetch('http://192.168.0.107:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={LogoImg} style={styles.logo}/>
        <Heading 
          title="Encontre seu duo!" 
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList 
          data={games}
          renderItem={({item}) =><GameCard data={item} onPress={()=> handleOpenGame(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatListStyle}
          contentContainerStyle={styles.contentList}
          
        />

      </SafeAreaView>
    </Background>
  );
}