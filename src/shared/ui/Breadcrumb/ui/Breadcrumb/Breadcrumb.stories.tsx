import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'shared/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
