// Components/Forms/RadioButton.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../../styles/GlobalStyles';

export const RadioButton = ({ options, selectedOption, onSelect }) => (
  <View>
    {options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        onPress={() => onSelect(option.value)}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.lightGreen,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedOption === option.value && (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: colors.lightGreen,
              }}
            />
          )}
        </View>
        <Text style={{ marginLeft: 10 }}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);