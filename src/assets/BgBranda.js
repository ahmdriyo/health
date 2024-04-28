import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgBgBranda({width,height}){
  const login = `<svg width="414" height="172" viewBox="0 0 414 172" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="414" height="172" fill="url(#paint0_linear_16_2498)"/>
  <defs>
  <linearGradient id="paint0_linear_16_2498" x1="3" y1="92.1429" x2="558.515" y2="90.1487" gradientUnits="userSpaceOnUse">
  <stop stop-color="#675AF4"/>
  <stop offset="0.414554" stop-color="#756AF4"/>
  <stop offset="1" stop-color="#685CF2" stop-opacity="0.27"/>
  </linearGradient>
  </defs>
  </svg>
  
  `;
  const SvgBgBranda = () => <SvgXml xml={login} width={width} height={height}/>
    return(<SvgBgBranda/>)
}