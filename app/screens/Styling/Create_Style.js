import { Dimensions } from 'react-native';

const dimensions = Dimensions.get("window");

const Option_Buttons = {
    width: dimensions.width/9, 
    aspectRatio: 1, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#1F71EB',
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center'
}

const Option_Text = {
    textAlign: 'center', 
    fontSize: 9, 
    fontWeight: 'bold', 
    marginTop: 3,
    color: '#1F71EB'
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
    borderBottomWidth: dimensions.height/60, 
    width: dimensions.width, 
    borderColor: '#1F71EB'
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
    color: '#1F71EB', 
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
    aspectRatio: 1, 
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


export {Option_Buttons, Option_Text, Top_Options_BG, Header_Text, Content_Section, Content_Navbar,
        NavBar_Image, NavBar_Text, Question_InputBox, Question_Container, Question_Header, Media_Container, 
        Media_PlusButton, Media_Object, Media_Row, Media_HeaderText, Media_Page }