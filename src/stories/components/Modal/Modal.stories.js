import React from 'react';
import { FormItem } from '../FormItem/FormItem';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

/**
 * Example Component: Modal
 */
export default {
  title: 'Example/Modal',
  component: Modal,
};


const Template = (args) => <Modal {...args}>
  <h3>Sample Header</h3>
  <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in.</p>
  <FormItem />
  <FormItem />
  <FormItem />
  <Button
    text="Sample Button"
    modifierClasses="button--small button--secondary"
  />
</Modal>;


export const Default = Template.bind({});
Default.args = {
  buttonText: 'Open Modal',
};
