import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { RRect } from './util';

export default {
  title: 'Util/RRect',
  component: RRect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    col: { control: 'color' },
  },
} as ComponentMeta<typeof RRect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RRect> = (args) => (
  <Layout>
    <RRect {...args} />
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 30,
  y: 30,
  w: 200,
  h: 200,
  col: '#000000',
  shadow: true
};