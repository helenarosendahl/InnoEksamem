// GlobalStyles.js

// tilføj flere farver herfra: https://reactnative.dev/docs/colors
export const colors = {
  lightGreen: '#4d814a', // Light green
  darkGreen: '#00563B', // Dark green 
  white: '#FFFFFF', // White
  gray: 'gray', // Grey 
  black: '#000000', // Black
  mintGreen: '#e8f4ea'
};



export const globalStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00563B',
    textAlign: 'center',
  },
  
  settingscontainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  set_buttonText: {
    color: 'black', // Tekstfarve for knappen
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30, // Tilføjer topmargin
    marginLeft: 20, // Tilføjer venstremargin
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 15, //mellemrum mellem knapperne
    paddingVertical: 15, // Øger den vertikale padding
  paddingHorizontal: 60,
    
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  ContentBox: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#e8f4ea', // Lysegrøn
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#006400",
    
  },
  sponsorLogo: {
    width: 280,
    height: 100,
    resizeMode: 'contain',
    
  },
  sponsorHeadText: {
    textAlign: 'center',
    fontSize: 25,
  },
  sponsorText: {
    marginVertical: 10,
    textAlign: 'left',
    color: colors.black,
  },
 
  offerBox: { 
    width: 250, 
    height: 300,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: colors.mintGreen, 
    borderRadius: 10, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // For at skyggen vises på Android:
    elevation: 5,
  },

  offerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  offerName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  pointsContainer: { // Bruges på xxxOffers.js
    position: 'absolute',
    top: 0,
    left: '50%',
    backgroundColor: colors.mintGreen,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.darkGreen,
    borderWidth: 2,
    zIndex: 1, 
  },
  offersContainer: { // Bruges på xxxOffers.js
    flex: 0.3, 
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    height: 300,
  },
  offersContentContainer: { // Bruges på xxxOffers.js
    paddingHorizontal: 20, 
  },
  textBox: { // Boks med informations tekst i
    backgroundColor: '#e8f4ea',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#006400',
    marginVertical: 10,
  },

  ProfileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  linkText: { // Hvis vi laver et link
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: { // bruger profil billede
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    borderRadius: 50, // Optional: if you want a circular image
  },
  reloadIcon: {
    marginRight: 5,
    marginBottom: 5,
    marginTop:2,
    marginLeft: 5,
    color:colors.gray
  },
  editIcon: {
    marginRight: 5,
    marginBottom: 5,
    marginTop:1,
    marginLeft: 5,
    color:colors.gray
  },
};