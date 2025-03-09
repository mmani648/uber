import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import { MapPin, DollarSign, Clock, Minus, Plus, CreditCard as Edit2 } from 'lucide-react-native';
import LiveMap from '../../components/LiveMap';

// Mock data for available rides
const AVAILABLE_RIDES = [
  {
    id: '1',
    pickup: '123 Main St',
    destination: '456 Market St',
    userBid: 25.50,
    distance: '2.5 miles',
    pickupCoords: { latitude: 37.7858, longitude: -122.4064 },
    destinationCoords: { latitude: 37.7935, longitude: -122.3956 },
    estimatedTime: '15 min',
    passenger: {
      name: 'John D.',
      rating: 4.8,
    },
  },
  {
    id: '2',
    pickup: '789 Park Ave',
    destination: '321 Mission St',
    userBid: 18.75,
    distance: '1.8 miles',
    pickupCoords: { latitude: 37.7898, longitude: -122.4021 },
    destinationCoords: { latitude: 37.7879, longitude: -122.3961 },
    estimatedTime: '12 min',
    passenger: {
      name: 'Sarah M.',
      rating: 4.9,
    },
  },
  {
    id: '3',
    pickup: '555 Howard St',
    destination: 'Ferry Building',
    userBid: 15.25,
    distance: '1.2 miles',
    pickupCoords: { latitude: 37.7873, longitude: -122.3964 },
    destinationCoords: { latitude: 37.7955, longitude: -122.3937 },
    estimatedTime: '8 min',
    passenger: {
      name: 'Mike R.',
      rating: 4.7,
    },
  },
];

export default function DriverScreen() {
  const [selectedRide, setSelectedRide] = useState(AVAILABLE_RIDES[0]);
  const [yourBid, setYourBid] = useState<Record<string, number>>({});
  const [draftBids, setDraftBids] = useState<Record<string, number>>({});
  const [editingBid, setEditingBid] = useState<string | null>(null);

  const initializeBid = (rideId: string, currentBid: number) => {
    const initialBid = Math.round((currentBid * 0.9) * 100) / 100;
    setDraftBids({ ...draftBids, [rideId]: initialBid });
  };

  const adjustBid = (rideId: string, increment: boolean) => {
    const currentBid = draftBids[rideId] || 0;
    const step = 0.50;
    const newBid = increment ? currentBid + step : currentBid - step;
    
    const ride = AVAILABLE_RIDES.find(r => r.id === rideId);
    if (ride) {
      const minBid = ride.userBid * 0.5;
      const maxBid = ride.userBid;
      
      if (newBid >= minBid && newBid <= maxBid) {
        setDraftBids({ ...draftBids, [rideId]: Math.round(newBid * 100) / 100 });
      }
    }
  };

  const handleCustomBidChange = (rideId: string, value: string) => {
    // Allow empty input or partial decimal numbers
    if (value === '' || value === '.') {
      setDraftBids({ ...draftBids, [rideId]: 0 });
      return;
    }

    const numericValue = parseFloat(value);
    const ride = AVAILABLE_RIDES.find(r => r.id === rideId);
    
    if (ride && !isNaN(numericValue)) {
      const minBid = ride.userBid * 0.5;
      const maxBid = ride.userBid;
      
      // Store the value even if it's outside the range
      // We'll validate on confirmation instead
      setDraftBids({ ...draftBids, [rideId]: Math.round(numericValue * 100) / 100 });
    }
  };

  const handlePlaceBid = (rideId: string) => {
    const finalBid = draftBids[rideId];
    const ride = AVAILABLE_RIDES.find(r => r.id === rideId);
    
    if (finalBid && ride) {
      const minBid = ride.userBid * 0.5;
      const maxBid = ride.userBid;
      
      if (finalBid < minBid || finalBid > maxBid) {
        Alert.alert(
          'Invalid Bid',
          `Bid must be between $${minBid.toFixed(2)} and $${maxBid.toFixed(2)}`
        );
        return;
      }
      
      setYourBid({ ...yourBid, [rideId]: finalBid });
      setDraftBids({ ...draftBids, [rideId]: undefined });
      setEditingBid(null);
    }
  };

  const renderRideItem = ({ item }: { item: typeof AVAILABLE_RIDES[0] }) => {
    const isSelected = selectedRide?.id === item.id;
    const hasPlacedBid = yourBid[item.id] !== undefined;
    const isDrafting = draftBids[item.id] !== undefined;
    const isEditing = editingBid === item.id;

    return (
      <TouchableOpacity 
        style={[styles.rideCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedRide(item)}
      >
        <View style={styles.rideHeader}>
          <View>
            <Text style={styles.passengerName}>{item.passenger.name}</Text>
            <Text style={styles.ratingText}>★ {item.passenger.rating}</Text>
          </View>
          <View style={styles.bidAmount}>
            <DollarSign size={16} color="#000" />
            <Text style={styles.bidText}>{item.userBid.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routePoint}>
            <MapPin size={16} color="#34A853" />
            <Text style={styles.routeText} numberOfLines={1}>{item.pickup}</Text>
          </View>
          <View style={styles.routePoint}>
            <MapPin size={16} color="#EA4335" />
            <Text style={styles.routeText} numberOfLines={1}>{item.destination}</Text>
          </View>
        </View>

        <View style={styles.rideDetails}>
          <View style={styles.detailItem}>
            <Clock size={16} color="#666" />
            <Text style={styles.detailText}>{item.estimatedTime}</Text>
          </View>
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>

        {hasPlacedBid ? (
          <View style={styles.bidPlaced}>
            <Text style={styles.bidPlacedText}>
              Your bid: ${yourBid[item.id].toFixed(2)}
            </Text>
          </View>
        ) : isDrafting ? (
          <View style={styles.bidAdjustContainer}>
            <View style={styles.bidControls}>
              {isEditing ? (
                <View style={styles.customBidContainer}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={styles.customBidInput}
                    value={draftBids[item.id].toString()}
                    onChangeText={(value) => handleCustomBidChange(item.id, value)}
                    keyboardType="decimal-pad"
                    autoFocus
                  />
                </View>
              ) : (
                <>
                  <TouchableOpacity 
                    style={styles.bidControl}
                    onPress={() => adjustBid(item.id, false)}
                  >
                    <Minus size={20} color="#000" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.bidDisplay}
                    onPress={() => setEditingBid(item.id)}
                  >
                    <Text style={styles.bidDisplayText}>
                      ${draftBids[item.id].toFixed(2)}
                    </Text>
                    <Edit2 size={16} color="#666" style={styles.editIcon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.bidControl}
                    onPress={() => adjustBid(item.id, true)}
                  >
                    <Plus size={20} color="#000" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.confirmBidButton}
              onPress={() => handlePlaceBid(item.id)}
            >
              <Text style={styles.confirmBidText}>Confirm Bid</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.bidButton}
            onPress={() => initializeBid(item.id, item.userBid)}
          >
            <Text style={styles.bidButtonText}>Place Bid</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Rides</Text>
      </View>

      <View style={styles.mapContainer}>
        <LiveMap
          pickup={selectedRide?.pickup}
          destination={selectedRide?.destination}
          pickupCoords={selectedRide?.pickupCoords}
          destinationCoords={selectedRide?.destinationCoords}
          height={250}
          showUserLocation={true}
        />
      </View>

      <FlatList
        data={AVAILABLE_RIDES}
        renderItem={renderRideItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ridesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter-Bold',
  },
  mapContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ridesList: {
    padding: 20,
    paddingTop: 0,
  },
  rideCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#000',
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  passengerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  bidAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bidText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  routeContainer: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  bidButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  bidButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bidPlaced: {
    backgroundColor: '#E6F7ED',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  bidPlacedText: {
    color: '#34A853',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bidAdjustContainer: {
    gap: 12,
  },
  bidControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  bidControl: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bidDisplay: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bidDisplayText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  editIcon: {
    marginLeft: 8,
  },
  confirmBidButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  confirmBidText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  customBidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    flex: 1,
    height: 48,
  },
  dollarSign: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 4,
  },
  customBidInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    padding: 0,
    height: '100%',
  },
});