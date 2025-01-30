import { View, Text, StyleSheet, Pressable, ScrollView, Share } from "react-native";
import { useDataStore } from '../../store/data'
import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import { colors } from '../../constants/colors'
import { Data } from '../../types/data'
import { Link, router } from "expo-router";
import React from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';

interface ResponseData {
    data: Data;
}

export default function Nutrition() {

    const user = useDataStore(state => state.user)
    const { data, isFetching, error } = useQuery({
        queryKey: ['nutrition'],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error('Erro ao tentar obter dados do utilizador')
                }
                const response = await api.get<Data>("/teste")
                // const response = await api.post<Data>("/create", {
                //     name: user.name,
                //     age: user.age,
                //     gender: user.gender,
                //     weight: user.weight,
                //     height: user.height,
                //     level: user.level,
                //     goal: user.goal
                // });

                console.log(response.data); // Verifique se os dados estão corretos
                return response.data || {};

            } catch (error) {
                console.log(error);
                return null;
            }
        }
    })

    async function handleShare() {
        try {
            if (data && Object.keys(data).length === 0) return;

            const suplements = `${data?.suplementos.map(item => `${item}`)}`;
            const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n - Horário:${item.horario} \n- Alimentos:
                ${item.alimentos.map(alimento => `${alimento}`)}`)}`;
            const message = `Olá, ${data?.nome}! Aqui está a sua dieta personalizada \n para antigir o seu objectivo de ${data?.objetivo}: \n\n ${foods} \n\n E aqui estão os suplementos que você deve tomar: \n\n ${suplements}`;
            await Share.share({ message });

        } catch (error) {
            console.log(error);
        }
    }

    if (isFetching) {
        return <View style={styles.loading}>
            <Text style={styles.loadingText}>Carregando...</Text>
            <Text style={styles.loadingText}>Consultando IA...</Text>
        </View>
    }

    if (error) {
        return <View style={styles.loading}>
            <Text style={styles.loadingText}>Falha ao gerar dieta</Text>
            <Link href={"/"}>
                <Text style={styles.loadingText}> Tente novamente</Text>
            </Link>
        </View>
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Dieta Personalizada</Text>
                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 ?  (
                    <>
                        <Text style={styles.name}>Nome: {data?.nome}</Text>
                        <Text style={styles.name}>Idade: {data?.idade}</Text>
                        <Text style={styles.name}>Altura: {data?.altura}</Text>
                        <Text style={styles.goal}>Meta: {data?.objetivo}</Text>
                        <Text style={styles.label}>Refeições:</Text>
                        <ScrollView>
                            <View style={styles.foods}>
                                {data && data.refeicoes?.length > 0 && data.suplementos?.length > 0 ?(
                                    data.refeicoes.map((refeicao, index) => (
                                        <View key={index} style={styles.food}>
                                            <View style={styles.foodHeader}>
                                                <Text style={styles.foodTitle}>{refeicao.nome}</Text>
                                                <Ionicons name="restaurant" size={16} color="#000" />
                                            </View>
                                            <View style={styles.foodContent}>
                                                <Feather name="clock" size={14} color="#000" />
                                                <Text>Horário: {refeicao.horario}</Text>
                                            </View>
                                            <Text style={styles.foodText}>Alimentos:</Text>
                                            {refeicao.alimentos.map(alimento => (
                                                <Text key={alimento}>{alimento}</Text>
                                            ))}
                                        </View>
                                    ))
                                ) : (
                                    <Text>Sem refeições</Text>
                                )}
                            </View>

                            <View style={styles.suplements}>
                                <Text style={styles.foodTitle}>Suplementos:</Text>
                                {data.suplementos.map(item => (
                                    <Text key={item}>{item}</Text>
                                ))}
                            </View>

                            <Pressable style={styles.button} onPress={() => router.replace("/")}>
                                <Text style={styles.buttonText}>Voltar</Text>
                            </Pressable>
                        </ScrollView>
                    </>
                ) : (
                    <Text style={styles.loadingText}>Nenhum dado encontrado</Text>
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",

    },
    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16,
    },

    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold',
    },
    buttonShare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4,
    },
    buttonShareText: {
        color: colors.white,
        fontWeight: '500'
    },
    name: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
    },
    goal: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 24
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    foods: {
        backgroundColor: colors.white,
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },

    food: {
        backgroundColor: 'rgba(208,208,208,0.40)',
        padding: 8,
        borderRadius: 5,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    foodTitle: {
        fontSize: 16,
        fontWeight: 'bold',

    },

    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    foodText: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14,
    },
    suplements: {
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8
    },
    button: {
        backgroundColor: colors.blue,
        padding: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }


})
