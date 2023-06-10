# Frontend Practice

This project is an attempt to test my frontend skills such as good choices in library selection, code structuring, quality of code, proper abstractions and component composability to name a few.

You can find a live demo of the project [here](https://jokes-2.vercel.app/)

## Technology choices

I used the following technologies to help meet the requirements of the assessment:-

- Next js 13
    - Comes with more features than regular React, for example out of the box routing
    - Makes it easier to work with server side components
    - It's hot right now :)

- Tailwind
    - I enjoy it since it's close to regular CSS
    - It reduces a project's CSS footprint
    - It is very easy to customize thus we can work with bold designers easily :)

- Radix UI
    - Used this to build the most re-usable components, for example Inputs, Dropdowns, Modals/Dialogues e.t.c
    - Has a slight learning curve but it helps when working with bold designers

- Next Themes
    - Makes provisioning for dark/light mode a breeze
    - Works awesomely well with Next.js projects

- Lucide icons
    - This is a fantastic icon suit
    - Big shout out to the folks mantaining it

- React Query
    - Used this to manage server side state
    - Reduces reliance on Redux
    - Works very well straight out of the box

- React Hook Forms
    - Large forms are a pain to work with in React
    - React Hook Forms makes it easy to work with large/multiple forms

- Zod
    - This is the Robin to React Hook Forms, I used it for form validation
    - It's pretty cool, it can be used for typing purposes also.

- Zustand
    - Used it to help manage client side state, in this case, the mock authentication
    - I really like this library
    - It feels like light weight Redux
    - You can use some Redux middleware with it too
    - It doesn't need a Provider!

- Tanstack Table
    - This library provided tremendous help in building the data table
    - It's amazing that the Tanstack team has so many interesting projects

## Important folders and sub-folders

Below are the main folders that I used to organize the app:-

- app/
    - This directory contains the app's layouts and pages
    - The pages represent a route

- components/
    - Contains reusable components to build our app
    - These components are then used to build the pages
    - Most of our app is contained here
    - The **ui** sub-directory contains fundamental components needed by all other components, for example, Inputs, Dropdowns, Modals/Dialogues e.t.c
    - Below are the other sub-directories:-
        - auth/
            - Contains components concerned with authentication
        - dev/
            - Contains components to help in development, for example, markers for screen size
            - Assist in developer related activities, for example, responsiveness
        - icons/
            - Contains components icon components
        - jokes/
            - Contains components concerned with the jokes
        - loading-skeletons/
            - Contains components to be displayed during loading
        - nav/
            - Contains components rconcerned with the navigation bar
        - react-query/
            - Contains components concerned with React Query, for example Provider components for React Query
        - themes/
            - Contains components to help in theming, for example Providers and toggle components to assist in controlling themes

- config/
    - Contains config files, in our case configuration of our site, for example SEO descriptors for the home page, links for the navbar e.t.c

- lib/
    - Contains utility functions and also font settings are done here.
    - Basically, functions designed to be used all over the app are placed here

- stores/
    - Contains Zustand stores.

- styles/
    - Contains CSS files for the app

- types/
    - Contains reusable Typescript Types/Interfaces

- validation-schemas/
    - Contains Zod validation schemas for forms
    - Some of these schemas can also be used as types

## Conclusion

Thank you for this challenge!