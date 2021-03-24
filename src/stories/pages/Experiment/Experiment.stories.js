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
  title: 'Asian Americans\' Self-Representations',
  description: 'Lorem ipsum dolor sit amet, per assum paulo ' +
    'accommodare cu, eam ad erat debet, vis cu apeirian dignissim. ' +
    'Vim ei commune vivendum postulant, mentitum repudiare moderatius' +
    'mel ne. Vix et ocurreret repudiare. Rebum tritani fuisset eum id.',
  url: '#',
  consent: 'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
  preSurveys: [
    'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
  ],
  postSurveys: [
    'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
  ],
};
