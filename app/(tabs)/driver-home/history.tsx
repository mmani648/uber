import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MapPin, Clock, DollarSign } from 'lucide-react-native';

const HISTORY_DATA = {
  rides: [
    {
      id: '1',
      date: 'Today 2:30 PM',
      pickup: '123 Main St',
      destination: '456 Market St',
      amount: 25.50,
      passenger: 'John D.',
      status: 'completed'
    },
    {
      id: '2',
      date: 'Today 1:15 PM',
      pickup: '789 Park Ave',
      destination: '321 Mission St',
      amount: 32.75,
      passenger: 'Sarah M.',
      status: 'completed'
    }
  ],
  bids: [
    {
      id: '1',
      date: 'Today 3:00 PM',
      pickup: '555 Howard St',
      destination: 'Ferry Building',
      bidAmount: 22.50,
      userBid: 25.00,
      status: 'pending'
    },
    {
      id: '2',
      date: 'Today 2:45 PM',
      pickup: '100 Van Ness',
      destination: 'Fisherman\'s Wharf',
      bidAmount: 28.75,
      userBid: 30.00,
      status: 'accepted'
    }
  ]
};

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState('rides');

  const renderRideItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? '#E6F7ED' : '#FEE8E6' }]}>
          <Text style={[styles.statusText, { color: item.status === 'completed' ? '#34A853' : '#EA4335' }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <MapPin size={16} color="#34A853" />
          <Text style={styles.routeText}>{item.pickup}</Text>
        </View>
        <View style={styles.routePoint}>
          <MapPin size={16} color="#EA4335" />
          <Text style={styles.routeText}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.passengerText}>{item.passenger}</Text>
        <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderBidItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'accepted' ? '#E6F7ED' : '#FFF3E0' }]}>
          <Text style={[styles.statusText, { color: item.status === 'accepted' ? '#34A853' : '#FB8C00' }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <MapPin size={16} color="#34A853" />
          <Text style={styles.routeText}>{item.pickup}</Text>
        </View>
        <View style={styles.routePoint}>
          <MapPin size={16} color="#EA4335" />
          <Text style={styles.routeText}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.bidDetails}>
        <View style={styles.bidAmount}>
          <Text style={styles.bidLabel}>Your Bid</Text>
          <Text style={styles.bidValue}>${item.bidAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.bidAmount}>
          <Text style={styles.bidLabel}>User's Bid</Text>
          <Text style={styles.bidValue}>${item.userBid.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'rides' && styles.activeTab]}
          onPress={() => setActiveTab('rides')}
        >
          <Text style={[styles.tabText, activeTab === 'rides' && styles.activeTabText]}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bids' && styles.activeTab]}
          onPress={() => setActiveTab('bids')}
        >
          <Text style={[styles.tabText, activeTab === 'bids' && styles.activeTabText]}>Bids</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'rides' ? HISTORY_DATA.rides : HISTORY_DATA.bids}
        renderItem={activeTab === 'rides' ? renderRideItem : renderBidItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    padding: 20,
  },
  historyCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
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
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  amountText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bidDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bidAmount: {
    alignItems: 'center',
  },
  bidLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  bidValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});