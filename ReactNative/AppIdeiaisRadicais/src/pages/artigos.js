import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image,TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';

import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';

import logo from '../../assets/banner_logo_.png';

export default function Artigos({navigation}) {
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    async function loadArtigos() {
      const response = await api.get('/wp-json/wp/v2/posts?_embed');
      setArtigos(response.data);
    }
    loadArtigos();
  }, []);

  function handleClick(id, aux)
  {
    console.log("handle: " + id);
    navigation.navigate('ViewArtigo',{id, aux});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      {/* <View style={styles.VHeader}>
      
      <Text  style={styles.Header}>Artigos</Text>
      </View> */}
      {/* <Text style={styles.Header}>Artigos - Ideias Radicais</Text> */}
      <FlatList
        style={styles.list}
        data={artigos}
        keyExtractor={artigo => artigo.id.toString()}
        vertical
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> handleClick(item.id, item) }>
          <View style={styles.item}>
            <Image style={styles.thumbnail} source={{ uri: item._embedded['wp:featuredmedia']['0'].source_url }} />
            <View vertical style={styles.textContainer}>
              <HTMLView
                value={"<titulo>"+item.title.rendered+"</titulo>"}
                stylesheet={styles}
              />
              <Text style={styles.text}>{item.date} </Text>
              <HTMLView
                value={item.excerpt.rendered}
                stylesheet={styles}
              />
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  textContainer:{

    justifyContent: 'flex-start',
    flexDirection:'column',
    paddingLeft: 10,
    height:60,
    width:'70%'
  },
  p:{
    color: '#fff',
    fontSize: 14,
    flexWrap:'wrap',
    flexDirection:'row',
    textAlignVertical: 'top'
  },
  text:
  {
    fontSize: 10,
    color: '#ddd',
    flexWrap: 'wrap',
    textAlignVertical: 'top'
  },
  titulo:
  {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    flexWrap: 'wrap',
    textAlignVertical: 'top'
  },
  list: {
    flex:1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    color: '#fff',
    alignContent:'stretch',
  },
  VHeader: {
    flex: 1,
    flexDirection: 'row',
    color: '#fff',
    height: 60,
  },
  thumbnail: {
    width: '30%',
    height: 80,
    resizeMode: 'cover'
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode:'center',
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
});
