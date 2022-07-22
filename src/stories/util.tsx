import { Container, Sprite } from '@inlet/react-pixi/animated';
import { Text } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import '@pixi/graphics-extras';
import { TextStyle, Texture, Loader } from 'pixi.js';
import { Children, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import SettingsButton from './assets/settings-button.svg';
import FriendsButton from './assets/friends-button.svg';
import XButton from './assets/x-button.svg';
import { Spring } from 'react-spring';

interface UTextProps {
  x: number;
  y: number;
  h: number;
  text: string;
  col: string;
};

const UText = (props: UTextProps) => {
  const col = parseInt(props.col.substring(1), 16);
  return (
    <Text anchor={0.5} x={props.x} y={props.y} text={props.text}
      style={new TextStyle({
        fontFamily: 'Noto Sans Mono',
        fontSize: props.h,
        fill : col
      })} filters={[
        new GlowFilter({distance: 30, color: col, outerStrength: 0.25})
      ]}
    />
  );
};

interface PopupBgProps {
  x: number;
  y: number;
  w: number;
  h: number;
};

const PopupBg = (props: PopupBgProps) => {
  return (
    <Sprite anchor={0.5} x={props.x} y={props.y}
      width={props.w} height={props.h}
      texture={Texture.WHITE} tint={0xFFFFFF} filters={[
        new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
      ]}
    />
  );
}

// const Hexagon = memo(function Hexagon_(props: {
//   x: number,
//   y: number,
//   radius: number,
//   col: number,
//   filters?: Filter[]
// }) {
//   const draw = useCallback((g: PixiGraphics) => {
//     g.clear();
//     g.beginFill(props.col);
//     (g.drawRegularPolygon!)(props.x, props.y, props.radius, 6, Math.PI/2);
//     g.endFill();
//     // g.interactive = props.interactive ?? false;
//     // g.buttonMode = props.buttonMode ?? false;
//     // if (props.pointertap) g.on('pointertap', props.pointertap);
//     if (props.filters) g.filters = props.filters;
//   }, [props]);

//   return <Graphics draw={draw} />;
// });

interface ProgressBarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  percentage: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  const p = props.percentage/100;
  return (
    <>
    <Sprite anchor={0.5} x={props.x+props.w*p/2} y={props.y}
      width={props.w*(1-p)} height={props.h}
      texture={Texture.WHITE} tint={0x444444} filters={[
        new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
      ]}
    />
    <Sprite anchor={0.5} x={props.x-props.w*(1-p)/2} y={props.y}
      width={props.w*p} height={props.h}
      texture={Texture.WHITE} tint={0xAAFF00} filters={[
        new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
      ]}
    />
    </>
  );
};

interface ButtonProps {
  x: number;
  y: number;
  sz: number;
  img: 'settings' | 'friends' | 'x';
  callback: () => void;
  disable?: boolean;
}

const Button = (props: ButtonProps) => {
  const loader = useMemo(() => new Loader(), []);
  const [img, setImg] = useState<Texture>();
  useEffect(() => {
    switch (props.img) {
      case 'settings':
        loader.reset().add('settings', SettingsButton).load(
          (_, r) => setImg(r['settings'].texture)
        );
        break;
      case 'friends':
        loader.reset().add('friends', FriendsButton).load(
          (_, r) => setImg(r['friends'].texture)
        );
        break;
      case 'x':
        loader.reset().add('x', XButton).load(
          (_, r) => setImg(r['x'].texture)
        );
        break;
    }
  }, [props.img]);
  return (
    <>
    {!!img &&
    <Sprite anchor={0.5} x={props.x} y={props.y}
      height={props.sz}
      width={props.sz * img.width / img.height} texture={img}
      interactive={!(props.disable ?? false)}
      buttonMode={!(props.disable ?? false)}
      pointertap={props.callback}
    />
    }
    </>
  );
};

interface PopupProps {
  x: number;
  y: number;
  zIndex: number;
  buttonSz: number;
  img: 'settings' | 'friends';
  w: number;
  h: number;
  openCallback: () => void;
  closeCallback: () => void;
  disable: boolean;
  children: ReactNode;
}

const Popup = (props: PopupProps) => {
  const [show, setShow] = useState(false);
  const [popupProps, setPopupProps] = useState({alpha: 0});
  const openCallback = useCallback(() => {
    setShow(true);
    setPopupProps({alpha: 1});
    props.openCallback();
  }, [props.openCallback]);
  const closeCallback = useCallback(() => {
    setPopupProps({alpha: 0});
    props.closeCallback();
  }, [props.closeCallback]);
  const onRestCallback = useCallback(
    () => setShow(popupProps.alpha > 0)
  , [popupProps]);
  return (
    <Container anchor={0.5} x={0} y={0} zIndex={props.zIndex}>
      <Button x={props.x} y={props.y} sz={props.buttonSz} img={props.img}
        callback={openCallback} disable={props.disable}
      />
      <Spring to={popupProps} onRest={onRestCallback}>
        {p => (
          <Container {...p} anchor={0.5} visible={show}>
            <PopupBg x={0} y={0} w={props.w} h={props.h} />
            {props.children}
            <Button x={props.w/2-30} y={30-props.h/2} sz={35} img={'x'}
              callback={closeCallback} disable={false}
            />
          </Container>
        )}
      </Spring>
    </Container>
  );
};

interface PopupsProps {
  xs: number[];
  ys: number[];
  buttonSzs: number[];
  imgs: ('settings' | 'friends')[];
  ws: number[];
  hs: number[];
  children: ReactNode;
}

const Popups = (props: PopupsProps) => {
  const [popupped, setPopupped] = useState(-1);
  const openCallbacks = useMemo(() => props.xs.map((_, i) => (
    () => setPopupped(i)
  )), []);
  const closeCallback = useCallback(() => setPopupped(-1), []);
  return (
    <Container sortableChildren>
    {Children.map(props.children, (c, i) => (
      <Popup key={i} x={props.xs[i]} y={props.ys[i]}
        zIndex={i === popupped ? 100 : 0} w={props.ws[i]} h={props.hs[i]}
        buttonSz={props.buttonSzs[i]} img={props.imgs[i]}
        disable={popupped >= 0}
        openCallback={openCallbacks[i]} closeCallback={closeCallback}
      >
        {c}
      </Popup>
    ))}
    </Container>
  );
};

interface TabsProps {
  x: number;
  y: number;
  w: number;
  h: number;
  titles: string[],
  children: ReactNode
}

const Tabs = (props: TabsProps) => {
  const [selected, setSelected] = useState(0);
  return (
    <Container sortableChildren anchor={0.5} x={props.x} y={props.y}>
      {props.titles.map((t, i) => (
        <Container key={i} anchor={0.5} x={-props.w/2} y={-props.h/2}
          zIndex={i === selected ? 2 : 0}
          interactive={true} buttonMode={true}
          pointertap={() => setSelected(i)}
        >
          <Sprite anchor={0.5} x={80+110*i} y={-12}
            zIndex={1} width={100} height={42}
            texture={Texture.WHITE} tint={0xD8D8D8} filters={[
              new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
            ]}
          />
          <UText x={50+110*i} y={-12} h={20} text={t} col={'#000000'} />
        </Container>
      ))}
      <Sprite anchor={0.5} x={0} y={0} zIndex={1}
        width={props.w} height={props.h}
        texture={Texture.WHITE} tint={0xFFFFFF} filters={[
          new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
        ]}
      />
      <Container anchor={0.5} zIndex={3}>
        {Children.map(props.children,
          (child, i) => i === selected ? child : null
        )}
      </Container>
    </Container>
  );
};

interface ContentProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string,
}

const Content = memo(function Content_(props: ContentProps) {
  return (
    <>
    <Sprite anchor={0.5} x={props.x} y={props.y}
      width={props.w} height={props.h}
      texture={Texture.WHITE} tint={0xEEEEEE}
    />
    <UText x={props.x} y={props.y} h={25}
      text={props.title} col={'#000CFF'}
    />
    </>
  )
});

// const Class = memo(function Class_(props: {
//   x: number,
//   y: number,
//   sz: number,
//   rate: number,
//   callback: () => void,
//   disable: boolean
// }) {
//   return (
//     <>
//     <Circle x={props.x} y={props.y} sz={props.sz} col={0x111111} filters={
//       [new GlowFilter({distance: 20, color: 0x111111, outerStrength: 1.5})]
//     } interactive={!props.disable} buttonMode={!props.disable}
//       pointertap={props.callback}
//     />
//     <Circle x={props.x} y={props.y} sz={props.sz * 0.9} col={0xFFFFFF} />
//     <UText anchor={0.5} x={props.x} y={props.y} h={props.sz * 0.7}
//       text={rate2class(props.rate)} col={0x000000}
//     />
//     </>
//   );
// });

// const rate2class = (rate: number): string => {
//   rate = Math.floor(rate / 100);
//   if (rate < 15) {
//     return `${(15 - rate)}級`;
//   }
//   if (rate < 24) {
//     return `${['初', '二', '三', '四', '五', '六', '七', '八', '九'][rate - 15]}段`;
//   }
//   return '神';
// };

export {
  UText, ProgressBar, Button, Content, Tabs, Popups
};