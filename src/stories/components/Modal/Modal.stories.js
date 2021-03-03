import React from 'react';
import { FormItem } from '../FormItem/FormItem';
import { Button } from '../Button/Button';
import { Modal } from './Modal';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Example Component: Modal
 */
export default {
  title: 'Example/Modal',
  component: Modal,
};


const Template = (args) => <Modal {...args}>
  <Constrain modifierClasses="constrain--narrow">
    <h3>Sample Header</h3>
    <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
            has illud rationibus et. Prima ridens sit te, nam idque explicari
            expetendis in.</p>
    <Constrain modifierClasses="constrain--narrow">
      <FormItem />
      <FormItem />
      <FormItem />
      <Button
        text="Sample Button"
        modifierClasses="button--small button--secondary"
      />
    </Constrain>
  </Constrain>
</Modal>;


export const Default = Template.bind({});
Default.args = {
  theme: 'light',
  buttonText: 'Open Modal',
};
