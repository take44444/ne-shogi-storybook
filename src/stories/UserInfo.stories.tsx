import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';
import { UserInfo } from './user-info';


export default {
  title: 'Util/UserInfo',
  component: UserInfo,
} as ComponentMeta<typeof UserInfo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserInfo> = (args) => (
  <Layout>
    <UserInfo {...args} />
  </Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  x: 0,
  y: 0,
  sz: 140
};