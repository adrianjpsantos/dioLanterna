import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import lightOff from './assets/icons/light-bulb.png';
import lightOn from './assets/icons/light-bulb-col.png';
import dioLogo from './assets/icons/logo_dio.png';
import dioLogoWhite from './assets/icons/logo_dio_white.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Quando o celular for chacoalhado,mudamos o toggle.
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    //Esta função vai ser chamada quando o componente for desmontado.
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity
        onPress={() => {
          handleChangeToggle();
        }}>
        <Image
          style={toggle ? style.lightbulbOn : style.lightbulbOff}
          source={toggle ? lightOn : lightOff}
        />
        <Image style={style.dioLogo} source={toggle ? dioLogo : dioLogoWhite} />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightbulbOff: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    tintColor: 'white',
  },
  lightbulbOn: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
});
