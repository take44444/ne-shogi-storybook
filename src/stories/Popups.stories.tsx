import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRef } from 'react';
import { context, Layout, ModalTools } from './layout';
import { Content, Modal, ModalButton } from './util';

export default {
  title: 'Util/Modal',
  component: ModalButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   callback: { action: true },
  // },
} as ComponentMeta<typeof ModalButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalButton> = () => {
  const modal = useRef<ModalTools>({
    open: {},
    buttonDisables: {},
  }).current;
  return (
    <Layout>
      <context.Provider value={modal}>
        <ModalButton x={-440} y={-230} sz={35} img={'friends'}
          callback={() => modal.open['friends']?.()}
        />
        <ModalButton x={-380} y={-230} sz={35} img={'settings'}
          callback={() => modal.open['settings']?.()}
        />
        <Modal w={400} h={400} id={'friends'} >
          <Content x={0} y={0}
            w={340} h={340} title={`Content 1`}
          />
        </Modal>
        <Modal w={400} h={400} id={'settings'} >
          <Content x={0} y={0}
            w={340} h={340} title={`Content 2`}
          />
        </Modal>
      </context.Provider>
    </Layout>
  );
};

export const Primary = Template.bind({});
