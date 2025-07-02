// AppNavigator.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import PressureScreen from '../screens/PressureScreen';
import WindScreen from '../screens/WindScreen';
import PrecipitationScreen from '../screens/PrecipitationScreen';
import SunScreen from '../screens/SunScreen';
import AboutScreen from '../screens/AboutScreen';
import SensorsScreen from '../screens/SensorsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={styles.drawerSafeArea} edges={['right', 'bottom', 'left']}>
      <View style={styles.drawerContainer}>
        {/* Encabezado del drawer */}
        <View style={styles.drawerHeader}>
          <Image 
            source={require('../../assets/UTD.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Sistema Meteorológico</Text>
          <Text style={styles.appSubtitle}>Universidad Tecnológica de Durango</Text>
        </View>

        {/* Elementos de navegación */}
        {[
          { name: 'Home', icon: 'home', label: 'Inicio', color: '#0A7764' },
          { name: 'Temperature', icon: 'device-thermostat', label: 'Temperatura', color: '#D78909' },
          { name: 'Pressure', icon: 'speed', label: 'Presión Atmosférica', color: '#DCA901' },
          { name: 'Wind', icon: 'air', label: 'Viento', color: '#0A7764' },
          { name: 'Precipitation', icon: 'water-drop', label: 'Precipitación', color: '#DCA901' },
          { name: 'Sun', icon: 'wb-sunny', label: 'Radiación Solar', color: '#D78909' },
          { name: 'Sensors', icon: 'sensors', label: 'Sensores IoT', color: '#0A7764' },
          { name: 'About', icon: 'info', label: 'Sobre Nosotros', color: '#0A7764' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => navigation.navigate(item.name)}
          >
            <Icon name={item.icon} size={24} color={item.color} style={styles.drawerIcon} />
            <Text style={[styles.drawerItemText, { color: item.color }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} UTD - Todos los derechos reservados</Text>
      </View>
    </SafeAreaView>
  );
};

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerPosition: 'left',
            headerShown: false,
            drawerType: 'slide',
            drawerStyle: {
              width: 300,
              backgroundColor: '#FFFFFF',
            },
            overlayColor: 'rgba(0, 0, 0, 0.3)',
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Temperature" component={TemperatureScreen} />
          <Drawer.Screen name="Pressure" component={PressureScreen} />
          <Drawer.Screen name="Wind" component={WindScreen} />
          <Drawer.Screen name="Precipitation" component={PrecipitationScreen} />
          <Drawer.Screen name="Sun" component={SunScreen} />
          <Drawer.Screen name="Sensors" component={SensorsScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  drawerSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A7764',
    marginBottom: 4,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
    textAlign: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  drawerIcon: {
    marginRight: 16,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
});

export default AppNavigator;