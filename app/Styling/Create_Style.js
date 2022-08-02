import { Dimensions } from 'react-native';
import { PrimaryPollish } from './App_Styles';

const dimensions = Dimensions.get("window");

const Option_Buttons = {
    width: dimensions.width/9, 
    aspectRatio: 1, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: PrimaryPollish,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center'
}

const Option_Text = {
    textAlign: 'center', 
    fontSize: 9, 
    fontWeight: 'bold', 
    marginTop: 3,
    color: PrimaryPollish
}

const Top_Options_BG = {
    backgroundColor: 'rgba(238,238,238,0.2)', 
    height: dimensions.height/5, 
    width: dimensions.width, 
    borderBottomWidth: 1, 
    borderColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'space-evenly'
}

const Header_Text = {
    fontSize: 25, 
    color: 'black',
    fontFamily: 'SFRound',
    width: dimensions.width/1.2,
    textAlign: 'center'
}

const Content_Section = {
    height: dimensions.height*(0.5), 
    // borderBottomWidth: dimensions.height/60, 
    width: dimensions.width, 
    borderColor: PrimaryPollish
}

const Content_Navbar = {
    marginTop: dimensions.height/70, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: dimensions.width*0.6
}

const NavBar_Image = {
    width: dimensions.width/30,
    height: null,
    resizeMode: 'contain',
}

const NavBar_Text = {
    fontWeight: 'bold', 
    fontSize: 12, 
    color: PrimaryPollish, 
    marginHorizontal: 8
}

const Question_InputBox = {
    borderWidth: 1,
    width: dimensions.width/1.2,
    height: dimensions.height/20,
    paddingHorizontal: 20,
    borderColor: '#DDD',
    borderRadius: 15,
}

const Question_Container = {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
}

const Question_Header = {
    fontSize: 20, 
    textAlign: 'left', 
    color: '#AAA', 
    marginBottom: '5%'
}

const Media_Container = {
    width: '30%', 
    aspectRatio: 4/3, 
    backgroundColor: '#EEE',  
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: '10%'
}

const Media_PlusButton = {
    width: '30%', 
    aspectRatio: 1, 
    backgroundColor: '#83EFB1', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 100
}

const Media_Object = {
    width: '100%', 
    height: '100%', 
    borderRadius: 10
}

const Media_Row = {
    justifyContent: 'space-evenly', 
    flexDirection: 'row', 
    width: '100%'
}

const Media_HeaderText = {
    color: '#125AC5', 
    fontWeight: 'bold', 
    fontSize: 16
}

const Media_Page = {
    justifyContent: 'space-evenly', 
    flex: 1, 
    alignItems: 'center'
}

const Create_Navbar = {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    width: dimensions.width
}

const Create_Navbar_BG = {
    position: 'absolute', 
    width: dimensions.width, 
    marginTop: dimensions.width/36, 
    height: dimensions.width/18, 
    backgroundColor: 'rgba(31, 113, 235, 0.1)'
}

const Option_Input = {
    borderWidth: 1,
    width: dimensions.width/1.2,
    height: dimensions.height/25,
    paddingHorizontal: 10,
    borderColor: '#DDD',
    borderRadius: 10,
}

const Choices_Container = {
    flex: 0.9, 
    justifyContent: 'space-evenly', 
    alignItems: 'center'
}

const SubHeader = {
    color: PrimaryPollish, 
    fontWeight: 'bold', 
    fontSize: 16
}

const Option_Header = {
    marginVertical: '2%', 
    fontWeight: 'bold', 
    fontSize: 12
}

const Media_PlusButton_Text = {
    fontSize: 25, 
    color: '#FFF', 
    textAlign: 'center'
}

const Component_Button = {
    width: dimensions.width/7, 
    alignItems: 'center'
}

const Component_Button_Text = {
    fontWeight: 'bold', 
    fontSize: 30
}


export {Option_Buttons, Option_Text, Top_Options_BG, Header_Text, Content_Section, Content_Navbar,
        NavBar_Image, NavBar_Text, Question_InputBox, Question_Container, Question_Header, Media_Container, 
        Media_PlusButton, Media_Object, Media_Row, Media_HeaderText, Media_Page, Create_Navbar, Create_Navbar_BG,
        Option_Input, Choices_Container, SubHeader, Option_Header, Media_PlusButton_Text, Component_Button,
        Component_Button_Text }