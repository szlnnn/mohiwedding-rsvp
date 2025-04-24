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
            addGuestPlaceholder: 'Kérlek add meg a vendég neveket',
            thanks: 'Köszönjük!',
            countdownText: 'Már csak {{days}} nap, {{hours}} óra, {{minutes}} perc és {{seconds}} másodperc van hátra!',
            countdownHeader: ' Alig várjuk, hogy együtt ünnepeljünk!',
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
            addGuestPlaceholder: 'Please add guests',
            thanks: 'Thank You!',
            countdownText: 'Only {{days}} days, {{hours}} hours, {{minutes}} minutes and {{seconds}} seconds to go! ',
            countdownHeader: ' We can’t wait to celebrate with you!',
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
