import React from 'react';
import {Text} from 'react-native';

import defaultStyles from '../config/styles';

type AppTextProps = {
  children: string;
  style: React.CSSProperties;
};

function AppText({children, style}: AppTextProps) {
  // @ts-ignore
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}

export default AppText;
