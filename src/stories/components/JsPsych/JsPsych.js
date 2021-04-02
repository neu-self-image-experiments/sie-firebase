/* eslint-disable */

import React from 'react';
import { useEffect } from 'react';

/**
 * Sample component to load jsPsych's "Hello World" tutorial experiment.
 *
 * @component
 * @return {object} (
 *   <React.Fragment />
 * )
 */
export const JsPsych = () => {
  // Load scripts of plugins used in the experiment
  useEffect(() => {
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    script.src = "../../../jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js";
    script2.src = "../../../jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js";
    script.async = true;
    script2.async = true;
    document.body.appendChild(script);
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
    }
  }, []);

  // Have to wait for the plugin scripts to be loaded asynchronously before
  // running the experiment; otherwise it crashes.
  setTimeout(() => {
    // Implementation of previous team: Part 1 -------------------------- START
    /* create timeline */
    var timeline = [];
    /* number of trials */
    var num_of_trial = 10

    /* define welcome message trial */
    var welcome = {
        type: "html-keyboard-response",
        stimulus: "Welcome to the experiment. Press any key to begin."
    };
    //timeline.push(welcome);

    /* define instructions */
    var instructions = {
        type: "html-keyboard-response",
        stimulus: 
            "<h1>Instruction</h1>" + 
            "<p>In this experiment, two images will be shown " +
            "on the screen. Choose the Pokemon that you you like best. </p>" +
            "<p>Press the letter <strong>E</strong> on the keyboard to select the image on the left.</p>" +
            "<p>Press the letter <strong>I</strong> on the keyboard to select the image on the left.</p> " +
            "<p></p>" +
            "<div style='width: 900px; margin: auto;'>" +
            "<div style='float: left;'><img width='300' src='/img/example1.jpg'></img>" +
            "<p class='small'><strong>Press the E key</strong></p></div>" +
            "<div class='float: right;'><img width='300' src='/img/example2.jpg'></img>" +
            "<p class='small'><strong>Press the I key</strong></p></div>" +
            "</div>" +
            "<p></p>" +
            "<p><strong>Press any key to begin.</strong></p>",
        post_trial_gap: 1000,
        on_finish: function(){
            //jsPsych.setProgressBar(0.05); // set progress bar to 5% full.
        }
    };
    timeline.push(instructions);

    /* generate trials with number of trials */
    function generateTrials (num_of_trial) {
        var trials = []
        for (let i = 1; i <= num_of_trial; i++) {
            var num_string = ""
            if (i < 10) {
                num_string = "0000" + i;
            } else if (i < 100) {
                num_string = "000" + i;
            } else if (i < 1000) {
                num_string = "00" + i;
            } else if (i < 10000) {
                num_string = "0" + i;
            } else {
                num_string = "" + i;
            }

            // var ori_file_path = "img/trials/rcic_mnes_1_" + num_string + "_ori.jpg"
            // var inv_file_path = "img/trials/rcic_mnes_1_" + num_string + "_inv.jpg"

            let inv_file_path = "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png";
            let ori_file_path = "https://cdn.bulbagarden.net/upload/7/73/004Charmander.png";

            var twoStimulusHtml = 
                //"<h3>Trial " + i + "</h3>" +
                // "<div style=\"height:307px; width:900px;\"><div style=\"width:900px; height: 30px; margin-top:135px; font-size:60px;\">+</div></div>" +
                "<div style='width: 900px; margin: auto;'>" +
                "<div style='float: left;'><img width='300' src='"+ ori_file_path +"'></img>" +
                "</div>" +
                "<div style='float: left; width: 300px; height: 300px;'>" + 
                "<div style='font-size: 60px; width:300px height: 30px; margin-top: 135px; margin-bottom: 135px;'>+</div>" +
                "</div>" +
                "<div class='float: left;'><img width='300' src='"+ inv_file_path +"'></img>" +
                "</div>" +
                "</div>"

            var new_stimuli = {
                stimulus: twoStimulusHtml,
                data: {label: 'trial', trial_num: i}
            }

            trials.push(new_stimuli)
        }
        return trials;
    }


    var fixation = {
        type: 'html-keyboard-response',
        stimulus: '<div style="height:307px; width:900px;"><div style="width:900px; height: 30px;  color:red; margin-top:135px; font-size:60px;">+</div></div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 1000, // From 1500
        data: {label: 'fixation'}
    }
    

    var trial = {
        type: "html-keyboard-response",
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['e', 'i'],
        data: jsPsych.timelineVariable('data'),
        trial_duration: 500, //1000,
        post_trial_gap: 0,
        on_finish: function(data) {
            if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('e')) {
                    data.selection = 'left';
                } else if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('i')) {
                    data.selection = 'right';
                } else {
                    data.selection = 'none';
                }

            // TODO
            //save_trial_answer(study_id, participant_id, data.trial_num, data.selection);
            
            //jsPsych.setProgressBar(data.trial_num * (0.95 / num_of_trial) + 0.05);
        }
    }

    var post_trial_pause = {
        type: 'html-keyboard-response',
        stimulus: '<div style="height:307px; width:900px;"><div style="width:900px; height: 30px;  color:blue; margin-top:135px; font-size:60px;">+</div></div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 250, // From 1500
        data: {label: 'post-fixation'}
    }

    //TODO
    // Async function to save trial answers to the database
    async function save_trial_answer (study_id, participant_id, trial_number, answer) {
        
    }

    var trial_procedure = {
        timeline: [fixation, trial, post_trial_pause],
        timeline_variables: generateTrials(num_of_trial),
        randomize_order: false,
        repetitions: 1
    }
    timeline.push(trial_procedure);


    var report_block = {
        type: "html-keyboard-response",
        stimulus: function() {
            var trials = jsPsych.data.get().filter({label: 'trial'});
            var trial_count = trials.count();

            var left_trials = trials.filter({selection: 'left'}).count();
            var right_trials = trials.filter({selection: 'right'}).count();

            var response_time = Math.round(trials.select('rt').mean());

            return "<h1>Completed!</h1>" +
                "<p>You completed " + trial_count +" trials.</p>" + 
                "<p>You selected image on the left in " + left_trials + " trials.</p>" + 
                "<p>You selected image on the right in " + right_trials + " trials.</p>" + 
                "<p>Your average response time "+ response_time +"ms.</p>" + 
                "<p></p>" +
                "<p>Press any key to complete the experiment. Thank you!</p>";            
        }
    };
    timeline.push(report_block);

    /* start the experiment */
    jsPsych.init({
        timeline: timeline,
        display_element: 'jspsych-target',
        on_finish: function() {
            jsPsych.data.displayData();
        }
    });
  // Implementation of previous team: Part 1 ------------------------------ END
  }, 1000);


  return (
    <div>
      {/* // Implementation of previous team: Part 2 ---------------- START */}
      <h3 id="title">Which one do you pick?</h3>

      <div id="instruction">
          <div class="key-instruction">E</div>
          <div id="between"></div>
          <div class="key-instruction">I</div>
      </div>

      <div id="jspsych-target"></div>
      {/* // Implementation of previous team: Part 2 ------------------ END */}
    </div>
  );
};