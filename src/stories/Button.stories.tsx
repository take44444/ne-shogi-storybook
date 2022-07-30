import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { Button } from './util';

export default {
  title: 'Util/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   callback: { action: true },
  // },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <>
  {(args.img === 'settings' ||
    args.img === 'friends' ||
    args.img === 'x' ||
    args.img === 'class') && // || args.img === 'rule') &&
  <Layout>
    <Button {...args} />
  </Layout>
  }
  </>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 0,
  y: 0,
  sz: 35,
  img: 'settings',
  callback: () => {}
};