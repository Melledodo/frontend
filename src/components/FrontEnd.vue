<script setup>
import { ref, reactive } from 'vue';

const navn = ref('');
const telefonnummer = ref('');
const email = ref('');
const besked = ref('');
const showMessage = ref(false);
const kontakter = reactive([]);


const onSubmitForm = () => {
    fetch('https://frontend-melledodo-default-rtdb.europe-west1.firebasedatabase.app/kontakt.json', {
        method: 'POST',
        body: JSON.stringify({
            navn: navn.value,
            telefonnummer: telefonnummer.value, 
            email: email.value,
            besked: besked.value
        }),
    })
    .then (() => {
        getKontakt();
        showMessage.value = true; 
        navn.value = '';
        telefonnummer.value = '';
        email.value = '';
        besked.value = '';
    });
};

const getKontakt = () => {
    fetch('https://frontend-melledodo-default-rtdb.europe-west1.firebasedatabase.app/kontakt.json', {
        method: 'GET',
    })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      const keys = Object.keys(response);
      const newKontakter = keys.map((key) => response[key]);
      kontakter.splice(0, kontakter.length, ...newKontakter);
    });
};

getKontakt();

</script>

<template>
    
<body>
<header>
        <a href="https://www.pscecilie.dk/">Forside</a>
        <a href="https://www.pscecilie.dk/om-mig/">Om Mig</a>
        <a href="http://localhost:5173/">Booking</a>
        <a href="/mail-admin">Admin</a>
</header>
<div class="siden">
<div class="billede">
    <img class="cecilie" src="https://firebasestorage.googleapis.com/v0/b/melledodo-3sem.appspot.com/o/cecilie-mackeprang.webp?alt=media&token=0f543f3b-4252-4083-8730-88d0bdd078d4" alt="Billede fra Instagram">
</div>
    <form v-on:submit.prevent="onSubmitForm">
    <p>Fulde navn</p>
    <input id="navn" type="text" v-model="navn" placeholder="Navn">
    <p>Telefonnummer</p>
    <input id="telefonnummer" type="number" v-model="telefonnummer" placeholder="Nummer">
    <p>Email adresse</p>
    <input id="email" type="email" v-model="email" placeholder="Email">
    <p>Besked</p>
    <input id="besked" type="text" v-model="besked" placeholder="meddelelse">
    <button id="indsend" type="submit">Send</button>
    <div v-if="showMessage">Besked modtaget! Tak for din henvendelse.</div>
    </form>
</div>
<div class="admin">
    <div class="mailboks">
        <ul class="kontaktliste">
            <li v-for="(kontakt, index) in kontakter" :key="index">
            <div class="kontakt">
            <p>Navn: {{ kontakt.navn }}</p>
            <p>Telefonnummer: {{ kontakt.telefonnummer }}</p>
            <p>Email: {{ kontakt.email }}</p>
            <p>Besked: {{ kontakt.besked }}</p>
            </div>
            </li>
        </ul>
    </div>
</div>
</body>
</template>

<style scoped>

header{
    background-color: #cf7c6b;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: right;
}

a{
    margin-right: 20px;
    font-family: 'Courier New', Courier, monospace;
    color: black;
}

.siden{
    height: auto;
    width: auto;
    display: flex;
}

.billede{
    height: 830px;
    width: 595px;
    border: solid 3px;
    margin: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cecilie{
    height: 100%;
}

form{
    height: 830px;
    width: 600px;
    border: solid 3px;
    margin: 100px;
    display: flex;
    flex-direction: column;
}

p{
    margin: 10px;
}

#navn{
    height: 30px;
    margin: 10px;
}

#telefonnummer{
    height: 30px;
    margin: 10px;
}

#email{
    height: 30px;
    margin: 10px;
}

#besked{
    height: 200px;
    margin: 10px;
}

#indsend{
    height: 30px;
    margin: 10px;
    margin-top: 20px;
    background-color: #cf7c6b;
}

.admin{
    height: 400px;
    width: 1410px;
    border: solid 3px;
    margin-left: 100px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mailboks{
    height: 350px;
    width: 1410px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
}

.kontaktliste {
    list-style-type: none; 
    padding: 0; 
    display: flex; 
    flex-wrap: wrap; 
    gap: 20px; 
  }

  .kontakt {
    width: 650px;
    border: 1px solid #ccc; 
    padding: 10px; 
    flex: 1 0 calc(50% - 20px); 
  }

</style>