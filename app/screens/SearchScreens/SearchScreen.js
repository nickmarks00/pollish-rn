import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import {BASE_IP} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useNavigation } from '@react-navigation/native';
import SearchPollView from './SearchPollView';
import { SearchBar } from 'react-native-paper';
import { PollQuestion } from '../PollScreens';

const dimensions = Dimensions.get('screen');

const SearchScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([]);

    const [filteredData, setfilteredData] = useState([]);
    const [masterData, setmasterData] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchDataFromApi();
      }, []);

      const fetchDataFromApi = async () => {
        const url = `http://${BASE_IP}/pollish/polls/`;
    
        setLoading(true);
    
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            setPosts(data.results);
            console.log(data.results);
            setImages(data.results.images);
            setfilteredData(data.results);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });

          console.log(res)
          console.log("hi")

          
      };

    const searchFilter = (text) => {
        if (text) {
            const newData = posts.filter((item) => {
                const itemData = item.question_text ? item.question_text.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilteredData(newData);
            setSearch(text);
        } else {
            setfilteredData(posts);
            setSearch(text);
        }
    }

    function handleComment(){
        const newlist = comments.concat({'item': text, 'idx': uuid.v4()})
        addComment(newlist);
    }

    return (
        <View>
            <View style ={{ justifyContent: 'flex-end', marginTop: 50, marginBottom: 10, padding: 0, flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                style={styles.comment_input}
                onChangeText={(text) => searchFilter(text)}
                value={search}
                placeholder="What do you want to know?"
                />
                <Button
                onPress={handleComment}
                title="Search"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>

            <View style={{width: dimensions.width, height: dimensions.height/70, backgroundColor: '#00A6A6'}}/>


            
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>

                <View>
                    
                    {posts.map((post, idx) => {
                        // console.log("hi")
                        var item = ""
                        // console.log(images)
                        return (
                            <TouchableOpacity key={idx} onPress={() => navigation.navigate('PollFromSearch', { post: post})}>
                            <View  style={{backgroundColor: (idx % 2 == 0) ? '#FFF' : '#F7F7F7' , height: dimensions.height/8, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', paddingHorizontal: '5%', borderBottomWidth: 1, borderColor: 'rgba(0,166,166,0.4)'}}>
                                {post.images[0] ?
                                <Image
                                    resizeMode='cover'
                                    key={idx}
                                    source={{uri: `http://${BASE_IP}${post.images[0].image}`}}
                                    style={{width: dimensions.height/10, aspectRatio: 1, borderRadius: 10, borderWidth: 2, borderColor: '#00A6A6'}}
                                />
                                : <View/>}
                                <PollQuestion question={post.question_text} size={12}/>

                                {/* <Text>{post.images[0] ? post.images[0].image : 'hi'}</Text> */}
                            </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                
            </ScrollView>
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    comment_input: {
        height: 40,
        width: dimensions.width/1.3,
        margin: 12,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#BBB',
        padding: 10,
      },

    post_container: {
        width: dimensions.width,
        height: dimensions.height/12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    post_image: {
        height: dimensions.height/15,
        width: dimensions.width/3
    },

    text: {
        width: dimensions.width*(2/3),
        textAlign: 'center',
    }
})