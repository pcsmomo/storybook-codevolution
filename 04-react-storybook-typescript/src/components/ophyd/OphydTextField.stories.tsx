import OphydTextField from './OphydTextField';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Ophyd/TextField',
  component: OphydTextField,
  argTypes: {
    value: { control: 'text' },
  },
} as ComponentMeta<typeof OphydTextField>;

const Template: ComponentStory<typeof OphydTextField> = (args) => (
  <OphydTextField {...args} />
);

// export const Basic = () => <OphydTextField />;
export const Basic = Template.bind({});
Basic.args = {
  value: '0.192193814',
  label: 'DCM energy',
  limits: [100, 200],
};
