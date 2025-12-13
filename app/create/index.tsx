import {View, 
    Text, 
    StyleSheet, 
    Pressable, 
    ScrollView } from 'react-native'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import{useForm} from 'react-hook-form'
import { useColors } from '@/constants/colors'
import {Select} from '../../components/input/select'
import {useDataStore} from '../../store/data'
import {router} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'


const schema = z.object({
  gender: z.string().min(1, 'Gênero obrigatório'),
  goal: z.string().min(1, 'Objectivo obrigatório'),
  level: z.string().min(1, 'Selecione o seu nível'),
})

type FormData = z.infer<typeof schema>

export default function Create() {
  const colors = useColors();
  const{control, handleSubmit, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    const setPageTwo = useDataStore((state) => state.setPageTwo)
    const genderOptions = [{label: 'Masculino', value: 'Masculino'}, {label: 'Feminino', value: 'Feminino'}]
    const levelOptions = [
      { label: 'Sedentário (pouco ou nenhuma actividade física)', value: 'Sedentario' },
      { label: 'Levemente activo (exercícios 1 a 3 vezes na semana)', value: 'Levemente activo' },
      { label: 'Moderadamente activo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente activo' },
      { label: 'Altamente activo (exercícios 5 a 7 dias por semana)', value: 'Altamente activo' },
    ]
    const goalOptions =  [
      { label: 'Emagrecer', value: 'Emagrecer' },
      { label: 'Hipertrofia', value: 'Hipertrofia' },
      { label: 'Hipertrofia + Definição', value: 'Hipertrofia + Definição' },
      { label: 'Definição', value: 'Definição'},
    ]

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      goal: data.goal
    })

    router.push('./nutrition')

  }

  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
      },
      scrollContainer: {
        flex: 1,
      },
      content: {
        padding: 24,
        paddingTop: 20,
      },
      heroSection: {
        marginBottom: 32,
      },
      heroCard: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        flexDirection: 'row',
        alignItems: 'center',
      },
      heroIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      },
      heroText: {
        flex: 1,
      },
      heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 6,
        lineHeight: 28,
      },
      heroSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
      },
      formSection: {
        marginBottom: 32,
      },
      inputGroup: {
        marginBottom: 20,
      },
      inputCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
      },
      inputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        backgroundColor: colors.primary + '10',
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
      buttonSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
      button: {
        height: 60,
        borderRadius: 30,
        shadowColor: colors.primary,
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
              <Ionicons name="settings" size={30} color={colors.primary} />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Suas Preferências</Text>
              <Text style={styles.heroSubtitle}>
                Forneça as tuas metas e estilo de vida para uma dieta perfeita
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
                  <Ionicons name="people" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Gênero</Text>
              </View>
              <View style={styles.inputContent}>
                <Select
                  control={control}
                  name='gender'
                  placeholder='Selecione o seu gênero'
                  error={errors.gender?.message}
                  options={genderOptions}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="fitness" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Nível de Actividade Física</Text>
              </View>
              <View style={styles.inputContent}>
                <Select
                  control={control}
                  name='level'
                  placeholder='Selecione o seu nível'
                  error={errors.level?.message}
                  options={levelOptions}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIcon}>
                  <Ionicons name="trophy" size={20} color={colors.white} />
                </View>
                <Text style={styles.label}>Objectivo</Text>
              </View>
              <View style={styles.inputContent}>
                <Select
                  control={control}
                  name='goal'
                  placeholder='Selecione o seu objectivo'
                  error={errors.goal?.message}
                  options={goalOptions}
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
              <Text style={styles.buttonText}>Gerar Dieta</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
