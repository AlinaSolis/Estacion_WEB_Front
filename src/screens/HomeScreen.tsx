import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const { width: screenWidth } = Dimensions.get('window');

// Definición de colores mejorados
const colors = {
  temperature: '#D78909', // Naranja
  pressure: '#DCA901',    // Amarillo
  wind: '#0A7764',        // Verde
  precipitation: '#DCA901', // Amarillo
  sun: '#D78909',         // Naranja
  primary: '#0A7764',     // Verde principal
  primaryLight: '#0F9B87', // Verde más claro
  white: '#FFFFFF',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#FFFFFF',
  background: '#F8F9FA',   // Gris más suave
  cardBackground: '#FDFDFD', // Blanco ligeramente off-white
  shadow: '#E5E5E5',       // Sombra suave
  accent: '#F0F4F3',       // Verde muy claro para acentos
};

type RootStackParamList = {
  Temperature: undefined;
  Pressure: undefined;
  Wind: undefined;
  Precipitation: undefined;
  Sun: undefined;
  About: undefined;
  Sensors: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const generateTemperatureData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        datasets: [
          {
            data: [18, 16, 15, 19, 28, 30, 25, 22, 20],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            data: [22, 24, 25, 28, 26, 23, 21],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else {
      return {
        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}/2023`),
        datasets: [
          {
            data: [18, 19, 22, 25, 28, 30, 29, 28, 26, 24, 20, 18],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    }
  };

  const temperatureData = generateTemperatureData();

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 10,
      fill: colors.textMedium
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.temperature
    }
  };

  return (
    <ScrollView style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header con gradiente sutil */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={22} color={colors.white} />
            <Text style={styles.locationText}>Universidad Tecnológica de Durango</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.dateButton}
          >
            <Icon name="calendar-today" size={18} color={colors.white} />
            <Text style={styles.dateText}>
              {moment(date).format('dddd, D [de] MMMM [de] YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          themeVariant="light"
          textColor={colors.primary}
        />
      )}

      {/* Selector de tiempo con mejor diseño */}
      <View style={styles.timeRangeContainer}>
        <View style={styles.timeRangeSelector}>
          <TouchableOpacity
            style={[styles.timeRangeButton, timeRange === 'day' && styles.activeTimeRange]}
            onPress={() => setTimeRange('day')}
          >
            <Text style={[styles.timeRangeText, timeRange === 'day' && styles.activeTimeRangeText]}>Día</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeRangeButton, timeRange === 'week' && styles.activeTimeRange]}
            onPress={() => setTimeRange('week')}
          >
            <Text style={[styles.timeRangeText, timeRange === 'week' && styles.activeTimeRangeText]}>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeRangeButton, timeRange === 'month' && styles.activeTimeRange]}
            onPress={() => setTimeRange('month')}
          >
            <Text style={[styles.timeRangeText, timeRange === 'month' && styles.activeTimeRangeText]}>Mes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Clima actual con fondo mejorado */}
      <View style={styles.currentWeatherContainer}>
        <View style={styles.currentWeatherCard}>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.weatherIcon}>☀️</Text>
          </View>
          <Text style={styles.currentTemp}>28°C</Text>
          <Text style={styles.feelsLike}>Sensación térmica: 30°C</Text>
          <Text style={styles.weatherDescription}>Mayormente soleado</Text>
        </View>
      </View>

      {/* Gráfico con mejor presentación */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Temperatura del {timeRange === 'day' ? 'día' : timeRange === 'week' ? 'semana' : 'mes'}</Text>
        </View>
        <LineChart
          data={temperatureData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix="°C"
        />
      </View>

      {/* Resumen con mejor diseño */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="assessment" size={20} color={colors.primary} />
            <Text style={styles.summaryTitle}>Resumen del día</Text>
          </View>
          <View style={styles.summaryGrid}>
            <View style={[styles.summaryItem, { backgroundColor: 'rgba(215, 137, 9, 0.08)' }]}>
              <Icon name="keyboard-arrow-up" size={20} color={colors.temperature} />
              <Text style={[styles.summaryValue, { color: colors.temperature }]}>31°C</Text>
              <Text style={styles.summaryLabel}>Máxima</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: 'rgba(215, 137, 9, 0.08)' }]}>
              <Icon name="keyboard-arrow-down" size={20} color={colors.temperature} />
              <Text style={[styles.summaryValue, { color: colors.temperature }]}>18°C</Text>
              <Text style={styles.summaryLabel}>Mínima</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: 'rgba(10, 119, 100, 0.08)' }]}>
              <Icon name="water-drop" size={18} color={colors.wind} />
              <Text style={[styles.summaryValue, { color: colors.wind }]}>65%</Text>
              <Text style={styles.summaryLabel}>Humedad</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: 'rgba(10, 119, 100, 0.08)' }]}>
              <Icon name="air" size={18} color={colors.wind} />
              <Text style={[styles.summaryValue, { color: colors.wind }]}>15</Text>
              <Text style={styles.summaryLabel}>km/h NO</Text>
            </View>
          </View>
          <View style={[styles.rainProbability, { backgroundColor: 'rgba(220, 169, 1, 0.08)' }]}>
            <Icon name="grain" size={18} color={colors.precipitation} />
            <Text style={[styles.summaryValue, { color: colors.precipitation }]}>20%</Text>
            <Text style={styles.summaryLabel}>Probabilidad de lluvia</Text>
          </View>
        </View>
      </View>

      {/* Información de estación mejorada */}
      <View style={styles.stationContainer}>
        <View style={styles.stationCard}>
          <View style={styles.stationHeader}>
            <Icon name="sensors" size={20} color={colors.primary} />
            <Text style={[styles.stationTitle, { color: colors.primary }]}>Estación Meteorológica</Text>
          </View>
          <View style={styles.stationGrid}>
            <View style={styles.stationRow}>
              <Icon name="place" size={16} color={colors.textMedium} />
              <Text style={styles.stationLabel}>Ubicación:</Text>
              <Text style={styles.stationValue}>UTD Campus</Text>
            </View>
            <View style={styles.stationRow}>
              <Icon name="qr-code" size={16} color={colors.textMedium} />
              <Text style={styles.stationLabel}>Código:</Text>
              <Text style={styles.stationValue}>UTD-WS001</Text>
            </View>
            <View style={styles.stationRow}>
              <Icon name="my-location" size={16} color={colors.textMedium} />
              <Text style={styles.stationLabel}>Coordenadas:</Text>
              <Text style={styles.stationValue}>24.027°N, 104.658°O</Text>
            </View>
            <View style={styles.stationRow}>
              <Icon name="terrain" size={16} color={colors.textMedium} />
              <Text style={styles.stationLabel}>Altitud:</Text>
              <Text style={styles.stationValue}>1890 m</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Navegación con gradientes */}
      <View style={styles.navigationContainer}>
        <Text style={styles.navigationTitle}>Explorar datos</Text>
        <View style={styles.navigationGrid}>
          <TouchableOpacity
            style={[styles.navButton, styles.temperatureButton]}
            onPress={() => navigation.navigate('Temperature')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="device-thermostat" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Temperatura</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.pressureButton]}
            onPress={() => navigation.navigate('Pressure')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="speed" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Presión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.windButton]}
            onPress={() => navigation.navigate('Wind')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="air" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Viento</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.precipitationButton]}
            onPress={() => navigation.navigate('Precipitation')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="water-drop" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Lluvia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.sunButton]}
            onPress={() => navigation.navigate('Sun')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="wb-sunny" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Sol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.aboutButton]}
            onPress={() => navigation.navigate('About')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="info" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Acerca de</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.sensorsButton]}
            onPress={() => navigation.navigate('Sensors')}
          >
            <View style={styles.navButtonIconContainer}>
              <Icon name="sensors" size={28} color={colors.white} />
            </View>
            <Text style={styles.navButtonText}>Sensores</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.primaryLight}15`,
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 16,
    zIndex: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
    textAlign: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 25,
    padding: 4,
  },
  timeRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  activeTimeRange: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  timeRangeText: {
    color: colors.textMedium,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTimeRangeText: {
    color: colors.white,
    fontWeight: '600',
  },
  currentWeatherContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentWeatherCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  weatherIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  weatherIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  currentTemp: {
    fontSize: 64,
    fontWeight: '200',
    color: colors.temperature,
    marginBottom: 8,
  },
  feelsLike: {
    color: colors.textMedium,
    fontSize: 16,
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: '500',
  },
  chartContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  chartHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  summaryLabel: {
    color: colors.textMedium,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  rainProbability: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  stationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stationCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  stationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stationTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 8,
  },
  stationGrid: {
    gap: 12,
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  stationLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMedium,
    marginLeft: 8,
    flex: 1,
  },
  stationValue: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
  navigationContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  navigationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 20,
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  navButtonIconContainer: {
    marginBottom: 8,
    backgroundColor: 'transparent', 
    padding: 0,                     
    borderRadius: 0,               
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  temperatureButton: {
    backgroundColor: colors.temperature,
  },
  pressureButton: {
    backgroundColor: colors.pressure,
  },
  windButton: {
    backgroundColor: colors.wind,
  },
  precipitationButton: {
    backgroundColor: colors.precipitation,
  },
  sunButton: {
    backgroundColor: colors.sun,
  },
  aboutButton: {
    backgroundColor: colors.primary,
  },
  sensorsButton: {
    backgroundColor: colors.primaryLight,
  },
});

export default HomeScreen;