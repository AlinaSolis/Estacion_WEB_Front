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

const SunScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const generateUVData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['06:00', '09:00', '12:00', '15:00', '18:00'],
        datasets: [
          {
            data: [1, 4, 8, 6, 2],
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
            data: [4, 5, 7, 6, 8, 5, 4],
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
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 8) + 1),
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
            data: [5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    }
  };

  const uvData = generateUVData();

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

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getUVIndexDescription = (index: number) => {
    if (index <= 2) return 'Bajo';
    if (index <= 5) return 'Moderado';
    if (index <= 7) return 'Alto';
    if (index <= 10) return 'Muy alto';
    return 'Extremo';
  };

  const getCurrentUVIndex = () => {
    if (timeRange === 'day') return 8;
    if (timeRange === 'week') return 7;
    if (timeRange === 'month') return 6;
    return 7;
  };

  const getDaylightHours = () => {
    if (timeRange === 'day') return '13 horas 36 minutos';
    if (timeRange === 'week') return '13 horas 42 minutos (promedio)';
    if (timeRange === 'month') return '13 horas 18 minutos (promedio)';
    return '12 horas 54 minutos (promedio anual)';
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
        <Text style={styles.title}>Radiación Solar</Text>
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
        <Text style={styles.currentValue}>{getCurrentUVIndex()}</Text>
        <Text style={styles.currentDescription}>Índice UV - {getUVIndexDescription(getCurrentUVIndex())}</Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={uvData}
          width={screenWidth - 40}
          height={280}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix=" UV"
          yAxisInterval={timeRange === 'day' ? 1 : 2}
        />
      </View>

      <View style={styles.sunGraphContainer}>
        <Text style={styles.sectionTitle}>Horas de Sol</Text>
        <View style={styles.sunGraph}>
          <View style={styles.sunPath}>
            <View style={styles.sunPosition} />
          </View>
          <View style={styles.sunTimes}>
            <Text style={styles.sunTimeText}>06:12 AM</Text>
            <Text style={styles.sunTimeText}>07:48 PM</Text>
          </View>
        </View>
        <Text style={styles.daylightHours}>{getDaylightHours()} de luz solar</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>6.2</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.5</Text>
              <Text style={styles.statLabel}>Máximo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.0</Text>
              <Text style={styles.statLabel}>Mínimo</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones de Protección</Text>
        <View style={styles.tipItem}>
          <Icon name="wb-sunny" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Usa protector solar SPF 30+ cada 2 horas</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="access-time" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Evita exposición entre 10am y 4pm</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="dark-mode" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Usa sombrero de ala ancha y gafas de sol</Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="umbrella" size={24} color={colors.primary} />
          <Text style={styles.tipText}>Busca sombra cuando el índice UV sea alto</Text>
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
  sunGraphContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  sunGraph: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    position: 'relative',
  },
  sunPath: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(215, 137, 9, 0.4)',
    borderRadius: 3,
    marginTop: 20,
    position: 'relative',
  },
  sunPosition: {
    position: 'absolute',
    left: '70%',
    top: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  sunTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  sunTimeText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '500',
  },
  daylightHours: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
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
  tipsContainer: {
    padding: 20,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
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

export default SunScreen;