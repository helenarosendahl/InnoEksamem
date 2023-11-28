// styles/GlobalStyles

const theme = {
    colors: {
      primary: '#4CAF50',   // Lys grøn
      secondary: '#A5D6A7', // blød grøn
      background: '#E8F5E9', // Meget lys grøn til baggrund
      textPrimary: '#2E7D32',  // Mørkegrøn til text
      textSecondary: '#78909C', // Grå til sekundær tekst
      error: '#D32F2F',    // Error-message farve
      white: '#FFFFFF',    // Hvid    
      black: '#000000',    // Sort
    },
  
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
  
    spacing: {
      tiny: 4,
      small: 8,
      medium: 16,
      large: 24,
      xlarge: 32,
    },
  
    borderRadius: {
      small: 4,
      medium: 8,
      large: 16,
    },
  };
  
  // Styles defineres for sig selv, for at udngå reference errors
  const styles = {
    input: {
      height: 40,
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.medium,
      backgroundColor: theme.colors.white,
      color: theme.colors.textPrimary,
      fontSize: theme.fontSize.medium,
    },
    picker: {
      height: 50,
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.white,
      color: theme.colors.textPrimary,
    },
    pickerItem: {
      height: 50,
      color: theme.colors.textPrimary,
      fontSize: theme.fontSize.medium,
    },
  };
  
  theme.styles = styles;
  
  export default theme;