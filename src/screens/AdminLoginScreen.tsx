// screens/AdminLoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';

// Define color palette
const colors = {
  primary: '#0A7764',
  secondary: '#0A7764',
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#5A5A5A',
  textLight: '#8E8E93',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  inputBackground: '#F5F5F5',
};

// InputField component
const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  rightIcon,
  autoCapitalize = 'none'
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={24} color={colors.primary} style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={colors.textLight}
    />
    {rightIcon}
  </View>
);

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleLogin
}: {
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  handleLogin: () => void;
}) => (
  <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.loginOuterContainer}
  >
    <View style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <Icon name="admin-panel-settings" size={60} color={colors.primary} />
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>
        <Text style={styles.loginSubtitle}>Accede al panel de administración</Text>
      </View>
      
      <View style={styles.formContainer}>
        <InputField
          icon="person"
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        
        <InputField
          icon="lock"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          rightIcon={
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color={colors.textMedium}
              />
            </TouchableOpacity>
          }
        />
        
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Icon name="check" size={16} color={colors.white} />}
            </View>
            <Text style={styles.rememberMeText}>Recordar sesión</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Icon name="login" size={20} color={colors.white} style={styles.buttonIcon} />
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
);

// Estilos actualizados para el formulario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  placeholder: {
    width: 34,
  },
  loginSection: {
    padding: 20,
  },
  loginOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 15,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.textMedium,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.textDark,
    paddingVertical: 0,
  },
  rememberMeContainer: {
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rememberMeText: {
    fontSize: 16,
    color: colors.textMedium,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  adminPanel: {
    padding: 20,
  },
  welcomeContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeInfo: {
    marginLeft: 15,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: colors.textMedium,
    marginTop: 4,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  onlineText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  statsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMedium,
    marginTop: 4,
    textAlign: 'center',
  },
  adminOptions: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 15,
    backgroundColor: colors.background,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionHeader: {
    position: 'relative',
    marginBottom: 10,
  },
  optionBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  optionBadgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 5,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityContent: {
    marginLeft: 15,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  logoutButton: {
    backgroundColor: colors.error,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AdminLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
;
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const { login, logout, isLoggedIn } = useAuth();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleLogin = () => {
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  if (username === adminCredentials.username && password === adminCredentials.password) {
    login(); // <-- actualiza estado global
    Alert.alert('Éxito', 'Inicio de sesión exitoso como administrador');
  } else {
    Alert.alert('Error', 'Credenciales incorrectas');
  }
};


  const handleLogout = () => {
  logout(); // <-- importante
  setUsername('');
  setPassword('');
  setRememberMe(false);
  Alert.alert('Sesión Cerrada', 'Has cerrado sesión correctamente');
};


  const adminOptions = [
    {
      icon: 'people',
      title: 'Gestionar Usuarios',
      description: 'Administrar cuentas de usuario',
      color: colors.primary,
      count: '245'
    },
    {
      icon: 'settings',
      title: 'Configuración del Sistema',
      description: 'Ajustes generales de la aplicación',
      color: colors.secondary,
      count: '12'
    },
    {
      icon: 'insert-chart',
      title: 'Reportes Estadísticos',
      description: 'Análisis y métricas del sistema',
      color: colors.success,
      count: '1,234'
    },
    {
      icon: 'notifications',
      title: 'Alertas y Notificaciones',
      description: 'Gestión de notificaciones',
      color: colors.warning,
      count: '56'
    },
    {
      icon: 'cloud-download',
      title: 'Respaldo de Datos',
      description: 'Backup y restauración',
      color: colors.error,
      count: '3'
    },
    {
      icon: 'security',
      title: 'Seguridad',
      description: 'Logs y monitoreo de seguridad',
      color: colors.primary,
      count: '8'
    }
  ];

  const systemStats = [
    { label: 'Usuarios Activos', value: '2,453', icon: 'people', color: colors.primary },
    { label: 'Datos Procesados', value: '156.8 GB', icon: 'storage', color: colors.secondary },
    { label: 'Uptime Sistema', value: '99.97%', icon: 'check-circle', color: colors.success },
    { label: 'Alertas Activas', value: '12', icon: 'warning', color: colors.warning }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Icon name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Panel de Administrador</Text>
        <View style={styles.placeholder} />
      </View>

      {!isLoggedIn ? (
        <View style={styles.loginSection}>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            handleLogin={handleLogin}
          />
        </View>
      ) : (
        <View style={styles.adminPanel}>
          {/* Welcome Section */}
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeHeader}>
              <Icon name="verified-user" size={50} color={colors.primary} />
              <View style={styles.welcomeInfo}>
                <Text style={styles.welcomeText}>Bienvenido, Administrador</Text>
                <Text style={styles.welcomeSubtext}>Panel de control del sistema</Text>
              </View>
            </View>
            
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Sistema Online</Text>
            </View>
          </View>

          {/* System Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Estadísticas del Sistema</Text>
            <View style={styles.statsGrid}>
              {systemStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Admin Options */}
          <View style={styles.adminOptions}>
            <Text style={styles.optionsTitle}>Herramientas de Administración</Text>
            <View style={styles.optionsGrid}>
              {adminOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.optionCard}>
                  <View style={styles.optionHeader}>
                    <Icon name={option.icon} size={30} color={option.color} />
                    <View style={styles.optionBadge}>
                      <Text style={styles.optionBadgeText}>{option.count}</Text>
                    </View>
                  </View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activityContainer}>
            <Text style={styles.activityTitle}>Actividad Reciente</Text>
            <View style={styles.activityItem}>
              <Icon name="person-add" size={20} color={colors.success} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Nuevo usuario registrado</Text>
                <Text style={styles.activityTime}>Hace 2 minutos</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Icon name="backup" size={20} color={colors.primary} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Respaldo automático completado</Text>
                <Text style={styles.activityTime}>Hace 1 hora</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Icon name="warning" size={20} color={colors.warning} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Alerta de sensor desconectado</Text>
                <Text style={styles.activityTime}>Hace 3 horas</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color={colors.white} style={styles.buttonIcon} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default AdminLoginScreen;
