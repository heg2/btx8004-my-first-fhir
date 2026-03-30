import { JSOnFhir } from "@i4mi/js-on-fhir";

// connect to the relevant elements of the DOM
const patientNameSpan = document.getElementById('patient-name-span');
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', login);

const jsOnFhir = new JSOnFhir(
    'https://test.midata.coop', // the BASE URL of the server
    'vue-fhir-demo',            // the client id 
    'http://localhost:5173',    // the redirect url 
    {}                          // options
);

jsOnFhir.handleAuthResponse().then(() => {
    console.log('auth response successful');
    loadPatient();
});

async function loadPatient() {
    const searchBundle = await jsOnFhir.search('Patient', {});
    if (searchBundle.entry.length > 0) {
        const patientResource = searchBundle.entry[0].resource;
        patientNameSpan.innerText = patientResource.name[0].given[0];
    }
}

async function login() {
    jsOnFhir.authenticate();
}