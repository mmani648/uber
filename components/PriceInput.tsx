import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type PriceInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
};

export default function PriceInput({ 
  value, 
  onChangeText, 
  minValue = 5, 
  maxValue = 100,
  step = 0.50
}: PriceInputProps) {
  const decreaseValue = () => {
    const currentValue = parseFloat(value);
    if (!isNaN(currentValue) && currentValue > minValue) {
      onChangeText((currentValue - step).toFixed(2));
    }
  };
  
  const increaseValue = () => {
    const currentValue = parseFloat(value);
    if (!isNaN(currentValue) && currentValue < maxValue) {
      onChangeText((currentValue + step).toFixed(2));
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={decreaseValue}
      >
        <Minus size={20} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={increaseValue}
      >
        <Plus size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#000',
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 10,
    textAlign: 'center',
  },
});