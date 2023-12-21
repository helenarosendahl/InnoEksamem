# OBS
Vi oplever desværre, at react natives calendar plugin kun virker på Android, og ikke fungerer på IOS. Vi har afprøvet forskellige andre metoder og moduler, herunder DateTimerPicker, dog uden held.

Hvis koden køres fra en Android enhed, vil hele koden køre optimalt.

Hvis koden køres fra en IOS enhed, skal linje 5 i filen Madspild/src/screens/donations/UploadDonationScreen.js udkommenteres; : “import { Calendar } from 'react-native-calendars’

Koden vil kunne køre, men et produkt vil ikke kunne uploades, da database-tabellen ikke tillader 'null' værdier. (Hvis man prøver at indtaste en dato, crasher appen) 


# Kør følgende: 
1. sudo npm install
2. npm start / npx expo start

I kan logge ind med kredentialerne:
email: Test@test.dk (husk stort T)
kode: TESTTEST (ALL CAPS)
På denne bruger ligger der allerede en anmodning til en donation. 
