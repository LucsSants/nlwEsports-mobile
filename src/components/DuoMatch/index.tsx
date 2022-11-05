import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Pressable, Alert, ActivityIndicator} from 'react-native';

import Toast, {BaseToast} from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard'

import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string,
  onClose: () => void
}

export function DuoMatch({discord,onClose, ...rest} : Props) {
  const [isCopying, setIsCopying] = useState(false)

  async function hanndleDiscordToClipboard() {
    setIsCopying(true)
    await Clipboard.setStringAsync(discord)

    Toast.show({
      type:'success',
      text1:'Usuário Copiado!',
      position: 'bottom'
    })
    setIsCopying(false)

  }

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: THEME.COLORS.PRIMARY, backgroundColor:THEME.COLORS.BACKGROUND_800, borderLeftWidth: 15}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color:THEME.COLORS.TEXT,
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    )
  }

  return (
    <Modal
    transparent
    statusBarTranslucent
    onRequestClose={onClose}
    animationType="fade"
    {...rest}
    >
      <Pressable onPress={onClose} style={styles.container}>
        <Toast config={toastConfig}/>
        <View style={styles.content}>
          <TouchableOpacity 
          style={styles.closeIcon} 
          onPress= {onClose}
          >
            <MaterialIcons 
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
              />
              
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{alignItems: 'center', marginTop:24}}
          />
          <Text style={styles.label}>
            Adcione no Discord
          </Text>

          <TouchableOpacity
            onPress={hanndleDiscordToClipboard}
            style={styles.discordButton}
            disabled ={isCopying}
          >
            {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : <Text style={styles.discord}>{discord}</Text>}
          </TouchableOpacity>
        </View>

      </Pressable>
    </Modal>
  );
}