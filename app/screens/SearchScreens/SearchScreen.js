import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Button, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {BASE_IP} from '@env';
import { useNavigation } from '@react-navigation/native';
import SearchPollView from './SearchPollView';

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
        <View style={{flex: 1}}>
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

            <View style={{width: dimensions.width, height: dimensions.height/200, backgroundColor: '#00A6A6'}}/>
            <Text style={{padding: '5%'}}>Communities you may like</Text>
            <View style={{alignItems: 'center', flex: 1, marginHorizontal: Dimensions.get('screen').width*0.05, paddingVertical: '2%'}}>
                <ScrollView>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        
                        {posts.map((post, idx) => {
                            return (
                                <SearchPollView post={post} key={idx}/>
                            )
                        })}
                    </View>
                    
                </ScrollView>
            </View>
            <Text style={{padding: '5%'}}>Polls you may like</Text>
            <View style={{height: dimensions.height/2.3}}>
            <ScrollView>

                <View style>
                    
                    {posts.map((post, idx) => {
                        // console.log("hi")
                        var item = ""
                        // console.log(images)
                        return (
                            <SearchPollView post={post} key={idx}/>
                        )
                    })}
                </View>
                
            </ScrollView>
            </View>
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