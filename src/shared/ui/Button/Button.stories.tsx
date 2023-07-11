import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonSize, ThemeButton } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  theme: ThemeButton.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Button',
  theme: ThemeButton.OUTLINE,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
  children: 'Button',
  theme: ThemeButton.OUTLINE,
  size: ButtonSize.L,
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
  children: 'Button',
  theme: ThemeButton.OUTLINE,
  size: ButtonSize.M,
};

export const Background = Template.bind({});
Background.args = {
  children: 'Button',
  theme: ThemeButton.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'Button',
  theme: ThemeButton.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  theme: ThemeButton.BACKGROUND_INVERTED,
  square: true,
};

export const SquareL = Template.bind({});
SquareL.args = {
  children: '>',
  theme: ThemeButton.BACKGROUND_INVERTED,
  size: ButtonSize.L,
  square: true,
};

export const SquareXL = Template.bind({});
SquareXL.args = {
  children: '>',
  theme: ThemeButton.BACKGROUND_INVERTED,
  size: ButtonSize.XL,
  square: true,
};
