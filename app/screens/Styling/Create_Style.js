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

export {Option_Buttons, Option_Text}