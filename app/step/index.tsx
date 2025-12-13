import {View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView,
  Animated } from 'react-native'
import { useColors } from '@/constants/colors'
import {Header} from '../../components/header'
import {Input} from '../../components/input'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import{useForm} from 'react-hook-form'
import {router} from 'expo-router'
import {useDataStore} from '../../store/data'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatorio'),
  weight: z.string().min(1, 'Peso obrigatorio'),
  age: z.string().min(1, 'Idade obrigatoria'),
  height: z.string().min(1, 'Altura obrigatoria'),
})

type FormData = z.infer<typeof schema>



export default function Step(){
  const colors = useColors();
  const{control, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const setPageOne = useDataStore(state => state.setPageOne)

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height
    })

    router.push('./create')
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      paddingBottom: 40,
    },

    // Hero Section
    heroSection: {
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 10,
    },
    heroCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    heroIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    heroText: {
      flex: 1,
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 6,
      lineHeight: 20,
    },

    // Form Section
    formSection: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    inputCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
      overflow: 'hidden',
    },
    inputHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.primary + '08',
    },
    inputIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '600',
      lineHeight: 20,
    },
    inputContent: {
      padding: 16,
      paddingTop: 0,
    },

    // Button Section
    buttonSection: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    button: {
      height: 60,
      borderRadius: 30,
      shadowColor: colors.secondary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      overflow: 'hidden',
    },
    buttonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 22,
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroIcon}>
              <Ionicons name="person-add" size={30} color={colors.primary} />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Vamos começar</Text>
              <Text style={styles.heroSubtitle}>
                Precisamos de algumas informações básicas para podermos gerar a tua dieta
              </Text>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="person" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Nome</Text>
              </View>
              <View style={styles.inputContent}>
                <Input
                  control={control}
                  name='name'
                  placeholder='Digite seu nome completo'
                  error={errors.name?.message}
                  keyboardType='default'
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="scale" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Teu peso actual</Text>
              </View>
              <View style={styles.inputContent}>
                <Input
                  control={control}
                  name='weight'
                  placeholder='Ex: 75.5 (kg)'
                  error={errors.weight?.message}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="body" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Tua altura</Text>
              </View>
              <View style={styles.inputContent}>
                <Input
                  control={control}
                  name='height'
                  placeholder='Ex: 1.75 (metros)'
                  error={errors.height?.message}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="calendar" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Tua idade</Text>
              </View>
              <View style={styles.inputContent}>
                <Input
                  control={control}
                  name='age'
                  placeholder='Ex: 25'
                  error={errors.age?.message}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          <LinearGradient
            colors={[colors.secondary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Pressable onPress={handleSubmit(handleCreate)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.buttonText}>Continuar</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
