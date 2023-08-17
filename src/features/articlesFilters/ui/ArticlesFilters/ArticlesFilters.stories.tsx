import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleSortField } from '../../model/consts/consts';
import { ArticlesFilters } from './ArticlesFilters';

export default {
  title: 'features/Article/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesFilters>;

const Template: ComponentStory<typeof ArticlesFilters> = (args) => <ArticlesFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  articlesFilters: {
    search: '12dfs',
    sort: ArticleSortField.VIEWS,
    order: 'asc',
  },
})];
