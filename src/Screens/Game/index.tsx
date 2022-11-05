import {useEffect, useState} from 'react' 
import { View, TouchableOpacity, Image, FlatList, Text} from 'react-native';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'

import {SafeAreaView} from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'

import {useRoute, useNavigation} from '@react-navigation/native'

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setdiscordDuoSelected] = useState('')
  
  function handleGoBack() {
    navigation.goBack();
  }

  function getDiscordUser(adsId :string) {
    fetch(`http://192.168.0.8:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setdiscordDuoSelected(data.discord))
  }

  useEffect(()=> {
    fetch(`http://192.168.0.8:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size= {20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
            resizeMode="cover"
          />

          <View style={styles.right}/>
        </View>

        <Image source={{uri: game.bannerUrl}} style={styles.cover}/>

        <Heading title={game.title} subtitle="Conect-se e comece a jogar!"/>

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item})=> (
            <DuoCard data={item} onConnect={()=> getDiscordUser(item.id)}/>
            )}
          horizontal
          style={duos.length > 0 ? styles.containerList : styles.emptyListContainer}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>
              Não há anúncios ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() =>setdiscordDuoSelected('')}
        />
        

      </SafeAreaView>
    </Background>
  );
}