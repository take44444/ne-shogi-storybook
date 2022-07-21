import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { Content, Popups } from './util';

export default {
  title: 'Util/Popups',
  component: Popups,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   callback: { action: true },
  // },
} as ComponentMeta<typeof Popups>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popups> = (args) => (
  <Layout>
    <Popups {...args}>
      {args.xs.map((_, i) => (
        <Content key={i} x={510-args.ws[i]/2} y={300-args.hs[i]/2}
          w={args.ws[i]-60} h={args.hs[i]-60} title={`Content ${i+1}`}
        />
      ))}
    </Popups>
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  xs: [40, 100],
  ys: [40, 40],
  buttonSzs: [35, 35],
  imgs: ['friends', 'settings'],
  ws: [400, 400],
  hs: [400, 400]
};