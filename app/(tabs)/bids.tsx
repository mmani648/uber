import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { DollarSign, Clock, Car } from 'lucide-react-native';
import LiveMap from '../../components/LiveMap';
import PriceInput from '../../components/PriceInput';

// Mock data for driver bids
const MOCK_DRIVERS = [
  { id: '1', name: 'John D.', rating: 4.8, price: 15.50, eta: '5 min', car: 'Toyota Camry', distance: '0.5 miles away' },
  { id: '2', name: 'Sarah M.', rating: 4.9, price: 18.75, eta: '3 min', car: 'Honda Civic', distance: '0.3 miles away' },
  { id: '3', name: 'Mike T.', rating: 4.7, price: 14.25, eta: '8 min', car: 'Ford Focus', distance: '1.2 miles away' },
  { id: '4', name: 'Lisa K.', rating: 4.6, price: 16.00, eta: '10 min', car: 'Hyundai Sonata', distance: '1.5 miles away' },
];

export default function BidsScreen() {
  const params = useLocalSearchParams();
  const { 
    pickup, 
    destination, 
    pickupLat, 
    pickupLng, 
    destLat, 
    destLng 
  } = params;
  
  const [yourBid, setYourBid] = useState('15.00');
  const [driverBids, setDriverBids] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse coordinates from params
  const pickupCoords = pickupLat && pickupLng ? {
    latitude: parseFloat(pickupLat as string),
    longitude: parseFloat(pickupLng as string)
  } : null;
  
  const destinationCoords = destLat && destLng ? {
    latitude: parseFloat(destLat as string),
    longitude: parseFloat(destLng as string)
  } : null;
  
  useEffect(() => {
    // Simulate loading driver bids
    const timer = setTimeout(() => {
      setDriverBids(MOCK_DRIVERS);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePlaceBid = () => {
    if (!yourBid || parseFloat(yourBid) <= 0) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount');
      return;
    }
    
    Alert.alert(
      'Bid Placed',
      `Your bid of $${yourBid} has been placed. Drivers will be notified.`,
      [{ text: 'OK' }]
    );
  };
  
  const handleAcceptBid = (driver) => {
    Alert.alert(
      'Accept Bid',
      `Accept ${driver.name}'s bid of $${driver.price.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => {
            Alert.alert('Ride Confirmed', `${driver.name} will arrive in ${driver.eta}!`);
          }
        }
      ]
    );
  };
  
  const renderDriverItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.driverCard}
      onPress={() => handleAcceptBid(item)}
    >
      <View style={styles.driverHeader}>
        <Text style={styles.driverName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating} ★</Text>
        </View>
      </View>
      
      <View style={styles.driverDetails}>
        <View style={styles.detailItem}>
          <DollarSign size={16} color="#000" />
          <Text style={styles.detailText}>${item.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color="#000" />
          <Text style={styles.detailText}>{item.eta}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Car size={16} color="#000" />
          <Text style={styles.detailText}>{item.car}</Text>
        </View>
      </View>
      
      <Text style={styles.distanceText}>{item.distance}</Text>
      
      <TouchableOpacity 
        style={styles.acceptButton}
        onPress={() => handleAcceptBid(item)}
      >
        <Text style={styles.acceptButtonText}>Accept Bid</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Ride</Text>
      </View>
      
      <View style={styles.mapSection}>
        <LiveMap
          pickup={pickup as string}
          destination={destination as string}
          pickupCoords={pickupCoords}
          destinationCoords={destinationCoords}
          height={200}
          showUserLocation={true}
        />
      </View>
      
      <View style={styles.rideDetails}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>From:</Text>
          <Text style={styles.locationText}>{pickup || 'Current Location'}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>To:</Text>
          <Text style={styles.locationText}>{destination || 'Destination'}</Text>
        </View>
      </View>
      
      <View style={styles.bidContainer}>
        <Text style={styles.bidTitle}>Place Your Bid</Text>
        <Text style={styles.bidSubtitle}>Set the price you're willing to pay</Text>
        
        <PriceInput
          value={yourBid}
          onChangeText={setYourBid}
          minValue={5}
          maxValue={100}
          step={0.50}
        />
        
        <TouchableOpacity 
          style={styles.placeBidButton}
          onPress={handlePlaceBid}
        >
          <Text style={styles.placeBidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.driversContainer}>
        <Text style={styles.driversTitle}>Available Drivers</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Finding drivers...</Text>
          </View>
        ) : (
          <FlatList
            data={driverBids}
            renderItem={renderDriverItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.driversList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
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
  mapSection: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  rideDetails: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'Inter-Regular',
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter-Medium',
  },
  bidContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bidTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Inter-SemiBold',
  },
  bidSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Inter-Regular',
  },
  bidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#000',
    marginRight: 5,
    fontFamily: 'Inter-Medium',
  },
  bidInput: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
  },
  placeBidButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  placeBidButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
  },
  driversContainer: {
    flex: 1,
    padding: 20,
  },
  driversTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Inter-SemiBold',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  driversList: {
    paddingBottom: 20,
  },
  driverCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
  },
  ratingContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter-Medium',
  },
  driverDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Inter-Regular',
  },
  acceptButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
  },
});