import { JSOnFhir } from "@i4mi/js-on-fhir";

// connect to the relevant elements of the DOM
const patientNameSpan = document.getElementById('patient-name-span');
const familyNameInput = document.getElementById('name-input');
const loadButton = document.getElementById('load-button');
loadButton.addEventListener('click', buttonClickHandler);


// set up js-on-fhir library 
const jsOnFhir = new JSOnFhir(
    'https://fhir.medinflab.ti.bfh.ch', // the BASE URL of the server (without /fhir endpoint)
    '',                                 // the client id - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    '',                                 // the redirect url - only needed for SMART on FHIR flow (not necessary with medinf lab server)
    {                                   // options
        doesNotNeedAuth: true           // disable auth mechanism since it's not necessary with medinf lab server
    }
);

// this function is called when the button is clicked
async function buttonClickHandler() {
    try {
        if (familyNameInput.value) {
            // use js-on-fhir to search for a patient resource matching the familyNameInput.value
            const searchBundle = await jsOnFhir.search('Patient', {family: familyNameInput.value});
            // log the result to the console
            console.log('Got bundle with ' + searchBundle.entry?.length + ' entries:', searchBundle);

            // notify user if there is no matching resource 
            if (!searchBundle.entry) {
                window.alert('No patient found for input=' + familyNameInput.value);
                return;
            }

            // Alternative if we know the logical id - direct fetch:
            // const patId = '155';
            // const patientResource = await jsOnFhir.getResource('Patient', id);

            // extract the patient given name from the loaded resource
            const patientResource = searchBundle.entry[0].resource;
            const givenName = patientResource?.name[0]?.given[0]

            // set the name to the patientNameSpan
            patientNameSpan.innerHTML = givenName;
        }
    } 
    catch(e) {
        console.error(e);
        window.alert('Something went wrong. See console for details.')
    }
}