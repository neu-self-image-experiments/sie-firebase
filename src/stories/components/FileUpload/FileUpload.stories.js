import React from 'react';
import { FileUpload } from './FileUpload';

/**
 * Example Component: File Upload
 */
export default {
  title: 'Example/FileUpload',
  component: FileUpload,
};

const Template = (args) => <FileUpload {...args} />;

// Default FileUpload
export const Default = Template.bind({});
Default.args = {
  onChange: null,
};
