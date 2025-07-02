import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#D78909',
  primaryDark: '#A56A07',
  secondary: '#0A7764',
  secondaryLight: '#DCA901',
  accent: '#FFA500',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textDark: '#333333',
  textLight: '#FFFFFF',
};

const TemperatureScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const generateTemperatureData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        datasets: [
          {
            data: [18, 17, 16, 19, 25, 27, 22, 20, 19],
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
            data: [18, 19, 20, 22, 25, 24, 21],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 18),
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 10,
      fill: colors.textDark
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary
    }
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getCurrentTemperature = () => {
    const now = new Date().getHours();
    const index = Math.floor(now / 3);
    return temperatureData.datasets[0].data[Math.min(index, temperatureData.datasets[0].data.length - 1)];
  };

  const getTemperatureDescription = (temp: number) => {
    if (temp < 10) return 'Muy frío';
    if (temp < 18) return 'Frío';
    if (temp < 24) return 'Templado';
    if (temp < 30) return 'Cálido';
    return 'Muy caliente';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Temperatura</Text>
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)} 
          style={styles.dateButton}
        >
          <Icon name="calendar-today" size={20} color={colors.white} />
          <Text style={styles.dateText}>
            {moment(date).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={[styles.timeRangeButton, timeRange === 'year' && styles.activeTimeRange]}
          onPress={() => setTimeRange('year')}
        >
          <Text style={[styles.timeRangeText, timeRange === 'year' && styles.activeTimeRangeText]}>Año</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.currentValueContainer}>
        <Text style={styles.currentValue}>{getCurrentTemperature().toFixed(1)}°C</Text>
        <Text style={styles.currentDescription}>
          {getTemperatureDescription(getCurrentTemperature())}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={temperatureData}
          width={screenWidth - 40}
          height={280}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix="°C"
          yAxisInterval={timeRange === 'day' ? 1 : 5}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>21.8°C</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>27.5°C</Text>
              <Text style={styles.statLabel}>Máxima</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>16.2°C</Text>
              <Text style={styles.statLabel}>Mínima</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial de Temperatura</Text>
        <View style={styles.historyItem}>
          <Text style={styles.historyDate}>Ayer</Text>
          <Text style={styles.historyValue}>24.1°C</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyDate}>Hace 2 días</Text>
          <Text style={styles.historyValue}>23.7°C</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyDate}>Hace 1 semana</Text>
          <Text style={styles.historyValue}>22.5°C</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyDate}>Hace 1 mes</Text>
          <Text style={styles.historyValue}>20.8°C</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLight,
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 14,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
  },
  activeTimeRange: {
    backgroundColor: colors.primary,
  },
  timeRangeText: {
    color: colors.textDark,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTimeRangeText: {
    color: colors.white,
    fontWeight: '600',
  },
  currentValueContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  currentValue: {
    fontSize: 56,
    fontWeight: '300',
    color: colors.primary,
  },
  currentDescription: {
    fontSize: 16,
    color: colors.textDark,
  },
  chartContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: colors.white,
  },
  chart: {
    borderRadius: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginTop: 8,
  },
  historyContainer: {
    padding: 20,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(215, 137, 9, 0.2)',
  },
  historyDate: {
    fontSize: 16,
    color: colors.textDark,
  },
  historyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default TemperatureScreen;