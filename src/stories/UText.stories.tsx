import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { UText } from './util';


export default {
  title: 'Util/UText',
  component: UText,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    col: { control: 'color' },
  },
} as ComponentMeta<typeof UText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UText> = (args) => (
  <Layout>
    <UText {...args} />
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 0,
  y: 0,
  h: 40,
  text: 'Hello, World!',
  col: '#000000'
};