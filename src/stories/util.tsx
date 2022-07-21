import { Container, Sprite } from '@inlet/react-pixi';
import { Graphics, Text } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import '@pixi/graphics-extras';
import { TextStyle, Graphics as PixiGraphics, Texture, Loader, LoaderResource } from 'pixi.js';
import { Children, memo, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SettingsButton from './assets/settings-button.svg';
import FriendsButton from './assets/friends-button.svg';
import XButton from './assets/x-button.svg';
import { Dict } from '@pixi/utils';

interface UTextProps {
  anchor?: number;
  x: number;
  y: number;
  h: number;
  text: string;
  col: string;
};

const UText = (props: UTextProps) => {
  const col = parseInt(props.col.substring(1), 16);
  return (
    <Text {...props}
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

interface RectProps {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  shadow?: boolean;
}

const Rect = (props: RectProps) => {
  const col = parseInt(props.col.substring(1), 16);
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(col);
    g.drawRect(props.x, props.y, props.w, props.h);
    g.endFill();
    g.filters = props.shadow ? [
      new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
    ] : [];
  }, [props]);

  return <Graphics draw={draw} />;
};

interface RRectProps {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  shadow?: boolean;
}

const RRect = (props: RRectProps) => {
  const col = parseInt(props.col.substring(1), 16);
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(col);
    g.drawRoundedRect(props.x, props.y, props.w, props.h, 6.25);
    g.endFill();
    g.filters = props.shadow ? [
      new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
    ] : [];
  }, [props]);

  return <Graphics draw={draw} />;
};

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

interface CircleProps {
  x: number;
  y: number;
  sz: number;
  col: string;
  shadow?: boolean;
}

const Circle = (props: CircleProps) => {
  const col = parseInt(props.col.substring(1), 16);
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(col);
    g.drawCircle(props.x, props.y, props.sz);
    g.endFill();
    g.filters = props.shadow ? [
      new GlowFilter({distance: 30, color: 0, outerStrength: 0.25})
    ] : [];
  }, [props]);

  return <Graphics draw={draw} />;
};

interface ProgressBarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  percentage: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <>
    <Rect x={props.x - props.w/2} y={props.y}
      h={props.h} w={props.w*props.percentage/100} col={'#AAFF00'}
    />
    <Rect x={props.x + props.w*(props.percentage-50)/100} y={props.y}
      h={props.h} w={props.w*(100-props.percentage)/100} col={'#444444'}
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
  const openCallback = useCallback(() => {
    setShow(true);
    props.openCallback();
  }, [props.openCallback]);
  const closeCallback = useCallback(() => {
    setShow(false);
    props.closeCallback();
  }, [props.closeCallback]);
  return (
    <Container zIndex={props.zIndex}>
      <Button x={props.x} y={props.y} sz={props.buttonSz} img={props.img}
        callback={openCallback} disable={props.disable}
      />
      <Container visible={show}>
        <RRect x={480-props.w/2} y={270-props.h/2} w={props.w} h={props.h}
          col={'#FFFFFF'} shadow
        />
        {props.children}
        <Button x={450+props.w/2} y={300-props.h/2} sz={35} img={'x'}
          callback={closeCallback} disable={false}
        />
      </Container>
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
  const closeCallback = useMemo(() => () => setPopupped(-1), []);
  return (
    <>
    {Children.map(props.children, (c, i) => (
      <Popup key={i} x={props.xs[i]} y={props.ys[i]}
        zIndex={i === popupped ? 1 : 0} w={props.ws[i]} h={props.hs[i]}
        buttonSz={props.buttonSzs[i]} img={props.imgs[i]}
        disable={popupped >= 0}
        openCallback={openCallbacks[i]} closeCallback={closeCallback}
      >
        {c}
      </Popup>
    ))}
    </>
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
    <Container sortableChildren>
      {props.titles.map((t, i) => (
        <Container key={i} interactive={true} buttonMode={true}
          x={props.x+40} y={props.y-35} zIndex={i === selected ? 2 : 0}
          pointertap={() => setSelected(i)}
        >
          <RRect x={110*i} y={0} w={100} h={42} col={'#D8D8D8'} />
          <UText x={20+110*i} y={10} h={20} text={t} col={'#000000'} />
        </Container>
      ))}
      <Container zIndex={1}>
        <RRect x={props.x} y={props.y} w={props.w} h={props.h}
          col={'#FFFFFF'} shadow
        />
      </Container>
      <Container zIndex={3}>
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
    <RRect x={props.x} y={props.y} w={props.w} h={props.h} col={'#EEEEEE'} />
    <UText anchor={0.5} x={props.x + props.w/2} y={props.y + props.h/2} h={25}
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
  UText, Rect, RRect, Circle,
  ProgressBar, Button, Content, Tabs, Popups
};