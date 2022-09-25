import React from 'react';
import { View, Image, Text, Alert, Dimensions } from 'react-native';
import { getPoll, getPollVotes } from 'endpoints/pollish';
import Styles from './styles';
import { deletePoll } from 'endpoints/pollish'

const { height, width } = Dimensions.get('window');


const PollCard = ({color, qText, id, reload}) => {

    const [poll, setPoll] = React.useState(null)
    const {user, logOut} = useAuth();
    const [votes, setVotes] = React.useState(0)
    const [noProfilePic, setError] = React.useState(true);

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

    const removePoll = async () => {
        await deletePoll(id);
        reload();
    }

    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to delete this poll?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                removePoll()
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    return (
        <View style={{height: height*0.154, width: width*0.9, borderRadius: height*0.024, borderWidth: 2, borderColor: '#EEE', overflow: 'hidden'}}>
            <View style={{height: '80%', flexDirection: 'row'}}>
                <View style={{height: '100%', aspectRatio: 1, overflow: 'hidden', borderRightWidth: 2, borderColor: '#EEE'}}>
                { (poll?.images.length > 0 && noProfilePic)  ? 
                    <Image source={{uri: poll.images[0].image}} style={{height: '100%'}} onError={()=> setError(false)}/> 
                :
                    <View style={{backgroundColor: '#00AAA9', alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                        <Text style={Styles.noImageText}>{qText.slice(0,1)}</Text>
                    </View>
                }
                </View>
                <View style={{flex: 1, height: '100%', justifyContent: 'center', marginLeft: width*0.05}}>
                    <Text numberOfLines={2} style={{fontSize: 15}}>{qText}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 12, color: '#00AAA9'}}>username12
                        <Text style={{fontWeight: 'bold', fontSize: 12, color: '#767676'}}>    10k Votes</Text>
                    </Text>
                </View>
            </View>

            <View style={{height: '20%', width: '100%', borderTopWidth: 2, borderColor: '#EEE', justifyContent: 'center'}}>
                <Text style={{marginLeft: '5%', fontSize: 12, color: '#7A7A7A'}}>6 months ago</Text>
            </View>
        </View>
    )
}
export default PollCard;