/* eslint-disable no-unused-vars */
import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { JsPsych } from '../JsPsych/JsPsych';
import { ScreenTakeover } from '../../layouts/ScreenTakeover/ScreenTakeover';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

/**
 * Component for consent form element.
 *
 * @component
 * @param {string} url of the component.
 * @return {object}
 *   <ImageSelectionTask url={url} />
 * )
 */
export const ImageSelectionTask = ({ url }) => {
  const [hideTask, setHideTask] = useState(true);
  return (
    <Fragment>
      {/* <p>In the following computer task, you will complete a series of*/}
      {/*  trials where you will be asked to make a split-second*/}
      {/*  choice between two images of yourself.</p>*/}
      {/* <p>Each image is based on an actual photograph of you, but there */}
      {/*  is noise/*/}
      {/*  static on top of the photo that may alter its appearance.*/}
      {/*  The differences between the two images may be quite subtle,*/}
      {/*  so we ask that you go with your gut.</p>*/}
      {/* <p>Two pictures will appear side by side on the screen.*/}
      {/*  For each pair of pictures, we would like you to select the */}
      {/*  picture that*/}
      {/*  is most like you. To select the image on the left side press the */}
      {/* E key;*/}
      {/*  to select the image on the right press the I key.</p>*/}
      {/* <p>This task is timed and will take approximately 20 minutes to */}
      {/* complete.*/}
      {/*  There are no wrong answers, so GO AS FAST AS YOU CAN.*/}
      {/*  Responses that are too slow will not be recorded.</p>*/}
      {/* <p>To get started, <a href={url}>click here</a>.</p>*/}

      {/* <Button
        isButton={true}
        onClick={() => setHideTask(false)}
        text="Start Experiment"
      />
      <ScreenTakeover isHidden={hideTask}> */}
      <Modal buttonText="Start Experiment">
        <JsPsych />
      </Modal>
      {/* </ScreenTakeover> */}
    </Fragment>
  );
};

ImageSelectionTask.propTypes = {
  /**
   * ImageSelectionTask's url
   */
  url: PropTypes.string.isRequired,
};

ImageSelectionTask.defaultProps = {
  url: '',
};
