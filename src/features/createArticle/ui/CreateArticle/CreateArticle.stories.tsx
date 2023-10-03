import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateArticle } from './CreateArticle';

export default {
  title: 'features/CreateArticle',
  component: CreateArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateArticle>;

const Template: ComponentStory<typeof CreateArticle> = (args) => <CreateArticle {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};