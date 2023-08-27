import { KanjiDisplay } from './KanjiDisplay';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/KanjiDisplay',
  component: KanjiDisplay,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Lesson_1 = {
  args: {
lesson: '1'
  },
};

export const Lesson_6a = {
  args: {
    lesson: '6a'
  },
};

export const Lessson_18c = {
  args: {
lesson: '18c'
  },
};

