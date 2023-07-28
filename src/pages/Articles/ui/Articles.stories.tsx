import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Articles from './Articles';

export default {
  title: 'pages/Articles',
  component: Articles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Articles>;

const Template: ComponentStory<typeof Articles> = () => <Articles />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
