// AppNavigator.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import WindScreen from '../screens/WindScreen';
import SunScreen from '../screens/SunScreen';
import AboutScreen from '../screens/AboutScreen';
import SensorsScreen from '../screens/SensorsScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  return (
     <SafeAreaView style={styles.drawerSafeArea} edges={['right', 'bottom', 'left']}>
      {/* Cambiar View por ScrollView */}
      <ScrollView 
        style={styles.drawerContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        contentContainerStyle={styles.drawerContentContainer}
      >
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
          { name: 'Wind', icon: 'air', label: 'Viento', color: '#0A7764' },
          { name: 'Sun', icon: 'wb-sunny', label: 'Radiación Solar', color: '#D78909' },
          { name: 'Sensors', icon: 'sensors', label: 'Sensores IoT', color: '#0A7764' },
          { name: 'AdminLogin', icon: 'admin-panel-settings', label: 'Login', color: '#D78919' },
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
      </ScrollView>

      {/* Pie de página fijo fuera del ScrollView */}
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
  backgroundColor: 'transparent', // O el color que prefieras
  shadowColor: 'transparent', // Para quitar la sombra
  elevation: 0,   },
            overlayColor: 'rgba(0, 0, 0, 0.3)',
            sceneContainerStyle: {
              backgroundColor: 'transparent',
            },
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Temperature" component={TemperatureScreen} />
          <Drawer.Screen name="Wind" component={WindScreen} />
          <Drawer.Screen name="Sun" component={SunScreen} />
          <Drawer.Screen name="Sensors" component={SensorsScreen} />
           <Drawer.Screen name="AdminLogin" component={AdminLoginScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  drawerSafeArea: {
    flex: 1,
    backgroundColor: '#E56G7D',
  },
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 1,
    backgroundColor: 'transparent',
  },
  drawerContentContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 22,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(19, 93, 99)',
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    borderTopColor: 'rgba(224, 224, 224, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  
});


export default AppNavigator;