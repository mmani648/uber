import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react-native';

// Mock data for ride history
const RIDE_HISTORY = [
  {
    id: '1',
    date: 'Today, 2:30 PM',
    pickup: '123 Main St',
    destination: '456 Market St',
    price: 18.50,
    driver: 'John D.',
    rating: 5,
    status: 'completed'
  },
  {
    id: '2',
    date: 'Yesterday, 9:15 AM',
    pickup: '789 Park Ave',
    destination: '101 Office Blvd',
    price: 22.75,
    driver: 'Sarah M.',
    rating: 4,
    status: 'completed'
  },
  {
    id: '3',
    date: 'May 15, 5:45 PM',
    pickup: '202 Home Lane',
    destination: 'Downtown Mall',
    price: 15.25,
    driver: 'Mike T.',
    rating: 5,
    status: 'completed'
  },
  {
    id: '4',
    date: 'May 12, 8:30 AM',
    pickup: 'Airport Terminal',
    destination: 'Grand Hotel',
    price: 35.00,
    driver: 'Lisa K.',
    rating: 4,
    status: 'completed'
  },
  {
    id: '5',
    date: 'May 10, 7:20 PM',
    pickup: 'Restaurant Row',
    destination: '123 Main St',
    price: 12.50,
    driver: 'David R.',
    rating: 5,
    status: 'completed'
  },
  {
    id: '6',
    date: 'May 5, 3:10 PM',
    pickup: 'Central Park',
    destination: 'Public Library',
    price: 9.75,
    driver: 'Emma S.',
    rating: 3,
    status: 'completed'
  },
];

export default function HistoryScreen() {
  const renderRatingStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            color={i < rating ? '#FFD700' : '#ddd'} 
            fill={i < rating ? '#FFD700' : 'none'}
          />
        ))}
      </View>
    );
  };

  const renderRideItem = ({ item }) => (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.routeContainer}>
        <View style={styles.routeIcons}>
          <View style={styles.originDot} />
          <View style={styles.routeLine} />
          <View style={styles.destinationDot} />
        </View>
        
        <View style={styles.routeDetails}>
          <Text style={styles.routeText}>{item.pickup}</Text>
          <Text style={styles.routeText}>{item.destination}</Text>
        </View>
      </View>
      
      <View style={styles.rideDetails}>
        <View style={styles.detailItem}>
          <DollarSign size={16} color="#000" />
          <Text style={styles.detailText}>${item.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.driverName}>{item.driver}</Text>
          {renderRatingStars(item.rating)}
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Get Receipt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]}>
          <Text style={styles.actionButtonTextOutline}>Help</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ride History</Text>
      </View>
      
      <FlatList
        data={RIDE_HISTORY}
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  ridesList: {
    padding: 20,
    paddingTop: 10,
  },
  rideCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    color: '#34A853',
    fontWeight: 'bold',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  routeIcons: {
    width: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  originDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34A853',
    marginTop: 5,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EA4335',
    marginBottom: 5,
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 60,
  },
  routeText: {
    fontSize: 16,
    color: '#000',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverName: {
    fontSize: 14,
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtonTextOutline: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});