import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  value: '123',
  items: [
    {
      value: '1',
      content: 'adsfdf',
    },
    {
      value: '2',
      content: ';lg,hn;gh.',
    },
    {
      value: '3',
      content: 'rkmv vmkdfomv',
    },
  ],
  direction: 'bottom left',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  value: '123',
  items: [
    {
      value: '1',
      content: 'adsfdf',
    },
    {
      value: '2',
      content: ';lg,hn;gh.',
    },
    {
      value: '3',
      content: 'rkmv vmkdfomv',
    },
  ],
  direction: 'bottom right',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  value: '123',
  items: [
    {
      value: '1',
      content: 'adsfdf',
    },
    {
      value: '2',
      content: ';lg,hn;gh.',
    },
    {
      value: '3',
      content: 'rkmv vmkdfomv',
    },
  ],
  direction: 'top left',
};

export const TopRight = Template.bind({});
TopRight.args = {
  value: '123',
  items: [
    {
      value: '1',
      content: 'adsfdf',
    },
    {
      value: '2',
      content: ';lg,hn;gh.',
    },
    {
      value: '3',
      content: 'rkmv vmkdfomv',
    },
  ],
  direction: 'top right',
};
