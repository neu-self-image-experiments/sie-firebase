import React from 'react';
import { FormItem } from '../FormItem/FormItem';
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
    <FormItem />
    <FormItem />
    <FormItem />
  </Constrain>
</Modal>;


export const Default = Template.bind({});
Default.args = {
  theme: 'light',
};
