import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions, Button, TouchableOpacity, Image} from 'react-native';
import {BASE_IP} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('screen');

const SearchScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const [filteredData, setfilteredData] = useState([]);
    const [masterData, setmasterData] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchDataFromApi();
      }, []);

      const fetchDataFromApi = async () => {
        const url = `http://${BASE_IP}/polls/`;
    
        setLoading(true);
    
        const res = fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            setPosts(data);
            setfilteredData(data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
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
            <View style ={{ justifyContent: 'flex-end', marginTop: 50,padding: 0, flexDirection: 'row', alignItems: 'center'}}>
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

            <View>
                {filteredData.map((post, idx) => {
                    return (
                        <TouchableOpacity
                                key={idx}
                                onPress={() => 
                                    navigation.navigate('PollFromSearch', {question: post.question_text, choices: post.choices})
                                }
                            >
                        <View style={styles.post_container}>
                            <Image
                                source={require('../assets/lebron.jpg')}
                                style={styles.post_image}
                            />
                            
                                <Text style={styles.text}>{post.question_text}</Text>
                            
                        </View>
                        </TouchableOpacity>
                    )
                })}
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