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
  primary: '#DCA901',
  primaryDark: '#B38A00',
  secondary: '#0A7764',
  secondaryLight: '#DCA901',
  accent: '#FFD700',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textDark: '#333333',
  textLight: '#FFFFFF',
};

const PressureScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const generatePressureData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        datasets: [
          {
            data: [1013, 1014, 1015, 1013, 1012, 1011, 1010, 1012, 1014],
            color: (opacity = 1) => `rgba(220, 169, 1, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            data: [1013, 1012, 1014, 1015, 1013, 1012, 1014],
            color: (opacity = 1) => `rgba(220, 169, 1, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 1010),
            color: (opacity = 1) => `rgba(220, 169, 1, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            data: [1015, 1014, 1013, 1012, 1011, 1010, 1011, 1012, 1013, 1014, 1015, 1016],
            color: (opacity = 1) => `rgba(220, 169, 1, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    }
  };

  const pressureData = generatePressureData();

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(220, 169, 1, ${opacity})`,
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

  const getCurrentPressure = () => {
    const now = new Date().getHours();
    const index = Math.floor(now / 3);
    return pressureData.datasets[0].data[Math.min(index, pressureData.datasets[0].data.length - 1)];
  };

  const getPressureTrend = () => {
    const current = getCurrentPressure();
    const previous = pressureData.datasets[0].data[0];
    if (current > previous) return 'Subiendo';
    if (current < previous) return 'Bajando';
    return 'Estable';
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
        <Text style={styles.title}>Presión Atmosférica</Text>
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
        <Text style={styles.currentValue}>{getCurrentPressure().toFixed(1)}</Text>
        <Text style={styles.currentDescription}>hPa - {getPressureTrend()}</Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={pressureData}
          width={screenWidth - 40}
          height={280}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix=" hPa"
          yAxisInterval={timeRange === 'day' ? 1 : 5}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1013.2</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1015.8</Text>
              <Text style={styles.statLabel}>Máxima</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1010.3</Text>
              <Text style={styles.statLabel}>Mínima</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Interpretación de la Presión</Text>
        <Text style={styles.infoText}>
          • Presión alta ({'>'}1015 hPa): Indica tiempo estable y soleado
          {'\n'}• Presión normal (1010-1015 hPa): Condiciones variables
          {'\n'}• Presión baja ({'<'}1010 hPa): Puede indicar mal tiempo o lluvia
        </Text>
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
    backgroundColor: 'rgba(220, 169, 1, 0.1)',
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
    backgroundColor: 'rgba(220, 169, 1, 0.1)',
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
  infoContainer: {
    padding: 20,
    backgroundColor: 'rgba(220, 169, 1, 0.1)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 24,
  },
});

export default PressureScreen;