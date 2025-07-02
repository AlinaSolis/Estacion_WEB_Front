import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
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

const PrecipitationScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const generatePrecipitationData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        datasets: [
          {
            data: [0, 0.5, 2, 0, 0, 0, 5, 1, 0],
          }
        ]
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            data: [0, 2.5, 5, 0, 0, 1, 0],
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            data: Array.from({ length: 30 }, () => Math.random() * 10),
          }
        ]
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            data: [15, 12, 8, 5, 3, 1, 10, 20, 15, 8, 5, 12],
          }
        ]
      };
    }
  };

  const precipitationData = generatePrecipitationData();

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
    propsForBars: {
      fillShadowGradient: colors.primary,
      fillShadowGradientOpacity: 0.8
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

  const getTotalPrecipitation = () => {
    return precipitationData.datasets[0].data.reduce((a: number, b: number) => a + b, 0).toFixed(1);
  };

  const getPrecipitationDescription = (total: number) => {
    if (total === 0) return 'Sin precipitación';
    if (total < 5) return 'Lluvia ligera';
    if (total < 15) return 'Lluvia moderada';
    if (total < 30) return 'Lluvia fuerte';
    return 'Lluvia intensa';
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
        <Text style={styles.title}>Precipitación</Text>
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
        <Text style={styles.currentValue}>{getTotalPrecipitation()}</Text>
        <Text style={styles.currentUnit}>mm</Text>
        <Text style={styles.currentDescription}>
          {getPrecipitationDescription(parseFloat(getTotalPrecipitation()))}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={precipitationData}
          width={screenWidth - 40}
          height={280}
          chartConfig={chartConfig}
          yAxisLabel=""
          yAxisSuffix=" mm"
          yAxisInterval={1}
          fromZero
          style={styles.chart}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Estadísticas de Precipitación</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.2</Text>
              <Text style={styles.statLabel}>Promedio diario</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>20.5</Text>
              <Text style={styles.statLabel}>Máximo histórico</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Mínimo</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        <View style={styles.tipItem}>
          <Icon name="umbrella" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Lleva paraguas o impermeable si la precipitación es mayor a 5mm</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="directions-car" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Conduce con precaución en carreteras mojadas</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="water" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Revisa sistemas de drenaje en caso de lluvias fuertes</Text>
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
  currentUnit: {
    fontSize: 20,
    color: colors.textDark,
    marginTop: -10,
  },
  currentDescription: {
    fontSize: 16,
    color: colors.textDark,
    marginTop: 8,
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
    textAlign: 'center',
  },
  tipsContainer: {
    padding: 20,
    backgroundColor: 'rgba(220, 169, 1, 0.1)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
  },
  tipText: {
    color: colors.textDark,
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});

export default PrecipitationScreen;