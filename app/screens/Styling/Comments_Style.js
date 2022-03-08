/*
    Contains collection of all styles with relation to comments
*/

import { Dimensions } from "react-native"
const dimensions = Dimensions.get("screen");


// Container displayed at the top of comments section with post image and text
const Question_Container = {
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignContent: 'center'
}

// Container displaying question text inside of Question_Container
const Question_Box = {
    height: dimensions.width/5,
    width: dimensions.width/1.5,
    backgroundColor: 'black',
    margin: -40,
    zIndex: -1,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30
}

// Text styling for question displayed at top of comments section
const Question_Text = {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SFRound',
    fontSize: 12
}

// Poll Image displayed at top of comment section
const Post_Image = {
    width: dimensions.width/3,
    height: dimensions.width/3,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.width,
    borderWidth: dimensions.width/80,
}

// Area of the screen to store poll option buttons for filtering
const Options_Container = {
    marginTop: -30,
    height: dimensions.height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
}

// Text styling for options (filtering) buttons
const Option_Text = {
    fontFamily: 'SFRound',
    textAlign: 'center', 
    fontSize: 11, 
    color: 'white'
}

const Choice_Buttons = {
    flex: 1,
    marginHorizontal: '2%',
    height: dimensions.width/12,
    borderRadius: dimensions.width/20,
    backgroundColor: '#90C7FC',
    textAlign: 'center',
    justifyContent: 'center'
}

const Comment_Input = {
    height: 40,
    width: dimensions.width/1.3,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BBB',
    padding: 10,
}

export {Question_Container, Question_Box, Question_Text, Post_Image, Options_Container, Option_Text, Choice_Buttons, Comment_Input}