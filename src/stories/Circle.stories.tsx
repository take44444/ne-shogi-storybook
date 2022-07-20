import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { Circle } from './util';

export default {
  title: 'Util/Circle',
  component: Circle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    col: { control: 'color' },
  },
} as ComponentMeta<typeof Circle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Circle> = (args) => (
  <Layout>
    <Circle {...args} />
  </Layout>
);
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 130,
  y: 130,
  sz: 100,
  col: '#000000',
  shadow: true
};