import {Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

// Container for image at top of poll post
const Post_Image = {
    width: dimensions.width*0.9,
    flex: 1,
}

// Container for storing additional options at base of poll (stats, report, comment)
const More_Options = {
    marginVertical: '5%',
    flex: 1,
    justifyContent: 'center',
}

// Text associated with an option button
const Option_Text = {
    fontFamily: 'System',
    color: '#6F6F6F',
    fontSize: 13,
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
    color: '#1F71EB', 
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



export {Post_Image, More_Options, Option_Text,
        Post_Option, Nav_Text, Media_Container, Media_DropShadow } 