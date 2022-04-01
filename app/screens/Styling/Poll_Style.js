import {Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

// Container for image at top of poll post
const Post_Image = {
    width: dimensions.width,
    flex: 1,
}

// Container for the question area of poll post
const Question_Box = {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '2%'
}

// Question text styling for a post
const Post_Question = {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
}

// Container for containing all options for a poll post
const Options_Container = {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
    paddingVertical: '4%'
}

// Container for storing additional options at base of poll (stats, report, comment)
const More_Options = {
    marginTop: '5%',
    paddingVertical: '3%',
}

// Circle colour on post option
const Circle_Option = {
    borderRadius: dimensions.height/60,
    left: dimensions.width*0.02,
    justifyContent: 'center',
    height: '80%',
    aspectRatio: 1
}

// Letter for post options
const Option_Letter = {
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
}

// Question label above Poll question text
const Question_Header = {
    color: '#AAA',
    fontSize: 10, 
    textAlign: 'center', 
    fontWeight: 'bold'
}

// Choices labels above Options (Choices / Votes)
const Choices_Header = {
    textAlign: 'left', 
    position: 'absolute', 
    left: dimensions.width*0.08, 
    fontSize: 10, 
    color: '#AAA'
}

// Interior elements of an option button (Letter, Text, etc)
const Inner_Option_Container = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
}

// Text associated with an option button
const Option_Text = {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 15,
    width: dimensions.width/3
}

// Container for an individual post option
const Post_Option = {
    borderWidth: 2,
    marginHorizontal: dimensions.width/14,
    borderRadius: dimensions.width/24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: '2%',
}

export {Post_Image, Question_Box, Post_Question, Options_Container, More_Options, 
        Circle_Option, Option_Letter, Question_Header, Choices_Header, Inner_Option_Container, Option_Text,
        Post_Option } 