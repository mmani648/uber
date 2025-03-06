import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapPin, Navigation } from 'lucide-react-native';

type LiveMapProps = {
  pickup?: string;
  destination?: string;
  pickupCoords?: { latitude: number; longitude: number };
  destinationCoords?: { latitude: number; longitude: number };
  height?: number;
  showUserLocation?: boolean;
  onLocationChange?: (location: { latitude: number; longitude: number }) => void;
};

export default function LiveMap({
  pickup,
  destination,
  pickupCoords,
  destinationCoords,
  height = 200,
  showUserLocation = true,
  onLocationChange,
}: LiveMapProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<MapView | null>(null);

  // Default coordinates (San Francisco)
  const defaultCoords = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Use provided coordinates or default
  const startCoords = pickupCoords || (location?.coords ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  } : null);

  const endCoords = destinationCoords || null;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsLoading(false);
          return;
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation(currentLocation);
        
        if (onLocationChange) {
          onLocationChange({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
        }

        // Fit map to markers if both pickup and destination are provided
        if (mapRef.current && startCoords && endCoords) {
          mapRef.current.fitToCoordinates(
            [startCoords, endCoords],
            {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            }
          );
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Could not get your location');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pickupCoords, destinationCoords]);

  // Watch position for real-time updates
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    (async () => {
      if (showUserLocation) {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation);
            
            if (onLocationChange) {
              onLocationChange({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              });
            }
          }
        );
      }
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [showUserLocation]);

  if (errorMsg) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { height, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={startCoords ? {
          latitude: startCoords.latitude,
          longitude: startCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : defaultCoords}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
      >
        {startCoords && (
          <Marker
            coordinate={{
              latitude: startCoords.latitude,
              longitude: startCoords.longitude,
            }}
            title={pickup || "Pickup Location"}
          >
            <View style={styles.markerContainer}>
              <MapPin size={24} color="#34A853" />
            </View>
          </Marker>
        )}

        {endCoords && (
          <Marker
            coordinate={{
              latitude: endCoords.latitude,
              longitude: endCoords.longitude,
            }}
            title={destination || "Destination"}
          >
            <View style={styles.markerContainer}>
              <MapPin size={24} color="#EA4335" />
            </View>
          </Marker>
        )}

        {startCoords && endCoords && (
          <Polyline
            coordinates={[
              { latitude: startCoords.latitude, longitude: startCoords.longitude },
              { latitude: endCoords.latitude, longitude: endCoords.longitude },
            ]}
            strokeColor="#4285F4"
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.mapOverlay}>
        <Navigation size={24} color="#000" />
      </View>

      {(pickup || destination) && (
        <View style={styles.locationInfo}>
          {pickup && (
            <View style={styles.locationItem}>
              <MapPin size={16} color="#34A853" />
              <Text style={styles.locationText}>{pickup}</Text>
            </View>
          )}
          {destination && (
            <View style={styles.locationItem}>
              <MapPin size={16} color="#EA4335" />
              <Text style={styles.locationText}>{destination}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: '#EA4335',
    fontFamily: 'Inter-Medium',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
});