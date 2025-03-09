import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import { MapPin, Search, Navigation } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import LiveMap from '../../components/LiveMap';

// Mock data for location search
const SUGGESTED_LOCATIONS = [
  { id: '1', name: 'Work - 123 Business St', coords: { latitude: 37.7899, longitude: -122.4094 } },
  { id: '2', name: 'Home - 456 Home Ave', coords: { latitude: 37.7599, longitude: -122.4194 } },
  { id: '3', name: 'Gym - 789 Fitness Blvd', coords: { latitude: 37.7699, longitude: -122.4294 } },
  { id: '4', name: 'Coffee Shop - 101 Brew St', coords: { latitude: 37.7799, longitude: -122.4394 } },
  { id: '5', name: 'Shopping Mall - 202 Retail Rd', coords: { latitude: 37.7499, longitude: -122.4494 } },
];

export default function HomeScreen() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [pickupCoords, setPickupCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        // Set initial pickup to current location
        if (!pickup) {
          setPickupCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setPickup('Current Location');
        }
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to use all features of this app.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);
  
  const handleLocationSelect = (item, isPickup = false) => {
    if (isPickup) {
      setPickup(item.name);
      setPickupCoords(item.coords);
    } else {
      setDestination(item.name);
      setDestinationCoords(item.coords);
    }
  };
  
  const handleRequestRide = () => {
    if (pickup && destination) {
      router.push({
        pathname: '/(tabs)/bids',
        params: { 
          pickup, 
          destination,
          pickupLat: pickupCoords?.latitude.toString(),
          pickupLng: pickupCoords?.longitude.toString(),
          destLat: destinationCoords?.latitude.toString(),
          destLng: destinationCoords?.longitude.toString()
        }
      });
    } else {
      Alert.alert(
        'Missing Information',
        'Please enter both pickup and destination locations.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    
    // If pickup is set to current location, update the coordinates
    if (pickup === 'Current Location') {
      setPickupCoords(location);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RideBid</Text>
        <Text style={styles.subtitle}>Where riders set the price</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <LiveMap 
          pickup={pickup}
          destination={destination}
          pickupCoords={pickupCoords}
          destinationCoords={destinationCoords}
          height={250}
          showUserLocation={true}
          onLocationChange={handleLocationChange}
        />
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MapPin size={20} color="#34A853" />
            <TextInput
              style={styles.input}
              placeholder="Pickup location"
              value={pickup}
              onChangeText={setPickup}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <MapPin size={20} color="#EA4335" />
            <TextInput
              style={styles.input}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, (!pickup || !destination) && styles.buttonDisabled]} 
          onPress={handleRequestRide}
          disabled={!pickup || !destination}
        >
          <Text style={styles.buttonText}>Request Ride & Set Your Price</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter-Regular',
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationIcon: {
    
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
  },
  recentContainer: {
    padding: 20,
    flex: 1,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter-SemiBold',
  },
  recentList: {
    flex: 1,
  },
  locationItemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  recentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  locationButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  locationButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
  },
  pickupButton: {
    backgroundColor: '#E6F7ED',
  },
  destinationButton: {
    backgroundColor: '#FEEAE6',
  },
  locationButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});