import { JSOnFhir } from "@i4mi/js-on-fhir";

// connect to the relevant elements of the DOM
const patientNameSpan = document.getElementById('patient-name-span');
const loginButton = document.getElementById('login-button');


// set up js-on-fhir
const jsOnFhir = new JSOnFhir(
    'https://test.midata.coop', // the BASE URL of the server
    'vue-fhir-demo',            // the client id 
    'http://localhost:5173',    // the redirect url 
    {}                          // options
);

// handleAuthResponse() is called every time the page loads, and catches the callback during OAuth flow
jsOnFhir.handleAuthResponse().then((response) => {
    if (response) {
        console.log('auth successful', response);
        loadPatient();
    }
});

// on click on the login button, we call authenticate()
loginButton.addEventListener('click', () => jsOnFhir.authenticate());


// performs a search for Patient resource
async function loadPatient() {
    // since the project is set up so that we only have
    // access to one Patient resource (the one of the user logged in), 
    // we don't need any search parameters
    const searchBundle = await jsOnFhir.search('Patient', {});
    if (searchBundle.entry.length > 0) {
        const patientResource = searchBundle.entry[0].resource;
        // set the name to the element in the DOM
        patientNameSpan.innerText = patientResource.name[0].given[0];
    }
}



