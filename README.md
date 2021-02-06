# Self-Image Experiment
[![Build Status](https://travis-ci.com/quanganhhoang/sie-firebase.svg?branch=master)](https://travis-ci.com/quanganhhoang/sie-firebase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

1. __Owner__: [@quanganhhoang](https://github.com/quanganhhoang)
2. __Contributors__: [@alecherryy](https://github.com/alecherryy), [@venjason](https://github.com/venjason), [@stenizwahyudi](https://github.com/stenizwahyudi), [@fernandowinfield](https://github.com/fernandowinfield), [@cmutuc25](https://github.com/cmutuc25), [@denglish7](https://github.com/denglish7), [@harmanwho](https://github.com/harmanwho)

The repo contains development work for the SIE web-based application interface. The interface is implemented using React, Redux, Storybook, Sass and Jest. In the sections below you can useful information on how to set up your local environment and guidelines for a seamless workflow.

## Installation
To get started, clone this repo to your preferred folder, `cd` into the project and run
```
npm install
```
to install all dependecies. Once installation has completed, run 
```
npm run storybook
```
to initiate Storybook. To preview your work, go to [http://localhost:6006](http://localhost:6006); here, you will find a preview of the entire interface. Storybook allows you to view and test each component, parameter and responsive behavior. To read more about it, checkout Storybook's documentation [here](https://storybook.js.org/docs/react/get-started/introduction).

After running the commands above, you should be all set to start working.

## Folder Structure
All components can be found in the `src/stories/` folder; components are organized in three groups: Components, Layouts and Pages. When working on a new element, make sure to select the correct group within which your new component should live. Each component should be organized in the following manner:
```
src/
    stories/
        [components, layouts, pages]/
            ComponentName/
                ComponentName.js
                ComponentName.stories.js
                styles.scss
```

## Components and Styles
When creating a new component, make sure to include `JSDOC` to outline data types, parameters and return objects or values. Each comment should abide to the following structure:
```
/**
 * Component for element name.
 *
 * @component
 * @param {type} param explanation goes here.
 * @param {type param explanation goes here.
 * @return {type} description goes here.
 *
 */
```
Below, you can find a practical example of a new React component, which includes syntax, props, default values, etc. You can use the code below as a starting point:
```
/**
 * Component for button element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} text Text of the component.
 * @return {object} (
 *   <Button modifierClasses={modifierClasses} url={url} text={text} />
 * )
 */
export const Button = ({ modifierClasses, url, text }) => {
    return (
        <a
            href={url}
            className={['button', `${modifierClasses}`].join(' ')}
        >
            {text}
        </a>
    );
};

Button.propTypes = {
    /**
   * Button's modifier classes
   */
    modifierClasses: PropTypes.string,
    /**
   * Button's url
   */
    url: PropTypes.string.isRequired,
    /**
   * Button's text
   */
    text: PropTypes.string.isRequired,
};

Button.defaultProps = {
    modifierClasses: '',
};
```
Each component shall have its own Sass file which includes default styles and additional style for all component's variants. When overriding default styling, you can use "_modifier classes_" to apply additional styles to your component. Class name should follow the BEM Naming system, which you can read more about [here](http://getbem.com/naming/). According to BEM, each class name should be as follow:

1. Default component class: `.component`
2. Component variant class: `.component--variant`

Child elements of the component should use the followin class naming convention: `.component__element`. You can use the practical example below for reference.

__Default Card__
```
<div class="card">
    <h3 class="card__title">{ Title goes here }</h3>
    <p class="card__content">{ Content goes here}</p>
</div>
```
__White Card__
```
<div class="card card--white">
    <h3 class="card__title">{ Title goes here }</h3>
    <p class="card__content">{ Content goes here}</p>
</div>
```
### Styling Override
If you need to override styling of child elements within a component variant, you can do so by using nested styles in Sass. To find out more about how Sass works, you can read the documentation found [here](https://sass-lang.com/documentation). Below is a practical example based on the code snippets above:
```
// default styling
.card {
    background-color: blue;
}

.card__title {
    font-size: 20px;
}

// styling override
.card--white {
    backgroundc-color: white;

    .card__title {
        font-size: 36px;
    }
}
```
## Branching and Merging
When working on a new feature, checkout `master` and run
```
git pull
```
to make sure you have most up-to-date code base. After that, you create a new branch by running
```
git checkout -b feature/PROJECT-#-short-label
```
The `PROJECT` and `#` should match the project code and Jira ticket number you are currently on, like `SIE-4-create-card-component`; this will let your teammates know which feature your working on and review your work against the AC written on the ticket.

When your work is ready, open a PR into `master` and select __<u>at least one teammate</u>__ to review your work; if you run into conflicts, resolve them before passing your work onto someone else for review. Once your PR has been approved, it can be merge into the `master` branch and be integrated into the code base.

Reviewers are expected to actually take time to inspect the reviewee's work and flag any potential issue and/or oversight included in the branch; reviewees are expected to aknowledge any feedback and make adjustments accordingly.

Whenever a PR is approved, make sure you delete your branch to keep the repo clean and organized.