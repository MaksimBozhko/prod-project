import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from './Dropdown';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  trigger: <button type="button">open</button>,
  items: [
    { content: 'one' },
    { content: 'two' },
    { content: 'three' },
  ],
};
