import { Dimensions } from 'react-native';

const dimensions = Dimensions.get("window");

const Option_Buttons = {
    width: dimensions.width/9, 
    aspectRatio: 1, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#1F71EB',
    backgroundColor: 'white'
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

export {Option_Buttons, Option_Text, Top_Options_BG, Header_Text, Content_Section, Content_Navbar}