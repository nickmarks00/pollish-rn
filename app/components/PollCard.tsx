import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {getPoll, getPollVotes} from 'network/lib/pollish';

const {height, width} = Dimensions.get('window');

type PollCardProps = {
  qText: string;
  id: number;
};

// ! Need a type for poll

const PollCard = ({qText, id}: PollCardProps) => {
  const [poll, setPoll] = React.useState<any>(null);
  const [votes, setVotes] = React.useState(0);
  const [noProfilePic, setError] = React.useState(true);

  React.useEffect(() => {
    loadPoll();
  }, []);

  const loadPoll = async () => {
    if (id) {
      const data = await getPoll(id);
      setPoll(data.data);

      const data2 = await getPollVotes(id);
      setVotes(data2);
    }
  };

  return (
    <View
      style={{
        height: height * 0.154,
        width: width * 0.9,
        borderColor: '#EEE',
        overflow: 'hidden',
      }}>
      <View style={{height: '80%', flexDirection: 'row'}}>
        <View
          style={{
            height: '100%',
            aspectRatio: 1,
            overflow: 'hidden',
            borderRadius: 15,
            borderColor: '#EEE',
          }}>
          {poll?.images.length > 0 && noProfilePic ? (
            <Image
              source={{uri: poll.images[0].image}}
              style={{height: '100%'}}
              onError={() => setError(false)}
            />
          ) : (
            <View
              style={{
                backgroundColor: '#00AAA9',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: width / 12,
                  color: 'white',
                }}>
                {qText.slice(0, 1)}
              </Text>
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              borderColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              height: '100%',
              borderRadius: 15,
              borderWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            marginLeft: width * 0.05,
          }}>
          <Text numberOfLines={2} style={{fontSize: 15, fontWeight: 'bold'}}>
            {qText}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12, color: '#00AAA9'}}>
            username12
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#767676'}}>
              {' '}
              10k Votes
            </Text>
          </Text>
          <View style={{height: height * 0.02}} />
          <Text style={{fontSize: 12, color: '#7A7A7A'}}>1 month ago</Text>
        </View>
      </View>
    </View>
  );
};
export default PollCard;
