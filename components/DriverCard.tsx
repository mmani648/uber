import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, DollarSign, Clock, Car } from 'lucide-react-native';

type DriverProps = {
  id: string;
  name: string;
  rating: number;
  price: number;
  eta: string;
  car: string;
  distance: string;
  onAccept: (id: string) => void;
};

export default function DriverCard({ 
  id, 
  name, 
  rating, 
  price, 
  eta, 
  car, 
  distance,
  onAccept 
}: DriverProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }}
            style={styles.driverImage}
          />
          <View>
            <Text style={styles.driverName}>{name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  color={i < Math.floor(rating) ? '#FFD700' : '#ddd'} 
                  fill={i < Math.floor(rating) ? '#FFD700' : 'none'}
                />
              ))}
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.priceText}>${price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.detailText}>{eta}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Car size={16} color="#666" />
          <Text style={styles.detailText}>{car}</Text>
        </View>
        
        <Text style={styles.distanceText}>{distance}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.acceptButton}
        onPress={() => onAccept(id)}
      >
        <Text style={styles.acceptButtonText}>Accept Bid</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
  },
});