import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, StatusBar } from 'react-native';
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
  inactiveBg: '#F5F5F5',
};

const SensorsScreen = () => {
  const navigation = useNavigation();
  const [sensors, setSensors] = useState([
    {
      id: 1,
      name: 'Sensor de Temperatura',
      model: 'DHT22',
      icon: 'device-thermostat',
      color: colors.temperature,
      parameters: 'Temperatura (-40°C a 80°C)',
      accuracy: '±0.5°C',
      active: true,
      lastReading: '25.4°C',
      lastUpdate: 'Hace 2 minutos',
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
      active: true,
      lastReading: '12 km/h',
      lastUpdate: 'Hace 1 minuto',
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
      active: false,
      lastReading: 'N/A',
      lastUpdate: 'Hace 1 hora',
      voltage: '3.3V',
    },
  ]);

  const toggleSensor = (id: number) => {
    setSensors(sensors.map(sensor => 
      sensor.id === id ? { ...sensor, active: !sensor.active } : sensor
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Barra de navegación estática */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Sensores IoT</Text>
      </View>

      {/* Contenido desplazable */}
      <ScrollView style={styles.scrollContainer}>
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
                  {sensors.filter(s => s.active).length}
                </Text>
                <Text style={styles.summaryLabel}>Activos</Text>
              </View>
              <View style={styles.summaryItem}>
                <Icon name="error" size={24} color={colors.error} />
                <Text style={[styles.summaryNumber, { color: colors.error }]}>
                  {sensors.filter(s => !s.active).length}
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
                  backgroundColor: sensor.active ? colors.cardBackground : colors.inactiveBg,
                }
              ]}
            >
              <View style={styles.sensorHeader}>
                <Icon name={sensor.icon} size={28} color={sensor.color} />
                <View style={styles.sensorTitleContainer}>
                  <Text style={[styles.sensorName, { color: sensor.color }]}>{sensor.name}</Text>
                  <Text style={styles.sensorModel}>{sensor.model}</Text>
                </View>
                <Switch
                  value={sensor.active}
                  onValueChange={() => toggleSensor(sensor.id)}
                  trackColor={{ false: '#767577', true: colors.success }}
                  thumbColor={colors.white}
                />
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
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Estado:</Text>
                  <View style={[
                    styles.statusBadge, 
                    { 
                      backgroundColor: sensor.active ? colors.success : colors.error,
                    }
                  ]}>
                    <Text style={styles.statusText}>
                      {sensor.active ? 'Activo' : 'Inactivo'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    backgroundColor: colors.primary,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    paddingBottom: 30,
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
    alignSelf: 'flex-start',
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
    alignItems: 'center',
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