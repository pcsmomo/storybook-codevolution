import Button from '@mui/material/Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Button',
  component: Button,
  argTypes: {
    variant: { control: 'radio', options: ['text', 'outlined', 'contained'] },
    color: {
      control: 'radio',
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
      ],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Button>;

// 'text' | 'outlined' | 'contained'

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  children: 'Primary',
};
