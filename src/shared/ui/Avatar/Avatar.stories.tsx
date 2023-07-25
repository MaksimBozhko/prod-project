import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from 'shared/ui/Avatar/Avatar';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://icon-library.com/images/user-icon-jpg/user-icon-jpg-27.jpg',
  size: 150,
};

export const Small = Template.bind({});
Small.args = {
  src: 'https://icon-library.com/images/user-icon-jpg/user-icon-jpg-27.jpg',
  size: 50,
};
