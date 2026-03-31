import { JSOnFhir } from "@i4mi/js-on-fhir";

// connect to the relevant elements of the HTML DOM
const patientNameSpan = document.getElementById('patient-name-span');
const familyNameInput = document.getElementById('name-input');
const loadButton = document.getElementById('load-button');
loadButton.addEventListener('click', buttonClickHandler);


/* 
    set up js-on-fhir library 
    TODO: enter correct value(s) for the medinf lab server
    see js-on-fhir documentation: https://github.com/i4mi/fhir-wrappers.ts/tree/master/web
*/
const jsOnFhir = new JSOnFhir(
    'https//???',               // the BASE URL of the server
    '',                         // the client id  - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    '',                         // the redirect url - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    {                           // options
        doesNotNeedAuth: true   // disable auth mechanism since it's not necessary with medinf lab server
    }
);

// this function is called when the button is clicked
async function buttonClickHandler() {
    /*
        TODO:
            - use jsOnFhir for searching a patient resource that matches the value of familyNameInput
            - log the result to the console
            - extract the patient given name from the loaded resource
            - set the given name to the patientNameSpan

        see js-on-fhir documentation: https://github.com/i4mi/fhir-wrappers.ts/tree/master/web
    */
    patientNameSpan.innerText = familyNameInput.value;
}