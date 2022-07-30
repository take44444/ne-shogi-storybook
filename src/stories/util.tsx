import { Container, Sprite } from '@inlet/react-pixi/animated';
import { Text } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import '@pixi/graphics-extras';
import { TextStyle, Texture, Loader } from 'pixi.js';
import { Children, Dispatch, memo, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Class from './assets/class.svg';
import SettingsButton from './assets/settings-button.svg';
import FriendsButton from './assets/friends-button.svg';
import XButton from './assets/x-button.svg';
import { Spring } from 'react-spring';
import { context } from './layout';

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

interface ModalBgProps {
  x: number;
  y: number;
  w: number;
  h: number;
};

const ModalBg = (props: ModalBgProps) => {
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
  img: 'class' | 'settings' | 'friends' | 'x';
  callback: (e: any) => void;
}

const Button = (props: ButtonProps) => {
  const loader = useMemo(() => new Loader(), []);
  const [texture, setTexture] = useState<Texture>();
  useEffect(() => {
    switch (props.img) {
      case 'class':
        loader.reset().add('class', Class).load(
          (_, r) => setTexture(r['class'].texture)
        );
        break
      case 'settings':
        loader.reset().add('settings', SettingsButton).load(
          (_, r) => setTexture(r['settings'].texture)
        );
        break;
      case 'friends':
        loader.reset().add('friends', FriendsButton).load(
          (_, r) => setTexture(r['friends'].texture)
        );
        break;
      case 'x':
        loader.reset().add('x', XButton).load(
          (_, r) => setTexture(r['x'].texture)
        );
        break;
    }
  }, [props.img]);
  return (
    <>
    {!!texture &&
    <Sprite anchor={0.5} x={props.x} y={props.y}
      alpha={props.img === 'class' ? 0.5 : 1} height={props.sz}
      width={props.sz * texture.width / texture.height} texture={texture}
      interactive={true}
      buttonMode={true}
      pointertap={props.callback}
    />
    }
    </>
  );
};

interface ModalButtonProps {
  x: number;
  y: number;
  sz: number;
  img: 'class' | 'settings' | 'friends' | 'x';
  callback: (e: any) => void;
}

const ModalButton = (props: ModalButtonProps) => {
  const modalTools = useContext(context);
  const [disable, setDisable] = useState(false);
  modalTools.buttonDisables[props.img] = setDisable;
  const loader = useMemo(() => new Loader(), []);
  const [texture, setTexture] = useState<Texture>();
  useEffect(() => {
    switch (props.img) {
      case 'class':
        loader.reset().add('class', Class).load(
          (_, r) => setTexture(r['class'].texture)
        );
        break
      case 'settings':
        loader.reset().add('settings', SettingsButton).load(
          (_, r) => setTexture(r['settings'].texture)
        );
        break;
      case 'friends':
        loader.reset().add('friends', FriendsButton).load(
          (_, r) => setTexture(r['friends'].texture)
        );
        break;
      case 'x':
        loader.reset().add('x', XButton).load(
          (_, r) => setTexture(r['x'].texture)
        );
        break;
    }
  }, [props.img]);
  return (
    <>
    {!!texture &&
    <Sprite anchor={0.5} x={props.x} y={props.y}
      height={props.sz} width={props.sz * texture.width / texture.height}
      texture={texture}
      interactive={!disable} buttonMode={!disable} pointertap={props.callback}
    />
    }
    </>
  );
};

interface ModalProps {
  w: number;
  h: number;
  children: ReactNode;
  id: string;
}

const Modal = (props: ModalProps) => {
  const modalTools = useContext(context);
  const [show, setShow] = useState(false);
  const [popupProps, setPopupProps] = useState({alpha: 0});
  modalTools.open[props.id] = useCallback(() => {
    for (const d of Object.values(modalTools.buttonDisables)) {
      (d as Dispatch<SetStateAction<boolean>>)(true)
    };
    setShow(true);
    setPopupProps({alpha: 1});
  }, []);
  const closeCallback = useCallback(() => {
    setPopupProps({alpha: 0});
  }, []);
  const onRestCallback = useCallback(
    () => {
      if (popupProps.alpha == 0) {
        for (const d of Object.values(modalTools.buttonDisables)) {
          (d as Dispatch<SetStateAction<boolean>>)(false)
        };
        setShow(false);
      }
    }
  , [popupProps]);
  return (
    <Spring to={popupProps} onRest={onRestCallback} >
      {p => (
        <Container anchor={0.5} {...p} visible={show} >
          <ModalBg x={0} y={0} w={props.w} h={props.h} />
          {props.children}
          <Button x={props.w/2-30} y={30-props.h/2} sz={35} img={'x'}
            callback={closeCallback}
          />
        </Container>
      )}
    </Spring>
  )
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

export {
  UText, ProgressBar, Button, Content, Tabs, Modal, ModalButton
};