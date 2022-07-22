import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { ProgressBar } from './util';

export default {
  title: 'Util/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <Layout>
    <ProgressBar {...args} />
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 0,
  y: 0,
  w: 300,
  h: 10,
  percentage: 70,
};