import {Dimensions} from 'react-native';
import {SubHeading, NavColor} from './App_Styles';

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
    paddingHorizontal: '2%',
    backgroundColor: '#FAFAFA'
}

// Question text styling for a post
const Post_Question = {
    fontFamily: 'SFRound',
    textAlign: 'center',
    paddingHorizontal: 10,
    color: 'black',
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
    height: '50%',
    aspectRatio: 1
}

// Letter for post options
const Option_Letter = [
    SubHeading
]

// Question label above Poll question text
const Question_Header = [
    SubHeading,
    {
        color: '#AAA',
        fontSize: 10, 
        marginBottom: 10,
    }
]

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
    width: dimensions.width/2
}

// Container for an individual post option
const Post_Option = {
    borderVerticalWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderColor: '#EEE', 
    borderWidth: 0.4
}

const Nav_Text = {
    fontWeight: 'bold', 
    color: NavColor, 
    fontSize: 12
}

export {Post_Image, Question_Box, Post_Question, More_Options, 
        Circle_Option, Option_Letter, Question_Header, Inner_Option_Container, Option_Text,
        Post_Option, Nav_Text } 