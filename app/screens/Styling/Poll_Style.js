import {Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

// Container for image at top of poll post
const Post_Image = {
    width: dimensions.width,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
}

// Container for the question area of poll post
const Question_Box = {
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
}

// Question text styling for a post
const Post_Question = {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 20,
}

// Container for containing all options for a poll post
const Options_Container = {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
    paddingVertical: '2%'
}

// Container for storing additional options at base of poll (stats, report, comment)
const More_Options = {
    paddingVertical: '3%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
}

// Circle colour on post option
const Circle_Option = {
    backgroundColor: '#338397',
    borderRadius: dimensions.width/20,
    justifyContent: 'center',
    flex: 1
}

// Letter for post options
const Option_Letter = {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 20
}

export {Post_Image, Question_Box, Post_Question, Options_Container, More_Options, Circle_Option, Option_Letter} 