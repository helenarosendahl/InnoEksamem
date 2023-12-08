// GlobalStyles.js

// tilføj flere farver herfra: https://reactnative.dev/docs/colors
export const colors = {
  lightGreen: '#90ee90', // Light green
  darkGreen: '#00563B', // Dark green 
  white: '#FFFFFF', // White
  grey: '#808080', // Grey 
  black: '#000000', // Black
};



export const globalStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15, //mellemrum mellem knapperne
    
  },
  card: {
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: colors.white,
    
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  sponsorItem: {
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
    backgroundColor: 'pink', 
    borderRadius: 10, 
    alignItems: 'center', 

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
    right: 10,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 1, 
  },
  offersContainer: { // Bruges på xxxOffers.js
    flex: 0.3, 
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
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
  },
};