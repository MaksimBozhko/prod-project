import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AvatarDropDown } from './AvatarDropDown';

export default {
  title: 'features/AvatarDropDown',
  component: AvatarDropDown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropDown>;

const Template: ComponentStory<typeof AvatarDropDown> = (args) => <AvatarDropDown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
