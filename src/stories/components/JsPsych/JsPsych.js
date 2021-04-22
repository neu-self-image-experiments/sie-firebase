/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  observeStimuliCompletion,
  uploadSelectionResult,
} from '../../../firebase/api/gcp-utils';

/**
 * Component to load jsPsych's "Self Image Experiment".
 *
 * @component
 * @return {object} (
 *   <React.Fragment />
 * )
 */
export const JsPsych = ({ selectionTaskCompletionHandler }) => {
  const { experimentId, participantId } = useParams(); // Parse URL params
  const [stimuliUrls, setStimuliUrls] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    // Load participantId, experimentId, and 400 stimuli urls
    await observeStimuliCompletion(
      participantId,
      experimentId,
      setStimuliUrls,
      errorLoadingJsPsych,
    );
  }, []);

  useEffect(() => {
    if (stimuliUrls.length > 0) {
      setReady(true);
    }
  }, [stimuliUrls]);

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        // Implementation of previous team timeline & trial logic -------------------------- START
        /* create timeline */
        const timeline = [];

        /* number of trials */
        // NOTE: Adjust line below to shorten the number of trials. 199 will go through all 200 iterations.
        // NUMBER_OF_TRIALS = 199, means a total of 200 trials (0-indexed)
        const NUMBER_OF_TRIALS = 199;

        const exampleImageOne =
          'https://firebasestorage.googleapis.com/v0/b/cs6510-spr2021.appspot.com/o/example-' +
          'stimuli-images%2Fexample1.png?alt=media&token=8a6ee16a-0700-40ef-a7cf-5c3e380b5b3f';
        const exampleImageTwo =
          'https://firebasestorage.googleapis.com/v0/b/cs6510-spr2021.appspot.com/o/example-' +
          'stimuli-images%2Fexample2.png?alt=media&token=fb0a7373-add3-4187-9449-2f206fd08ae3';

        /* define instructions */
        const instructions = {
          type: 'html-keyboard-response',
          stimulus: function () {
            return (
              '<h1>Instruction</h1>' +
              '<p>In this experiment, two images will be shown ' +
              'on the screen. Choose the image that looks more like you. </p>' +
              '<p>Press the letter <strong>E</strong> on the keyboard to select the image on the left.</p>' +
              '<p>Press the letter <strong>I</strong> on the keyboard to select the image on the right.</p> ' +
              '<p></p>' +
              "<div style='width: 900px; margin: auto;'>" +
              "<div style='float: left;'><img width='300' src='" +
              exampleImageOne +
              "' alt='Error loading example 1'/>" +
              "<p class='small'><strong>Press the E key</strong></p></div>" +
              "<div class='float: right;'><img width='300' src='" +
              exampleImageTwo +
              "' alt='Error loading example 2'/>" +
              "<p class='small'><strong>Press the I key</strong></p></div>" +
              '</div>' +
              '<p></p>' +
              '<p><strong>Press any key to begin.</strong></p>'
            );
          },
        };
        timeline.push(instructions);

        // Preload images for trials
        var preload = {
          type: 'preload',
          images: stimuliUrls,
        };
        timeline.push(preload);

        /* generate trials with number of trials */
        function generateTrials(numberOfTrial) {
          const trials = [];
          for (let i = 0; i <= numberOfTrial; i++) {
            const invFilePath = stimuliUrls[i];
            const oriFilePath = stimuliUrls[i + 1];
            const twoStimulusHtml =
              // For the first 200 images that are rendered, show original on left & show inverted on right
              i <= numberOfTrial / 2
                ? "<div style='width: 900px; margin: auto;'>" +
                  "<div class='float: left;'><img width='300' src='" +
                  oriFilePath +
                  "'/>" +
                  '</div>' +
                  "<div style='float: left; width: 300px; height: 300px;'>" +
                  "<div style='font-size: 60px; width:300px height: 30px; margin-top: 135px; margin-bottom: 135px;'>+</div>" +
                  '</div>' +
                  "<div class='float: left;'><img width='300' src='" +
                  invFilePath +
                  "'/>" +
                  '</div>' +
                  '</div>'
                : // For the last 200 images that are rendered, show inverted on left & show original on right
                  "<div style='width: 900px; margin: auto;'>" +
                  "<div class='float: left;'><img width='300' src='" +
                  invFilePath +
                  "'/>" +
                  '</div>' +
                  "<div style='float: left; width: 300px; height: 300px;'>" +
                  "<div style='font-size: 60px; width:300px height: 30px; margin-top: 135px; margin-bottom: 135px;'>+</div>" +
                  '</div>' +
                  "<div class='float: left;'><img width='300' src='" +
                  oriFilePath +
                  "'/>" +
                  '</div>' +
                  '</div>';

            const newStimuli = {
              stimulus: twoStimulusHtml,
              data: { label: 'trial', trial_num: i },
            };
            trials.push(newStimuli);
          }
          return trials;
        }

        const fixation = {
          type: 'html-keyboard-response',
          stimulus:
            '<div style="height:307px; width:900px;"><div style="width:900px; height: 30px;  color:red; margin-top:135px; font-size:60px;">+</div></div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: 1000, // From 1500
          data: { label: 'fixation' },
        };

        const trial = {
          type: 'html-keyboard-response',
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['e', 'i'],
          data: jsPsych.timelineVariable('data'),
          trial_duration: 1000, // 1000,
          post_trial_gap: 0,
          on_finish: function (data) {
            if (data.response === 'e') {
              data.selection = 'left';
            } else if (data.response === 'i') {
              data.selection = 'right';
            } else {
              data.selection = 'none';
            }
          },
        };

        const postTrialPause = {
          type: 'html-keyboard-response',
          stimulus:
            '<div style="height:307px; width:900px;"><div style="width:900px; height: 30px;  color:blue; margin-top:135px; font-size:60px;">+</div></div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: 250, // From 1500
          data: { label: 'post-fixation' },
        };

        // Transforms the experimental data from JsPsych to follow the back end JSON scheme
        function transformExperimentData() {
          let trialSelections = jsPsych.data
            .get()
            .filter({ label: 'trial' })
            .select('selection').values;
          let newData = [];
          let columnHeaders = {
            stimulus: 'trial number',
            response:
              'trial response is whether or not the user chose the original image; 1 = correct, -1 = incorrect',
            trait: 'untrustworthy by default',
            subject:
              'trial subject is the placement of original image; 1 = left, 2 = right',
          };
          newData.push(columnHeaders);
          for (
            let trialNumber = 0;
            trialNumber < trialSelections.length;
            trialNumber++
          ) {
            let trialResponse;
            let trialSubject;
            // If the user doesn't make a selection, we are counting it as '-1'; an untrustworthy trial.
            if (trialNumber <= NUMBER_OF_TRIALS / 2) {
              // For the first half trials, original image on left.
              trialResponse = trialSelections[trialNumber] === 'left' ? 1 : -1;
              trialSubject = 1;
            } else {
              // For the second half trials, original image on right.
              trialResponse = trialSelections[trialNumber] === 'right' ? 1 : -1;
              trialSubject = 2;
            }
            let trialRow = {
              stimulus: trialNumber + 1,
              response: trialResponse,
              trait: 'untrustworthy',
              subject: trialSubject,
            };
            newData.push(trialRow);
          }
          return newData;
        }

        // Call backend api storeExperimentResult to connect with FireBase and update Users Collection with experiment data.
        function saveExperimentData(experimentData) {
          uploadSelectionResult(participantId, experimentId, experimentData);
          selectionTaskCompletionHandler(true);
        }

        const trialProcedure = {
          timeline: [fixation, trial, postTrialPause],
          timeline_variables: generateTrials(NUMBER_OF_TRIALS),
          randomize_order: false,
          repetitions: 1,
        };
        timeline.push(trialProcedure);

        const reportBlock = {
          type: 'html-keyboard-response',
          stimulus: function () {
            const trials = jsPsych.data.get().filter({ label: 'trial' });
            const trialCount = trials.count();
            const leftTrials = trials.filter({ selection: 'left' }).count();
            const rightTrials = trials.filter({ selection: 'right' }).count();
            const responseTime = Math.round(trials.select('rt').mean());
            return (
              '<h1>Completed!</h1>' +
              '<p>You completed ' +
              trialCount +
              ' trials.</p>' +
              '<p>You selected image on the left in ' +
              leftTrials +
              ' trials.</p>' +
              '<p>You selected image on the right in ' +
              rightTrials +
              ' trials.</p>' +
              '<p>Your average response time ' +
              responseTime +
              'ms.</p>' +
              '<p></p>' +
              '<p>Press any key to complete the experiment. Thank you!</p>'
            );
          },
        };
        timeline.push(reportBlock);

        // Checks to see if we have participantId, experimentId, and stimuli URLs ready
        if (ready) {
          /* start the experiment */
          jsPsych.init({
            timeline: timeline,
            display_element: 'jspsych-target',
            on_finish: function () {
              // Filter out data to only show 'trial' data via label
              let experimentalData = transformExperimentData(
                jsPsych.data.get().filter({ label: 'trial' }).json('pretty'),
              );
              saveExperimentData(experimentalData);
            },
          });
        }
        // Implementation of previous team timeline & trial logic ------------------------------ END
      }, 1000);
    }
  }, [ready]);

  // Error handler that prompts the participant to re-click experiment.
  const errorLoadingJsPsych = (errorCode) => {
    window.alert(
      'Something went wrong. Please click on experiment again.' +
        ' Error code: ' +
        errorCode,
    );
  };

  return (
    <div>
      {/* Including necessary JsPsych plugin classes & button cues */}
      <h4 id="title">Which one do you pick?</h4>
      <div id="instruction">
        <div class="key-instruction">E - select image on left</div>
        <div id="between" />
        <div class="key-instruction">I - select image on right</div>
      </div>
      <p/>
      <h5 id="note">Note: close experiment window when finished</h5>
      <div id="jspsych-target"></div>
    </div>
  );
};
