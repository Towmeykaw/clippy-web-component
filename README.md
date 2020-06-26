# clippy-web-component
A Web Component for adding Clippy to a website

## Install

`npm install clippy-web-component`

## Example Usage

### LitElement
`import 'clippy-web-component'`

`<clippy-element .name="Bonzi" .hide=true .speakText="Hello world"></clippy-element>`

### Angular 
`import 'clippy-web-component'`

`<clippy-element speakText="Hello world"></clippy-element>`

Also in your app.module.ts add 

`schemas: [ CUSTOM_ELEMENTS_SCHEMA ],` 

### Available properties

    name: Specify which character should be used. Possible values include(Bonzi, Clippy, F1, Genie, Genius, Links, Merlin, Peedy, Rocky, Rover). Default value: 'Clippy'
    
    hide: Will show or hide the component. Default value: false
    
    top: Set the top start value of the element. Default value: 0
    
    left: Set the left start value of the element. Default value: 0
    
    speakText: Text that the element will speak through the speech bubble. Empty string removes the bubble. Default value: ''

### Try it out
To try it out just run 

`npm run build`

`npm run serve` 