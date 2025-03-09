import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Clock, MapPin, Car, Battery } from 'lucide-react-native';

export default function ShiftScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [shiftStarted, setShiftStarted] = useState(null);

  const handleShiftToggle = () => {
    if (!isOnline) {
      setShiftStarted(new Date());
    } else {
      setShiftStarted(null);
    }
    setIsOnline(!isOnline);
  };

  const getShiftDuration = () => {
    if (!shiftStarted) return '0h 0m';
    const diff = new Date().getTime() - shiftStarted.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Shift</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Current Status</Text>
          <Switch
            value={isOnline}
            onValueChange={handleShiftToggle}
            trackColor={{ false: '#ccc', true: '#34A853' }}
            thumbColor="#fff"
          />
        </View>

        <Text style={[styles.statusText, { color: isOnline ? '#34A853' : '#666' }]}>
          {isOnline ? 'Online - Accepting Rides' : 'Offline'}
        </Text>
      </View>

      {isOnline && (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Clock size={24} color="#4285F4" />
              <Text style={styles.statValue}>{getShiftDuration()}</Text>
              <Text style={styles.statLabel}>Shift Duration</Text>
            </View>

            <View style={styles.statCard}>
              <MapPin size={24} color="#EA4335" />
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Rides Completed</Text>
            </View>

            <View style={styles.statCard}>
              <Car size={24} color="#34A853" />
              <Text style={styles.statValue}>$125.50</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Battery size={20} color="#666" />
              <Text style={styles.infoTitle}>Shift Information</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Start Time</Text>
              <Text style={styles.infoValue}>
                {shiftStarted?.toLocaleTimeString()}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Maximum Duration</Text>
              <Text style={styles.infoValue}>12 hours</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Break Time Available</Text>
              <Text style={styles.infoValue}>45 minutes</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.endShiftButton}
            onPress={handleShiftToggle}
          >
            <Text style={styles.endShiftText}>End Shift</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  statusCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  endShiftButton: {
    margin: 20,
    backgroundColor: '#EA4335',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  endShiftText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});