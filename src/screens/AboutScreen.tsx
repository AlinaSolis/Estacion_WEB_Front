import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Menu } from 'lucide-react';

// Paleta de colores mejorada
const colors = {
  primary: '#0A7764',
  primaryLight: 'rgba(10, 119, 100, 0.1)',
  secondary: '#D78909',
  white: '#FFFFFF',
  textDark: '#2C3E50',
  textMedium: '#7F8C8D',
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  border: '#ECF0F1',
};

const AboutScreen = () => {
  const navigation = useNavigation();
  const isWeb = Dimensions.get('window').width > 768; // Detectar si es web

  // Función para abrir el menú lateral
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Barra de navegación superior */}
      <View style={[styles.navbar, isWeb && styles.navbarWeb]}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Menu size={28} color={colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.logo}>Sistema Meteorológico UTD</Text>
        
        {/* Espacio para alinear el título (reemplaza los enlaces que movimos al drawer) */}
        <View style={styles.emptySpace}></View>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.content, isWeb && styles.contentWeb]}>
          <View style={styles.header}>
            <Text style={styles.title}>Sobre Nosotros</Text>
            <Text style={styles.subtitle}>Conoce más sobre nuestro sistema meteorológico</Text>
          </View>

          <View style={styles.gridContainer}>
            {/* Primera tarjeta */}
            <View style={[styles.card, isWeb && styles.cardWeb]}>
              <View style={styles.cardHeader}>
                <Icon name="school" size={24} color={colors.primary} />
                <Text style={styles.sectionTitle}>Universidad Tecnológica de Durango</Text>
              </View>
              <Text style={styles.text}>
                La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica 
                y la formación de profesionales capaces de enfrentar los retos del mundo actual.
              </Text>
            </View>

            {/* Segunda tarjeta */}
            <View style={[styles.card, isWeb && styles.cardWeb]}>
              <View style={styles.cardHeader}>
                <Icon name="cloud" size={24} color={colors.primary} />
                <Text style={styles.sectionTitle}>Sistema Meteorológico</Text>
              </View>
              <Text style={styles.text}>
                Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones 
                climáticas en tiempo real y proporcionar datos históricos para investigación y análisis.
              </Text>
            </View>

            {/* Tercera tarjeta */}
            <View style={[styles.card, isWeb && styles.cardWeb]}>
              <View style={styles.cardHeader}>
                <Icon name="groups" size={24} color={colors.primary} />
                <Text style={styles.sectionTitle}>Equipo de Desarrollo</Text>
              </View>
              <View style={styles.teamList}>
                <View style={styles.teamMember}>
                  <Icon name="person" size={20} color={colors.primary} />
                  <Text style={styles.memberText}>Solís Guereca Alina Alecxandra</Text>
                </View>
                <View style={styles.teamMember}>
                  <Icon name="person" size={20} color={colors.primary} />
                  <Text style={styles.memberText}>Sosa Villa Leslie Joselin</Text>
                </View>
                <View style={styles.teamMember}>
                  <Icon name="person" size={20} color={colors.primary} />
                  <Text style={styles.memberText}>Robles Quezada Jacqueline</Text>
                </View>
                <View style={styles.teamMember}>
                  <Icon name="person" size={20} color={colors.primary} />
                  <Text style={styles.memberText}>Gonzalez Espino Marco Antonio</Text>
                </View>
                <View style={styles.teamMember}>
                  <Icon name="person" size={20} color={colors.primary} />
                  <Text style={styles.memberText}>Delgado Cabrera Miguel Angel</Text>
                </View>
              </View>
            </View>

            {/* Cuarta tarjeta */}
            <View style={[styles.card, isWeb && styles.cardWeb]}>
              <View style={styles.cardHeader}>
                <Icon name="contact-mail" size={24} color={colors.primary} />
                <Text style={styles.sectionTitle}>Contacto</Text>
              </View>
              <View style={styles.contactList}>
                <View style={styles.contactItem}>
                  <Icon name="email" size={20} color={colors.primary} />
                  <Text style={styles.contactText}>meteorologia@utd.edu.mx</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="phone" size={20} color={colors.primary} />
                  <Text style={styles.contactText}>+52 618 123 4567</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="location-on" size={20} color={colors.primary} />
                  <Text style={styles.contactText}>Durango - Mezquital, 34308 Gabino Santillán, Dgo.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Sistema Meteorológico UTD - Todos los derechos reservados</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    minHeight: 100,
  },
  scrollContainer: {
    flex: 1,
  },
  navbar: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  navbarWeb: {
    paddingHorizontal: '10%',
  },
  menuButton: {
    padding: 8,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
  },
  emptySpace: {
    width: 28, // Mismo ancho que el botón de menú para mantener la simetría
  },
  content: {
    padding: 20,
    flex: 1,
  },
  contentWeb: {
    paddingHorizontal: '10%',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMedium,
    textAlign: 'center',
    maxWidth: 600,
  },
  gridContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardWeb: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    color: colors.textMedium,
    lineHeight: 24,
  },
  teamList: {
    gap: 12,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  memberText: {
    fontSize: 16,
    color: colors.textDark,
  },
  contactList: {
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    fontSize: 16,
    color: colors.textDark,
  },
  footer: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default AboutScreen;