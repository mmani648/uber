import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DollarSign, TrendingUp, Clock, Calendar } from 'lucide-react-native';

const EARNINGS_DATA = {
  today: 185.50,
  week: 925.75,
  month: 3750.25,
  earnings: [
    { id: '1', amount: 25.50, date: 'Today 2:30 PM', type: 'Ride' },
    { id: '2', amount: 32.75, date: 'Today 1:15 PM', type: 'Ride' },
    { id: '3', amount: 18.50, date: 'Today 11:45 AM', type: 'Ride' },
    { id: '4', amount: 27.25, date: 'Today 10:30 AM', type: 'Ride' },
    { id: '5', amount: 22.00, date: 'Today 9:15 AM', type: 'Ride' },
  ]
};

export default function EarningsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <DollarSign size={20} color="#34A853" />
            <Text style={styles.summaryTitle}>Today</Text>
          </View>
          <Text style={styles.summaryAmount}>${EARNINGS_DATA.today.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.halfCard]}>
            <View style={styles.summaryHeader}>
              <TrendingUp size={20} color="#4285F4" />
              <Text style={styles.summaryTitle}>This Week</Text>
            </View>
            <Text style={styles.summaryAmount}>${EARNINGS_DATA.week.toFixed(2)}</Text>
          </View>

          <View style={[styles.summaryCard, styles.halfCard]}>
            <View style={styles.summaryHeader}>
              <Calendar size={20} color="#EA4335" />
              <Text style={styles.summaryTitle}>This Month</Text>
            </View>
            <Text style={styles.summaryAmount}>${EARNINGS_DATA.month.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.earningsContainer}>
        <Text style={styles.sectionTitle}>Recent Earnings</Text>
        {EARNINGS_DATA.earnings.map((earning) => (
          <View key={earning.id} style={styles.earningItem}>
            <View style={styles.earningInfo}>
              <Text style={styles.earningType}>{earning.type}</Text>
              <Text style={styles.earningDate}>{earning.date}</Text>
            </View>
            <Text style={styles.earningAmount}>${earning.amount.toFixed(2)}</Text>
          </View>
        ))}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  summaryContainer: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfCard: {
    flex: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  earningsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  earningInfo: {
    flex: 1,
  },
  earningType: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  earningDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  earningAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});