import React, {Fragment} from 'react';
import {Path} from 'react-native-svg';
interface IconProps {
  primaryColor: string;
}
export const Back = ({primaryColor}: IconProps) => (
  <>
    <Path
      fill={primaryColor}
      d="M1.91421 4.35355L4.56066 7L3.85355 7.70711L0.353553 4.20711L0 3.85355L0.353553 3.5L3.85355 0L4.56066 0.707107L1.91421 3.35355L5.70711 3.35355C9.28325 3.35355 12.2071 6.27741 12.2071 9.85355L12.2071 11.3536H11.2071L11.2071 9.85355C11.2071 6.8297 8.73096 4.35355 5.70711 4.35355H1.91421Z"
    />
  </>
);
