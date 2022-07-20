import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { Rect } from './util';

export default {
  title: 'Util/Rect',
  component: Rect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    col: { control: 'color' },
  },
} as ComponentMeta<typeof Rect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Rect> = (args) => (
  <Layout>
    <Rect {...args} />
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 30,
  y: 30,
  w: 200,
  h: 200,
  col: '#000000'
};