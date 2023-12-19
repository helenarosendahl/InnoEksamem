# OBS
Vi oplever desværre, at react natives calendar plugin kun virker på Android, og ikke optimalt på IOS. Vi har afprøvet forskellige andre metoder og moduler, herunder DateTimerPicker, dog uden held.

Hvis koden køres fra en Android enhed, vil hele koden køre optimalt.

Hvis koden køres fra en IOS enhed, anbefaler vi at udkommentere linje 5: “import { Calendar } from 'react-native-calendars’;” i filen Madspild/src/screens/donations/UploadDonationScreen.js

# Kør følgende: 
1. sudo npm install
2. npm start / npx expo start