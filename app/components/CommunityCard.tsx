import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

type CommunityCardProps = {
  comm: any;
};

// ! Need to create 'comm' type

const CommunityCard = ({comm}: CommunityCardProps) => {
  const [noProfilePic, setError] = React.useState(false);

  return (
    <View
      style={{
        width: width,
        flexDirection: 'row',
        paddingVertical: '4%',
        paddingHorizontal: '6%',
        justifyContent: 'center',
      }}>
      {!noProfilePic ? (
        <Image
          source={{uri: comm.image}}
          style={{
            width: width / 5,
            aspectRatio: 1,
            borderRadius: 15,
            resizeMode: 'cover',
          }}
          onError={() => setError(true)}
        />
      ) : (
        <View
          style={{
            width: width / 5,
            aspectRatio: 1,
            borderRadius: 15,
            backgroundColor: '#907AD6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: width / 12,
              color: 'white',
            }}>
            {comm.name.slice(0, 1)}
          </Text>
        </View>
      )}

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            flexWrap: 'wrap',
            paddingHorizontal: '7%',
          }}>
          {comm.name}
        </Text>
        <View style={{height: '5%'}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              flexWrap: 'wrap',
              paddingHorizontal: '7%',
              color: '#9c9c9c',
            }}>
            {comm.num_polls} Polls
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              flexWrap: 'wrap',
              paddingHorizontal: '7%',
              color: '#9c9c9c',
            }}>
            {comm.num_users} Users
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CommunityCard;
