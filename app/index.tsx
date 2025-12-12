import { View, Text, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useColors } from '@/constants/colors';
import { useThemeStore } from '../store/theme';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Index(){
  const colors = useColors();
  const { theme, toggleTheme } = useThemeStore();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: 36,
      paddingBottom: 20,
      paddingHorizontal: 18,
      alignItems: 'flex-end',
    },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 24,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: colors.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 20,
      color: colors.accent,
      textAlign: 'center',
      marginBottom: 16,
      fontWeight: '600',
    },
    text: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 24,
      maxWidth: 300,
    },
    button: {
      backgroundColor: colors.secondary,
      width: '80%',
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    buttonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name={theme === 'light' ? 'moon' : 'sunny'}
            size={20}
            color={colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Diet<Text style={{color: colors.accent}}>Assistent</Text>
        </Text>
        <Text style={styles.subtitle}>Seu assistente inteligente</Text>
        <Text style={styles.text}>
          Crie dietas personalizadas com IA para alcançar seus objetivos de saúde.
        </Text>
        <Link href="./step" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Começar Jornada</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  )
}
