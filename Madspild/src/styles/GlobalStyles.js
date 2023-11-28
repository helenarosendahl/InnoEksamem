// GlobalStyles.js
export const colors = {
  lightGreen: '#90ee90', // Light green
  darkGreen: '#006400', // Dark green for contrast
  white: '#FFFFFF', // White for backgrounds and texts
  grey: '#808080', // Grey for subtle elements
  black: '#000000', // Black for text
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
  },
  button: {
    padding: 10,
    borderRadius: 5,
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
};