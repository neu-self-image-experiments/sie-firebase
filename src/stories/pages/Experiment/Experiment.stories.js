import React from 'react';
import { MemoryRouter } from 'react-router';
import { Experiment } from './Experiment';

/**
 * Example Component: Experiment
 */
export default {
  title: 'Example/Experiment',
  component: Experiment,
};

const Template = (args) => {
  return (
    <MemoryRouter initialEntries={['/user/108/study/Pl3WJYa7vQ1ALVt0rHRV']}>
      <Experiment {...args} />
    </MemoryRouter>
  );
};

// Default
export const Default = Template.bind({});
Default.args = {
  preSurvey: 'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
  postSurvey: 'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
};
