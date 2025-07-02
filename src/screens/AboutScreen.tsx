// screens/AboutScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const colors = {
  primary: '#0A7764',
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#5A5A5A',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
};

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre Nosotros</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Universidad Tecnológica de Durango</Text>
          <Text style={styles.text}>
            La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica 
            y la formación de profesionales capaces de enfrentar los retos del mundo actual.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sistema Meteorológico</Text>
          <Text style={styles.text}>
            Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones 
            climáticas en tiempo real y proporcionar datos históricos para investigación y análisis.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Equipo de Desarrollo</Text>
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

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contacto</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  header: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  card: {
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
  },
  text: {
    fontSize: 16,
    color: colors.textMedium,
    lineHeight: 24,
    marginBottom: 10,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberText: {
    fontSize: 16,
    color: colors.textMedium,
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: colors.textMedium,
    marginLeft: 10,
  },
});

export default AboutScreen;