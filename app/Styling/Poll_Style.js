import {Dimensions} from 'react-native';
import {PrimaryFont, NavColor} from './App_Styles';

const dimensions = Dimensions.get("screen");

// Container for image at top of poll post
const Post_Image = {
    width: dimensions.width*0.9,
    flex: 1,
}

// Container for the question area of poll post
const Question_Box = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '2%',
    backgroundColor: '#FAFAFA'
}

// Question text styling for a post
const Post_Question = {
    fontFamily: PrimaryFont,
    textAlign: 'center',
    paddingHorizontal: '5%',
}

// Container for storing additional options at base of poll (stats, report, comment)
const More_Options = {
    marginVertical: '5%',
    flex: 1,
    justifyContent: 'center',
}

// Circle colour on post option
const Circle_Option = {
    borderRadius: dimensions.height/60,
    justifyContent: 'center',
    height: '50%',
    aspectRatio: 1
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
    fontFamily: 'System',
    textAlign: 'center',
    fontSize: 15,
}

// Container for an individual post option
const Post_Option = {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
    marginHorizontal: '5%',
    flex: 1,
    borderColor: '#EEE', 
    borderWidth: dimensions.height/3000
}

// Nav Text for comments and more info
const Nav_Text = {
    fontWeight: 'bold', 
    color: NavColor, 
    fontSize: dimensions.height/70
}

const Media_Container = {
    alignItems: 'center', 
    flex: 1, 
    marginHorizontal: dimensions.width*0.05, 
    paddingVertical: '2%'
}

const Media_DropShadow = {
    flex: 1, 
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5
}



export {Post_Image, Question_Box, Post_Question, More_Options, 
        Circle_Option, Inner_Option_Container, Option_Text,
        Post_Option, Nav_Text, Media_Container, Media_DropShadow } 