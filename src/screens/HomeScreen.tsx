import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const { width: screenWidth } = Dimensions.get('window');
//Listoooooo
// Paleta de colores
const colors = {
  primary: '#0A7764',
  primaryLight: '#0F9B87',
  secondary: '#D78909',
  white: '#FFFFFF',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  shadow: '#E3E3E3',
  accent: '#F0F4F3',
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    // Datos simulados
    setWeatherData({
      temperature: 28,
      minTemperature: 18,
      windSpeed: 15,
      windDirection: 'NO',
      lastUpdated: new Date()
    });
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const generateTemperatureData = () => {
    return {
      labels: timeRange === 'day' ? ['', '', '', '', ''] : 
              timeRange === 'week' ? ['', '', '', '', '', '', ''] : 
              ['', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [{
        data: timeRange === 'day' ? [18, 15, 28, 25, 20] : 
              timeRange === 'week' ? [22, 24, 25, 28, 26, 23, 21] : 
              [18, 19, 22, 25, 28, 30, 29, 28, 26, 24, 20, 18],
        color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
        strokeWidth: 3
      }]
    };
  };

  const temperatureData = generateTemperatureData();

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 0, // Ocultar labels
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.secondary
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Barra de navegación fija */}
      <View style={styles.fixedHeader}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Icon name="school" size={24} color={colors.white} />
          <Text style={styles.universityText}>Universidad Tecnológica de Durango</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSpacer} />

        {/* Sección de información */}
        <View style={styles.infoSection}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={20} color={colors.primary} />
            <Text style={styles.locationText}>Estación Meteorológica UTD</Text>
          </View>
          
          
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}



        {/* Información de la estación - Reorganizada */}
        <View style={styles.stationContainer}>
          <View style={styles.stationCard}>
            <Text style={styles.sectionTitle}>Detalles de la Estación</Text>
            
            <View style={styles.stationDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Icon name="place" size={20} color={colors.primary} />
                  <Text style={styles.detailLabel}>Ubicación</Text>
                  <Text style={styles.detailValue}>UTD Campus</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Icon name="qr-code" size={20} color={colors.primary} />
                  <Text style={styles.detailLabel}>Código</Text>
                  <Text style={styles.detailValue}>UTD-WS001</Text>
                </View>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Icon name="my-location" size={20} color={colors.primary} />
                  <Text style={styles.detailLabel}>Coordenadas</Text>
                  <Text style={styles.detailValue}>24.027°N, 104.658°O</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Icon name="terrain" size={20} color={colors.primary} />
                  <Text style={styles.detailLabel}>Altitud</Text>
                  <Text style={styles.detailValue}>1890 m</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 15,
    backgroundColor: colors.primary,
    zIndex: 100,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  menuButton: {
    marginRight: 16
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  universityText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 10
  },
  headerSpacer: {
    height: 90
  },
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 30
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(10, 119, 100, 0.2)'
  },
  dateText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 12
  },
  lastUpdated: {
    color: colors.textMedium,
    fontSize: 12,
    fontStyle: 'italic'
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 20
  },
  chartContainer: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.shadow,
    alignItems: 'center'
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 15,
    textAlign: 'center'
  },
  chartInner: {
    width: '100%',
    alignItems: 'center'
  },
  chart: {
    borderRadius: 12
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 4,
    marginTop: 15
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16
  },
  activeTimeRange: {
    backgroundColor: colors.primary
  },
  timeRangeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMedium
  },
  activeTimeRangeText: {
    color: colors.white,
    fontWeight: '600'
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.shadow
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center'
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  dataCard: {
    width: '30%',
    minWidth: 100,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  temperatureCard: {
    backgroundColor: 'rgba(215, 137, 9, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(215, 137, 9, 0.2)'
  },
  windCard: {
    backgroundColor: 'rgba(10, 119, 100, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(10, 119, 100, 0.2)'
  },
  dataValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 6,
    color: colors.textDark
  },
  dataLabel: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center'
  },
  stationContainer: {
    paddingHorizontal: 20
  },
  stationCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.shadow
  },
  stationDetails: {
    marginTop: 10
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  detailItem: {
    width: '48%',
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center'
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMedium,
    marginTop: 8,
    marginBottom: 4
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center'
  }
});

export default HomeScreen;