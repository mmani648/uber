import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { MapPin } from 'lucide-react-native';

type RideMapProps = {
  pickup: string;
  destination: string;
  height?: number;
};

export default function RideMap({ pickup, destination, height = 200 }: RideMapProps) {
  return (
    <View style={[styles.container, { height }]}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
        style={styles.mapImage}
      />
      
      <View style={styles.pickupMarker}>
        <MapPin size={24} color="#34A853" />
        <View style={styles.markerLabel}>
          <Text style={styles.markerText}>Pickup</Text>
        </View>
      </View>
      
      <View style={styles.destinationMarker}>
        <MapPin size={24} color="#EA4335" />
        <View style={styles.markerLabel}>
          <Text style={styles.markerText}>Destination</Text>
        </View>
      </View>
      
      <View style={styles.routeLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pickupMarker: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    alignItems: 'center',
  },
  destinationMarker: {
    position: 'absolute',
    bottom: '30%',
    right: '25%',
    alignItems: 'center',
  },
  markerLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  routeLine: {
    position: 'absolute',
    top: '35%',
    left: '28%',
    right: '28%',
    height: 3,
    backgroundColor: '#4285F4',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
    transformOrigin: 'center',
  },
});