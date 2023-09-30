import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateArticleBlocks } from './CreateArticleBlocks';

export default {
  title: 'shared/CreateArticleBlocks',
  component: CreateArticleBlocks,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CreateArticleBlocks>;

const Template: ComponentStory<typeof CreateArticleBlocks> = (args) => <CreateArticleBlocks {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
