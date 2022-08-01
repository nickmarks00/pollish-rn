import React from 'react';
import { View, Image, Text, Alert } from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import { getPoll, getPollVotes } from 'endpoints/pollish';
import Styles from './styles';
import ColoredButton from '../coloredButton';
import { deletePoll } from 'endpoints/pollish'

const url = REACT_APP_BASE_URL;


const PollCard = ({color, qText, id, reload}) => {

    const [poll, setPoll] = React.useState(null)
    const [votes, setVotes] = React.useState(0)
    const [noProfilePic, setError] = React.useState(true);

    React.useEffect(() => {
        console.log(id)
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
        <View style={Styles.container}>
            { (poll?.images.length > 0 && noProfilePic)  ? 
                <Image source={{uri: poll.images[0].image}} style={Styles.pollImage} onError={()=> setError(false)}/> 
            :
                <View style={Styles.noImage}>
                    <Text style={Styles.noImageText}>{qText.slice(0,1)}</Text>
                </View>
            }

            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={Styles.questionText}>{qText}</Text>
                <View style={{height: '5%'}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={Styles.votesText}>{votes} Votes</Text>
                    <View style={[ Styles.labelContainer, { backgroundColor: color}]}>
                        <Text style={Styles.labelText}>VOTES</Text>
                    </View>
                </View>
            </View>
            <View style={{width: '10%', justifyContent: 'center'}}>
                <ColoredButton color={'red'} text={'del'} whenPressed={showConfirmDialog}/>
            </View>
        </View>
    )
}
export default PollCard;