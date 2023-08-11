import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, ThemeText } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Lorem title text',
  text: 'Lorem text',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Lorem title text',
  text: 'Lorem text',
  theme: ThemeText.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
  title: 'Lorem title text',
};

export const onlyText = Template.bind({});
onlyText.args = {
  text: 'Lorem text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Lorem title text',
  text: 'Lorem text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
  title: 'Lorem title text',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
  text: 'Lorem text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const sizeL = Template.bind({});
sizeL.args = {
  text: 'Lorem text',
  size: TextSize.L,
};

export const sizeS = Template.bind({});
sizeS.args = {
  text: 'Lorem text',
  size: TextSize.S,
};
