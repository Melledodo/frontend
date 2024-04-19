

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

function logFormData() {
    // Hent data fra inputfelterne
    var navn = document.getElementById('navn').value;
    var telefonnummer = document.getElementById('telefonnummer').value;
    var email = document.getElementById('email').value;
    var besked = document.getElementById('besked').value;

    // Log data til konsollen
    console.log("Navn: " + navn);
    console.log("Tefonnummer: " + telefonnummer);
    console.log("Email: " + email);
    console.log("Besked: " + besked);

    document.getElementById('navn').value = '';
    document.getElementById('telefonnummer').value = '';
    document.getElementById('email').value = '';
    document.getElementById('besked').value = '';
}

// Lyt efter klik på submit-knappen
document.getElementById('indsend').addEventListener('click', logFormData);
