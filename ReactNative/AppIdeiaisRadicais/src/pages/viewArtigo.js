import React from 'react';
import {  View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink'

import HTMLView from 'react-native-htmlview';

import api from '../services/api';

export default function ViewArtigo({ navigation }) {
    //const [artigo, setArtigo] = useState({});
    const id = navigation.getParam('id');
    const artigo = navigation.getParam('aux');

    function renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'iframe') {
          const a = node.attribs;
          const iframeHtml = `<iframe src="${a.src}"></iframe>`;
          return (
              null
        //     <Hyperlink linkDefault={ true } key={index}>
        //     <Text style={ { fontSize: 15 } }>
        //       {a.src}
        //     </Text>
        //   </Hyperlink>
            // <Text>{iframeHtml}</Text>
            // <WebView source={{uri: a.src}} />
            // <View key={index} style={{width: Number(a.width), height: Number(a.height)}}>
            //   <WebView source={{html: iframeHtml}} />
            // </View>
          );
        }
      }

    // useEffect(() => {
    //     //setArtigo(aux);
    //     // async function loadArtigo() {
    //     //     var url = "/wp-json/wp/v2/posts/" + id + "?_embed";
    //     //     console.log("URL:" + url);
    //     //     const response = await api.get(url);
    //     //     console.log(response);
    //     //     setArtigo(response.data);
    //     // }

    //     // loadArtigo();

    // }, []);
    console.log(id);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  vertical style={styles.textContainer}>

            <Image style={styles.thumbnail} source={{ uri: artigo._embedded['wp:featuredmedia']['0'].source_url }} />
                <HTMLView
                    value={"<titulo>" + artigo.title.rendered + "</titulo>"}
                    stylesheet={styles}
                />
                    {/* <Text style={styles.p}>{artigo.content.rendered}</Text> */}
                    {/* <WebView
                     originWhitelist={['*']}
                     style={{color:'#fff'}}
                     source={{ html:  '<h1>Texto</h1>'}}
                   /> */}
                 <HTMLView
                 originWhitelist={['*']}
                value={"<body>"+ artigo.content.rendered.toString().replace(/[\n\r]+/g,"")+"</body>"}
                stylesheet={styles}
                renderNode={renderNode}
              />
            </ScrollView >
        </SafeAreaView>
    );
    //testes
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        paddingLeft: 10,
        height: 60,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    p: {
        color: '#fff',
        fontSize: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
      
    },
    ul:{
      alignContent:'center'
    },
    body: {
        
        color: '#fff'
    },
    text:
    {
        height: 30,
        fontSize: 10,
        color: '#fff',
        flexWrap: 'wrap'
    },
    list: {
        marginTop: 40
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        color: '#fff',
    },
    thumbnail: {
        flex: 1.0,
        height:240,
        resizeMode: 'contain'
    },
    Header: {
        position: 'absolute',
        top: 0,
        height: 40,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
