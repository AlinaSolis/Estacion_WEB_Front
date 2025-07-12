import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Menu } from 'lucide-react';
import { LineChart } from 'react-native-chart-kit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale/es';
import { Popover } from '@mui/material';


const colors = {
  primary: '#0A7764',
  primaryLight: 'rgba(10, 119, 100, 0.1)',
  secondary: '#D78909',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textDark: '#333333',
  border: 'rgba(0, 0, 0, 0.1)',
  gray: '#888888',
};

const WindScreen = () => {
  const navigation = useNavigation();
  const currentYear = new Date().getFullYear();

  // --- Estados del componente ---
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());




  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  // --- Funciones de manejo de fechas ---
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleStartDateChange = (newValue: Date | null) => {
    if (newValue) {
      setStartDate(newValue);
      if (endDate < newValue) {
        setEndDate(newValue);
      }
    }
    setOpenStartPicker(false);
  };

  const handleEndDateChange = (newValue: Date | null) => {
    if (newValue) {
      setEndDate(newValue);
    }
    setOpenEndPicker(false);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (currentPicker === 'start') {
        setStartDate(selectedDate);
        if (endDate < selectedDate) {
          setEndDate(selectedDate);
        }
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  // --- Función de búsqueda ---
  const handleSearch = () => {
    if (startDate > endDate) {
      Alert.alert('Error de Fechas', 'La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    setShowResults(true);
  };

  // --- Datos simulados del viento ---
  const generateWindData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        datasets: [{
          data: [8, 7, 12, 15, 18, 14, 10, 9, 8],
        }]
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          data: [10, 12, 15, 14, 13, 11, 9],
        }]
      };
    } else if (timeRange === 'month') {
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [{
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5),
        }]
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          data: [10, 12, 15, 14, 13, 11, 9, 8, 10, 12, 14, 16],
        }]
      };
    }
  };

  const windData = generateWindData();
  const currentWindSpeed = windData.datasets[0].data[Math.floor(windData.datasets[0].data.length / 2)];

  const getWindDirection = () => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const getWindDescription = (speed: number) => {
    if (speed < 1) return 'Calma';
    if (speed < 5) return 'Brisa ligera';
    if (speed < 12) return 'Brisa suave';
    if (speed < 20) return 'Brisa moderada';
    if (speed < 29) return 'Brisa fresca';
    return 'Viento fuerte';
  };

  // --- Renderizado del gráfico ---
  const renderChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Velocidad del Viento (km/h)</Text>
        <LineChart
          data={{
            labels: windData.labels,
            datasets: [
              {
                data: windData.datasets[0].data,
                color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: colors.white,
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: colors.white,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };

  // --- Renderizado de datos actuales ---
  const renderCurrentData = () => {

    //Elimina estooo 
  };
  const EmptyInput = () => null;

  // --- Renderizado de selectores de tiempo ---

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Barra superior fija */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuButton}
        >
          <Menu size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Datos del Viento</Text>
      </View>


      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* Controles de fecha */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          {/* Controles de fecha */}
          <View style={styles.controlsContainer}>
            {/* Fecha inicial */}
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>Fecha inicial</Text>
              <TouchableOpacity
                onPress={(e: any) => handleOpenPicker(e, 'start')}
                style={styles.dateButton}
                activeOpacity={0.7}
              >
                <Icon name="calendar-today" size={18} color={colors.primary} />
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                <Icon name="keyboard-arrow-down" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            {/* Fecha final */}
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>Fecha final</Text>
              <TouchableOpacity
                onPress={(e: any) => handleOpenPicker(e, 'end')}
                style={styles.dateButton}
                activeOpacity={0.7}
              >
                <Icon name="calendar-today" size={18} color={colors.primary} />
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                <Icon name="keyboard-arrow-down" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Popover con el DatePicker */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                marginTop: 8,
                borderRadius: 8,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <DatePicker
              value={currentPicker === 'start' ? startDate : endDate}
              onChange={(newValue) => {
                if (newValue) {
                  if (currentPicker === 'start') {
                    setStartDate(newValue);
                    if (endDate < newValue) {
                      setEndDate(newValue);
                    }} else {setEndDate(newValue);}}
                handleClosePicker();
              }}
              maxDate={new Date()}
              minDate={currentPicker === 'end' ? startDate : undefined}
              disableFuture
            />
          </Popover>
        </LocalizationProvider>



        {/* Botón de búsqueda */}
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchButton}
          activeOpacity={0.8}
        >
          <Text style={styles.searchButtonText}>
            <Icon name="search" size={20} color={colors.white} /> Consultar Datos
          </Text>
        </TouchableOpacity>

        {/* Selector de fecha modal */}
        {showDatePicker && (
          <DateTimePicker
            value={currentPicker === 'start' ? startDate : endDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            minimumDate={currentPicker === 'end' ? startDate : undefined}
            locale="es-ES"
          />
        )}
        {showResults ? (
          <>

            {renderCurrentData()}
            {renderChart()}

            {/* Tabla de resultados */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Resumen de Datos Registrados</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { flex: 2 }]}>Fecha y Hora</Text>
                <Text style={styles.headerText}>Vel (km/h)</Text>
                <Text style={styles.headerText}>Dir</Text>
                <Text style={styles.headerText}>Ráfaga</Text>
              </View>

              {/* Cuerpo de la tabla vacío con un mensaje */}
              <View style={styles.tableEmptyBody}>
                <Icon name="hourglass-empty" size={30} color={colors.gray} />
                <Text style={styles.emptyTableText}>
                  Cargando datos del viento...
                </Text>
              </View>
            </View>
          </>
        ) : (
          // Estado inicial antes de la búsqueda
          <View style={styles.emptyState}>
            <Icon name="wind-power" size={50} color={colors.gray} />
            <Text style={styles.emptyText}>
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información del viento.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuButton: {
    position: 'absolute',
    left: 15,
    top: 16,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: 'rgba(10, 119, 100, 0.3)',
    width: '100%',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: colors.textDark,
    marginHorizontal: 8,
  },
  separator: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  content: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    elevation: 3,
  },
  timeRangeLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  timeRangeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 25,
    padding: 4,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  activeTimeRangeButton: {
    backgroundColor: colors.primary,
  },
  timeRangeButtonText: {
    color: colors.textDark,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTimeRangeButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  currentDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  currentValueCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    elevation: 2,
    alignItems: 'center',
  },
  currentValueLabel: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
  },
  currentValueWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  currentValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  currentValueUnit: {
    fontSize: 16,
    color: colors.textDark,
    marginLeft: 4,
  },
  windDescription: {
    fontSize: 14,
    color: colors.textDark,
    fontStyle: 'italic',
  },
  directionCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
    elevation: 2,
    alignItems: 'center',
  },
  directionLabel: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
  },
  directionIndicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  directionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  tableContainer: {
    width: '92%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 3,
    marginTop: 20,
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    padding: 15,
    textAlign: 'center',
    backgroundColor: colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableEmptyBody: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTableText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 10,
  }
});

export default WindScreen;