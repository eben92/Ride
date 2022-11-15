import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navSlice';
import NavFavourites from '../components/NavFavourites';

// const GOOGLE_MAP_APIKEY = ""

const HomeScreen = () => {
  const dispatch = useDispatch();

  console.log(GOOGLE_MAP_APIKEY);

  return (
    <Screen style={tw`bg-white h-full`}>
      <View style={tw`p-5 flex w-full h-full flex-col-reverse`}>
        <Text style={tw`text-3xl`}>Hello world</Text>
        <View style={tw`mb-3 w-full`}>
          <GooglePlacesAutocomplete
            placeholder='Where from?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  loaction: details.geometry.location,
                  description: data.description
                })
              );
              dispatch(setDestination(null));
            }}
            minLength={2}
            fetchDetails={true}
            returnKeyType={'search'}
            onFail={(error) => console.error(error)}
            query={{
              key: GOOGLE_MAP_APIKEY,
              language: 'en'
            }}
            styles={{
              container: {
                flex: 0
              },
              textInput: {
                fontSize: 15
              }
            }}
            enablePoweredByContainer={false}
          />
        </View>
        <View style={tw`w-full mb-4 flex bg-yellow-500`}>
          <NavOptions />
        </View>
        <NavFavourites />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 20
  }
});

export default HomeScreen;
