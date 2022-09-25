/*
    Contains collection of all styles with relation to comments
*/

import { Dimensions } from "react-native"
const dimensions = Dimensions.get("screen");

// Container displaying question text inside of Question_Container
const Question_Box = {
    height: dimensions.width/5,
    width: dimensions.width/1.5,
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
    width: dimensions.width/1.2,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BBB',
    padding: 10,
}

const Filter_Button = {
    marginLeft: 10,
    paddingHorizontal: 10,
    height: dimensions.width/16, 
    borderRadius: dimensions.width/60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1, 
    marginVertical: '2%'
}

const Comment_ColorBar = {
    marginHorizontal: dimensions.width/50, 
    width: dimensions.width/90, 
    borderRadius: dimensions.width/30, 
}

const Comment_Text = {
    textAlign: 'left', 
    fontSize: 12, 
    marginLeft: dimensions.width/50
}

const Username_Text = {
    marginBottom: 3, 
    fontSize: 12, 
    marginLeft: dimensions.width/50, 
    fontWeight: 'bold'
}

const Comment_TypeBar = {
    justifyContent: 'center', 
    padding: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
}

const Filter_Text = {
    color: '#AAA', 
    fontWeight: 'bold', 
    marginBottom: '5%'
}

const Modal_Container = {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
}

const Modal_Position = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
}

const Question_Container = {
    width: dimensions.width, 
    height: dimensions.height/7,
}

const Comments_DisplayArea = {
    flex: 1, 
}

const Filter_Container = {
    marginBottom: dimensions.height/40, 
    flexDirection: 'row', 
    width: dimensions.width, 
    alignItems: 'center', 
    justifyContent: 'center'
}

const Filter_Background = {
    position: 'absolute', 
    height: '70%', 
    width: dimensions.width*1, 
    backgroundColor: 'rgba(204,204,204,0.3)'
}



export {Question_Container, Question_Box, Question_Text, Post_Image, Options_Container, Option_Text, 
        Choice_Buttons, Comment_Input, Filter_Button, Comment_ColorBar, Comment_Text, Username_Text,
        Comment_TypeBar, Filter_Text, Modal_Container, Modal_Position, Comments_DisplayArea, Filter_Container,
        Filter_Background }