import { Sprite } from "@inlet/react-pixi";
import { GlowFilter } from "@pixi/filter-glow";
import { Loader, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { ProgressBar, UText } from "./util";
import Class from './assets/class.svg';

interface UserInfoProps {
  x: number;
  y: number;
  sz: number;
}

const UserInfo = (props: UserInfoProps) => {
  const [userInfo, setUserInfo] = useState({userId: '', rate: 0});
  const [texture, setTexture] = useState<Texture>();
  useEffect(() => {
    // fetch('', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     requestType: 'user-info',
    //     data: []
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => setUserInfo(data.data));
    const loader = new Loader();
    loader.reset().add('class', Class).load(
      (_, r) => {
        setTexture(r['class'].texture);
        setUserInfo({userId: 'take44444', rate: 1679});
      }
    );
  }, []);

  return (
    <>{!!texture &&
    <>
    <Sprite anchor={0.5} x={props.x+props.sz} y={props.y}
      width={props.sz*2} height={props.sz*0.8}
      texture={Texture.WHITE} tint={0x000000} filters={[
        new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
      ]}
    />
    <UText x={props.x+props.sz} y={props.y-props.sz*0.2} h={props.sz*0.17}
      text={userInfo.userId} col={'#FFFFFF'} />
    <UText x={props.x+props.sz*0.7} y={props.y+props.sz*0.02} h={props.sz*0.17}
      text={rate2classText(userInfo.rate)} col={'#00DDFF'}
    />
    <ProgressBar x={props.x+props.sz*1.13} y={props.y+props.sz*0.2} 
      w={props.sz*1.2} h={props.sz*0.04} percentage={userInfo.rate % 100}
    />
    <Sprite anchor={0.5} x={props.x} y={props.y}
      width={props.sz} height={props.sz}
      texture={texture} filters={[
        new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
      ]}
    />
    <UText x={props.x} y={props.y} h={props.sz*0.3}
      text={rate2classText(userInfo.rate)} col={'#FFFFFF'}
    />
    </>
  }</>);
};

const rate2classText = (rate: number): string => {
  rate = Math.floor(rate / 100);
  if (rate < 15) {
    return `${(15 - rate)}級`;
  }
  if (rate < 24) {
    return `${['初', '二', '三', '四', '五', '六', '七', '八', '九'][rate - 15]}段`;
  }
  return '神';
};

const rate2class = (rate: number): string => {
  rate = Math.floor(rate / 100);
  if (rate < 15) {
    return `${15 - rate}kyu`;
  }
  if (rate < 24) {
    return `${rate - 14}dan`;
  }
  return 'pro';
};

export { UserInfo };