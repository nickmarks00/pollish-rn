import {Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

// Container for image at top of poll post
const Post_Image = {
    width: dimensions.width,
    height: dimensions.width / 1.1,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginTop: 0,
}

// Container for the question area of poll post
const Question_Box = {
    borderBottomWidth: 5, 
    borderColor: '#BAEAF8',
    padding:10,
}

// Question text styling for a post
const Post_Question = {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#EBD494',
}

// Container for containing all options for a poll post
const Options_Container = {
    height: dimensions.width/1.5,
    marginVertical: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
}

// Container for storing additional options at base of poll (stats, report, comment)
const More_Options = {
    height: dimensions.height*0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
}

export {Post_Image, Question_Box, Post_Question, Options_Container, More_Options} 