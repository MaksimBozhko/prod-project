import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from 'entities/Article';
import { ArticleList } from './ArticleList';
import { Article } from '../../model/types/article';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

const article = {
  id: '1',
  title: 'Javascript news asfasjf asfjkask f',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Ulbi tv',
    avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
  },
  type: [
    'IT',
    'SCIENCE',
    'POLITICS',
    'ECONOMICS',
  ],
  blocks: [
    {
      id: '1',
      type: 'TEXT',
      title: 'Заголовок этого блока',
      paragraphs: ['Программа, которую поно запустить и средствами д'],
    },
    {
      id: '4',
      type: 'CODE',
      code: '<!DOCTYPE html>\n<html>\n  <body>\n   </script>\n  </body>\n</html>;',
    },
    {
      id: '5',
      type: 'TEXT',
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую пр — в VS Code или в Notepad++) новый фвём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '2',
      type: 'IMAGE',
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '3',
      type: 'CODE',
      code: 'ath.resolve(__dirname, \'db.json\'));\n\nserver.use(jsonServer.defaults({}))Server.bodyParser);',
    },
    {
      id: '7',
      type: 'TEXT',
      title: 'Заголовок этого блока',
      paragraphs: ['JavaScript — это язык, пя работы веб-страни;'],
    },
    {
      id: '8',
      type: 'IMAGE',
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '9',
      type: 'TEXT',
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, прогро вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
    },
  ],
} as Article;

export const LoadingBig = Template.bind({});
LoadingBig.args = {
  articles: [],
  isLoading: true,
  view: ArticleView.BIG,
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  articles: [],
  isLoading: true,
  view: ArticleView.SMALL,
};

export const ListSmall = Template.bind({});
ListSmall.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index),
    })),
  isLoading: false,
  view: ArticleView.SMALL,
};

export const ListBig = Template.bind({});
ListBig.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index),
    })),
  isLoading: false,
  view: ArticleView.BIG,
};
