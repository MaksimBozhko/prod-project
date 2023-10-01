import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Textarea } from './Textarea';

export default {
  title: 'shared/Textarea',
  component: Textarea,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'enter',
  value: '123',
};
