import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { Content, Tabs } from './util';

export default {
  title: 'Util/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = (args) => (
  <Layout>
    <Tabs {...args}>
      <Content x={args.x+30} y={args.y+30} w={args.w-60} h={args.h-60}
        title={'Content 1'}
      />
      <Content x={args.x+30} y={args.y+30} w={args.w-60} h={args.h-60}
        title={'Content 2'}
      />
    </Tabs>
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 50,
  y: 50,
  w: 400,
  h: 400,
  titles: ['1', '2']
};