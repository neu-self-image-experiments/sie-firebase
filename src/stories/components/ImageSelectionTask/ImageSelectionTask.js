/* eslint-disable no-unused-vars */
import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { JsPsych } from '../JsPsych/JsPsych';
import { Modal } from '../../components/Modal/Modal';

/**
 * Component for consent form element.
 *
 * @component
 * @param {string} url of the component.
 * @param {func} selectionTaskCompletionHandler sets the tasks as complete
 * @return {object}
 *   <ImageSelectionTask url={url} />
 * )
 */
export const ImageSelectionTask = ({
  url,
  selectionTaskCompleted,
  selectionTaskCompletionHandler,
}) => {
  return (
    <Fragment>
      <p>
        In the following computer task, you will complete a series of trials
        where you will be asked to make a split-second choice between two images
        of yourself.
      </p>
      <p>
        Each image is based on an actual photograph of you, but there is noise/
        static on top of the photo that may alter its appearance. The
        differences between the two images may be quite subtle, so we ask that
        you go with your gut.
      </p>
      <p>
        Two pictures will appear side by side on the screen. For each pair of
        pictures, we would like you to select the picture that is most like you.
        To select the image on the left side press the E key; to select the
        image on the right press the I key.
      </p>
      <p>
        This task is timed and will take approximately 20 minutes to complete.
        There are no wrong answers, so GO AS FAST AS YOU CAN. Responses that are
        too slow will not be recorded.
      </p>
      <p>To get started</p>
      <Modal
        buttonText="Start Experiment"
        canOpen={!selectionTaskCompleted}
        canClose={selectionTaskCompleted}
      >
        <JsPsych
          selectionTaskCompletionHandler={selectionTaskCompletionHandler}
        />
      </Modal>
    </Fragment>
  );
};

ImageSelectionTask.propTypes = {
  /**
   * ImageSelectionTask's url
   */
  url: PropTypes.string.isRequired,
  /**
   * ImageSelectionTask's prop to know if the task is complete
   */
  selectionTaskCompleted: PropTypes.bool,
  /**
   * ImageSelectionTask's completion handler
   */
  selectionTaskCompletionHandler: PropTypes.func,
};

ImageSelectionTask.defaultProps = {
  url: '',
};
