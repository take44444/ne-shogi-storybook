import { Container } from '@inlet/react-pixi';
import { Graphics, Text } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import '@pixi/graphics-extras';
import { TextStyle, Graphics as PixiGraphics } from 'pixi.js';
import { Children, memo, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UTextProps {
  anchor?: number;
  x: number;
  y: number;
  h: number;
  text: string;
  col: string;
};

const UText = memo(function UText_(props: UTextProps) {
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
});

interface RectProps {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  shadow?: boolean;
}

const Rect = memo(function Rect_(props: RectProps) {
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
});

interface RRectProps {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  shadow?: boolean;
}

const RRect = memo(function RRect_(props: RRectProps) {
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
});

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

const Circle = memo(function Circle_(props: CircleProps) {
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
});

interface ProgressBarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  percentage: number;
}

const ProgressBar = memo(function ProgressBar_(props: ProgressBarProps) {
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
});

// const Button = memo(function Button_(props: {
//   x: number,
//   y: number,
//   sz: number,
//   callback: () => void,
//   disable: boolean
// }) {
//   return (
//     <Circle x={props.x} y={props.y} sz={props.sz} col={0x111111}
//       interactive={!props.disable} buttonMode={!props.disable}
//       pointertap={props.callback} filters={
//         [new GlowFilter({distance: 10, color: 0x111111, outerStrength: 1.5})]
//       }
//     />
//   );
// });

// const Popup = memo(function Popup_(props: {
//   w: number,
//   h: number,
//   show: boolean,
//   callback: () => void,
//   children: ReactNode
// }) {
//   return (
//     <Container visible={props.show}>
//       {/* <RRect x={960-props.w/2} y={540-props.h/2} w={props.w} h={props.h}
//         col={0x222222}
//       />
//       <RRect x={970-props.w/2} y={550-props.h/2} w={props.w-20} h={props.h-20}
//         col={0x888888}
//       /> */}
//       <Circle x={960+props.w/2-90} y={540-props.h/2+70} sz={30} col={0xDD3322}
//         interactive={true} buttonMode={true} pointertap={props.callback}
//         filters={
//           [new GlowFilter({distance: 5, color: 0xDD3322, outerStrength: 1.5})]
//         }
//       />
//       {props.children}
//     </Container>
//   );
// });

interface TabsProps {
  x: number;
  y: number;
  w: number;
  h: number;
  titles: string[],
  children: ReactNode
}

const Tabs = memo(function Tabs_(props: TabsProps) {
  const [selected, setSelected] = useState(0);
  const selectors = useMemo(() => (
    props.titles.map((t, i) => (
      <Container key={i} interactive={true} buttonMode={true}
        x={props.x+40} y={props.y-35}
        pointertap={() => setSelected(i)}
      >
        <RRect x={110*i} y={0} w={100} h={42}
          col={'#D8D8D8'}
        />
        <UText x={20+110*i} y={10} h={20}
          text={t} col={'#000000'}
        />
      </Container>
    ))
  ), [selected, props.x, props.y]);
  return (
    <>
    {selectors}
    <Container>
      <RRect x={props.x} y={props.y} w={props.w} h={props.h}
        col={'#FFFFFF'} shadow
      />
    </Container>
    {selectors[selected]}
    {Children.map(props.children, (child, i) => i === selected ? child : null)}
    </>
  );
});

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

export { UText, Rect, RRect, Circle, Content, Tabs, ProgressBar };