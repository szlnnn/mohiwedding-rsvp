import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    hu: {
        translation: {
            name: 'Név',
            email: 'Email',
            guestNames: 'Vendégek nevei',
            numberOfGuests: 'Vendégek száma',
            veganMenus: 'Vegetáriánus menük',
            attending: 'Részt veszek 💍',
            submit: 'RSVP elküldése',
            thankYou: '🎉 Köszönjük! A visszajelzést megkaptuk.',
            addGuestPlaceholder: 'Kérlek add meg a vendég nevét majd nyomj a plusz ikonra!',
            thanks: 'Köszönjük!',
            countdownText: 'Már csak {{days}} nap, {{hours}} óra, {{minutes}} perc és {{seconds}} másodperc van hátra!',
            countdownHeader: ' Alig várjuk, hogy együtt ünnepeljünk!',
            weddingDateExact: "2025. szeptember 20. – 15:30",
            noGuests: "Még nem adtál meg vendéget.",
            invitationText: "Szeretettel meghívunk az esküvőnkre.\nHa válaszolni szeretnél, nyomd meg a Válasz gombot.\nHa többet szeretnél megtudni az esküvőről, nyomd meg az Infó gombot.",
            respond: "Válasz",
            info: "Infó"
        },
    },
    en: {
        translation: {
            name: 'Name',
            email: 'Email',
            guestNames: 'Guest Names',
            numberOfGuests: 'Number of Guests',
            veganMenus: 'Vegan Menus',
            attending: 'I will be attending 💍',
            submit: 'Submit RSVP',
            thankYou: '🎉 Thank you! Your RSVP has been received.',
            addGuestPlaceholder: 'Please provide the guest name and press the add icon!',
            thanks: 'Thank You!',
            countdownText: 'Only {{days}} days, {{hours}} hours, {{minutes}} minutes and {{seconds}} seconds to go! ',
            countdownHeader: ' We can’t wait to celebrate with you!',
            weddingDateExact: "September 20, 2025 at 3:30 PM",
            noGuests: "No guests listed.",
            invitationText: "We would like to invite you to our ceremony.\nIf you wish to respond, press the Respond button.\nIf you wish to find out more about the wedding, press the Info button.",
            respond: "Respond",
            info: "Info"
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'hu', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
