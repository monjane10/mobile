import {View, 
    Text, 
    Image, 
    StyleSheet, 
    Pressable, 
    ScrollView } from 'react-native'
    import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import{useForm} from 'react-hook-form'
import {colors} from '../../constants/colors'
import {Header} from '../../components/header'
import {Input} from '../../components/input'
import {Select} from '../../components/input/select'
import {useDataStore} from '../../store/data'
import {router} from 'expo-router'


const schema = z.object({
  gender: z.string().min(1, 'O gênero é obrigatório'),
  goal: z.string().min(1, 'O objectivo é obrigatório'),
  level: z.string().min(1, 'Selecione o seu nível'),
})

type FormData = z.infer<typeof schema>

export default function Create() {
  const{control, handleSubmit, formState: {errors, isValid} } = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    const setPageTwo = useDataStore((state) => state.setPageTwo)
    const genderOptions = [{label: 'Masculino', value: 'Masculino'}, {label: 'Feminino', value: 'feminino'}]
    const levelOptions = [{ label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
      { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
      { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
      { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },]
    const goalOptions =  [
      { label: 'Emagrecer', value: 'emagrecer' },
      { label: 'Hipertrofia', value: 'Hipertrofia' },
      { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
      { label: 'Definição', value: 'Definição' },
    ]
  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      goal: data.goal
    })

    router.push('./nutrition')

  }
  return (

    <View style={styles.container}>
      <Header 
      step='Passo 2'
      title="Finalizar dieta" />

      <ScrollView>
        <Text style={styles.label}>
          Gênero
        </Text>
        <Select
        control={control}
        name='gender'
        placeholder='Selecione o seu gênero'
        error={errors.gender?.message}
        options={genderOptions}
         />

<Text style={styles.label}>
          Nível de actividade física
        </Text>
        <Select
        control={control}
        name='level'
        placeholder='Selecione o seu nível de actividade física'
        error={errors.level?.message}
        options={levelOptions}
         />

<Text style={styles.label}>
           Selecion o seu objectivo
        </Text>
        <Select
        control={control}
        name='goal'
        placeholder='Selecione o seu o objectivo'
        error={errors.level?.message}
        options={goalOptions}
         />

         
               <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                 <Text style={styles.buttonText}>Próximo</Text>
               </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
      },
      label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      content: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
         
       },
       buttonText: {
         color: colors.white,
         fontSize: 16,
         fontWeight: 'bold',
       }
})