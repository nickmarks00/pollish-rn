import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import { getPoll, getPollVotes } from 'endpoints/pollish';


const dimensions = Dimensions.get('screen');

const url = REACT_APP_BASE_URL;


const PollCard = ({color, qText, id}) => {

    const [poll, setPoll] = React.useState(null)
    const [votes, setVotes] = React.useState(0)

    React.useEffect(() => {
        loadPoll();
    }, []);

    const loadPoll = async () => {
        if (id){
            const data = await getPoll(id);
            setPoll(data.data);

            const data2= await getPollVotes(id);
            setVotes(data2);
        }
    };

    return (
        <View style={{width: dimensions.width, flexDirection: 'row', paddingVertical: '4%', paddingHorizontal: '6%', justifyContent: 'center'}}>
            { poll?.images.length > 0 ? 
                <Image source={{uri: `http://${url}${poll.images[0].image}`}} style={{
                    height: dimensions.width/5,
                    width: dimensions.width/5,
                    aspectRatio: 1,
                    borderRadius: 15,
                    resizeMode: 'contain',
                    borderColor: '#ffeef7',
                }}/> :
                <View style={{
                    height: dimensions.width/5,
                    width: dimensions.width/5,
                    aspectRatio: 1,
                    borderRadius: 15,
                    resizeMode: 'contain',
                    borderColor: '#ffeef7',
                    backgroundColor: '#907AD6',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: dimensions.width/12, color: 'white'}}>{qText.slice(0,1)}</Text>
                </View>
            }

            <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold', flexWrap: 'wrap', paddingHorizontal: '7%'}}>{qText}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', flexWrap: 'wrap', paddingHorizontal: '7%', color: '#9c9c9c', paddingVertical: '5%'}}>{votes} Votes</Text>
                    <View style={{marginVertical: '4%', backgroundColor: color, padding: '1%', borderRadius: 1000, justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: dimensions.width/30, paddingHorizontal: '3%'}}>VOTES</Text>
                    </View>
                </View>
                <View style={{flex: 1, borderBottomWidth: '1%', borderColor: '#d3d3d3', marginHorizontal: '7%'}}/>
            </View>
        </View>
    )
}
export default PollCard;