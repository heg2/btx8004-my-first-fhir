import { JSOnFhir } from "@i4mi/js-on-fhir";

// connect to the relevant elements of the DOM
const patientNameSpan = document.getElementById('patient-name-span');
const loadButton = document.getElementById('load-button');
loadButton.addEventListener('click', buttonClickHandler);


// set up js-on-fhir library TODO: enter correct value(s) for the medinf lab server
const jsOnFhir = new JSOnFhir(
    'https//???',               // the BASE URL of the server
    '',                         // the client id  - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    '',                         // the redirect url - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    {                           // options
        doesNotNeedAuth: true   // disable auth mechanism since it's not necessary with medinf lab server
    }
);

// this function is run when the button is clicked
async function buttonClickHandler() {
    /*
        TODO:
            - use jsOnFhir to make a request for loading your patient resource 
            - log the result to the console
            - extract the patient given name from the loaded resource
            - set the name to the patientNameSpan
    */
    patientNameSpan.innerText = 'World!';
}