// screens/SensorsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const colors = {
  primary: '#0A7764',
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#5A5A5A',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  temperature: '#D78909',
  humidity: '#2E86C1',
  pressure: '#DCA901',
  wind: '#0A7764',
  rain: '#5DADE2',
  light: '#F39C12',
  error: '#E74C3C',
  success: '#2ECC71',
};

const SensorsScreen = () => {
  const navigation = useNavigation();

  const sensors = [
    {
      id: 1,
      name: 'Sensor de Temperatura',
      model: 'DHT22',
      icon: 'device-thermostat',
      color: colors.temperature,
      parameters: 'Temperatura (-40°C a 80°C)',
      accuracy: '±0.5°C',
      status: 'Activo',
      lastReading: '25.4°C',
      lastUpdate: 'Hace 2 minutos',
      voltage: '3.3V',
    },
    {
      id: 2,
      name: 'Sensor de Humedad',
      model: 'DHT22',
      icon: 'water-drop',
      color: colors.humidity,
      parameters: 'Humedad relativa (0% a 100%)',
      accuracy: '±2%',
      status: 'Activo',
      lastReading: '65%',
      lastUpdate: 'Hace 2 minutos',
      voltage: '3.3V',
    },
    {
      id: 3,
      name: 'Sensor de Presión Atmosférica',
      model: 'BMP280',
      icon: 'speed',
      color: colors.pressure,
      parameters: 'Presión (300hPa a 1100hPa)',
      accuracy: '±1 hPa',
      status: 'Activo',
      lastReading: '1013.25 hPa',
      lastUpdate: 'Hace 3 minutos',
      voltage: '3.3V',
    },
    {
      id: 4,
      name: 'Sensor de Velocidad del Viento',
      model: 'Anemómetro',
      icon: 'air',
      color: colors.wind,
      parameters: 'Velocidad (0 a 50 m/s)',
      accuracy: '±0.5 m/s',
      status: 'Activo',
      lastReading: '12 km/h',
      lastUpdate: 'Hace 1 minuto',
      voltage: '5V',
    },
    {
      id: 5,
      name: 'Sensor de Lluvia',
      model: 'Pluviómetro',
      icon: 'grain',
      color: colors.rain,
      parameters: 'Precipitación (0 a 200 mm/h)',
      accuracy: '±1 mm',
      status: 'Activo',
      lastReading: '0 mm',
      lastUpdate: 'Hace 5 minutos',
      voltage: '5V',
    },
    {
      id: 6,
      name: 'Sensor de Radiación Solar',
      model: 'BH1750',
      icon: 'wb-sunny',
      color: colors.light,
      parameters: 'Intensidad lumínica (1-65535 lux)',
      accuracy: '±20%',
      status: 'Inactivo',
      lastReading: 'N/A',
      lastUpdate: 'Hace 1 hora',
      voltage: '3.3V',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}> Sensores IoT</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumen del Sistema</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Icon name="sensors" size={24} color={colors.primary} />
              <Text style={styles.summaryNumber}>{sensors.length}</Text>
              <Text style={styles.summaryLabel}>Sensores</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="check-circle" size={24} color={colors.success} />
              <Text style={[styles.summaryNumber, { color: colors.success }]}>
                {sensors.filter(s => s.status === 'Activo').length}
              </Text>
              <Text style={styles.summaryLabel}>Activos</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="error" size={24} color={colors.error} />
              <Text style={[styles.summaryNumber, { color: colors.error }]}>
                {sensors.filter(s => s.status !== 'Activo').length}
              </Text>
              <Text style={styles.summaryLabel}>Inactivos</Text>
            </View>
          </View>
        </View>

        {sensors.map((sensor) => (
          <View 
            key={sensor.id} 
            style={[
              styles.card, 
              { 
                borderLeftColor: sensor.color, 
                borderLeftWidth: 4,
                backgroundColor: sensor.status === 'Activo' ? colors.cardBackground : '#F5F5F5',
              }
            ]}
          >
            <View style={styles.sensorHeader}>
              <Icon name={sensor.icon} size={28} color={sensor.color} />
              <View style={styles.sensorTitleContainer}>
                <Text style={[styles.sensorName, { color: sensor.color }]}>{sensor.name}</Text>
                <Text style={styles.sensorModel}>{sensor.model}</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { 
                  backgroundColor: sensor.status === 'Activo' ? colors.success : colors.error,
                }
              ]}>
                <Text style={styles.statusText}>{sensor.status}</Text>
              </View>
            </View>
            
            <View style={styles.sensorDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parámetros:</Text>
                <Text style={styles.detailValue}>{sensor.parameters}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Precisión:</Text>
                <Text style={styles.detailValue}>{sensor.accuracy}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Voltaje:</Text>
                <Text style={styles.detailValue}>{sensor.voltage}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Última lectura:</Text>
                <Text style={[styles.detailValue, { fontWeight: 'bold', color: sensor.color }]}>
                  {sensor.lastReading}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Actualizado:</Text>
                <Text style={styles.detailValue}>{sensor.lastUpdate}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.primary,
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMedium,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sensorTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sensorModel: {
    fontSize: 14,
    color: colors.textMedium,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sensorDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textMedium,
    width: 110,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
});

export default SensorsScreen;