import { View, Text, StyleSheet, Pressable, ScrollView, Share, SafeAreaView } from "react-native";
import { useDataStore } from '../../store/data';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { useColors } from '@/constants/colors';
import { useThemeStore } from '../../store/theme';
import { Data } from '../../types/data';
import { Link, router } from "expo-router";
import { Ionicons, Feather } from '@expo/vector-icons';

type NutritionResponse = Data | { data?: Data; message?: string } | null;

export default function Nutrition() {
    const user = useDataStore(state => state.user);
    const colors = useColors();
    const { theme, toggleTheme } = useThemeStore();

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
        loading: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
        },
        loadingText: {
            fontSize: 20,
            color: colors.text,
            marginBottom: 6,
            textAlign: "center",
        },
        fixedHeader: {
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingTop: 35,
            paddingBottom: 20,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        contentHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 24,
            color: colors.text,
            fontWeight: 'bold',
        },
        headerButtons: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonShare: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 18,
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
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
        heroGoal: {
            fontSize: 12,
            color: colors.secondary,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },

        // Stats Section
        statsSection: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            gap: 12,
        },
        statCard: {
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        statValue: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 8,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
        },

        // Sections
        section: {
            marginBottom: 32,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 16,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 12,
        },

        // Meal Cards
        mealCard: {
            backgroundColor: colors.surface,
            borderRadius: 16,
            marginHorizontal: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3,
            overflow: 'hidden',
        },
        mealHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: colors.primary + '08',
        },
        mealIcon: {
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },
        mealInfo: {
            flex: 1,
        },
        mealTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 4,
        },
        mealTime: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        mealTimeText: {
            fontSize: 12,
            color: colors.textSecondary,
            marginLeft: 4,
        },
        foodList: {
            padding: 16,
            paddingTop: 0,
        },
        foodTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 12,
        },
        foodItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 8,
        },
        foodBullet: {
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.secondary,
            marginTop: 6,
            marginRight: 12,
        },
        foodText: {
            flex: 1,
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20,
        },

        // Supplements
        supplementsCard: {
            backgroundColor: colors.surface,
            borderRadius: 16,
            marginHorizontal: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3,
        },
        supplementItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
        },
        supplementIcon: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.secondary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },
        supplementText: {
            fontSize: 14,
            color: colors.text,
            flex: 1,
        },

        // Empty States
        emptyCard: {
            alignItems: 'center',
            padding: 40,
        },
        emptyText: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 12,
            fontWeight: '500',
        },
        emptySubtext: {
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
        },
        emptyState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
            paddingTop: 100,
        },
        emptyStateTitle: {
            fontSize: 20,
            color: colors.text,
            textAlign: 'center',
            marginTop: 16,
            fontWeight: 'bold',
        },
        emptyStateText: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 8,
        },

        // Action Section
        actionSection: {
            paddingHorizontal: 20,
            paddingTop: 20,
        },
        primaryButton: {
            backgroundColor: colors.secondary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 28,
            shadowColor: colors.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
        },
        primaryButtonText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 8,
        },
    });

    const { data, isFetching, error } = useQuery({
        queryKey: ['nutrition', user],
        queryFn: async (): Promise<Data | null> => {
            if (!user || !user.name) {
                throw new Error('Erro ao tentar obter dados do utilizador');
            }
            try {
                const response = await api.post<NutritionResponse>("/create", {
                    name: user.name,
                    weight: user.weight,
                    height: user.height,
                    age: user.age,
                    gender: user.gender,
                    level: user.level,
                    goal: user.goal,
                });

                const payload = response.data;
                if (!payload) return null;

                if ('message' in payload && payload.message) {
                    throw new Error(payload.message);
                }

                if ((payload as { data?: Data }).data) {
                    return (payload as { data: Data }).data;
                }

                return payload as Data;
            } catch (err) {
                console.log(err);
                throw err; // Re-throw to let React Query handle the error
            }
        }
    });

    async function handleShare() {
        try {
            if (!data || !data.suplementos || !data.refeicoes) return;

            const suplements = data.suplementos.map(item => `${item}`).join(', ');
            const foods = data.refeicoes.map(item => `- Nome: ${item.nome}\n- Horario: ${item.horario}\n- Alimentos: ${item.alimentos.join(', ')}`).join('\n\n');
            const message = `Ola, ${data.nome}! Aqui esta a sua dieta personalizada para atingir o seu objectivo de ${data.objetivo}:\n\n${foods}\n\nSuplementos: ${suplements}`;
            await Share.share({ message });
        } catch (err) {
            console.log(err);
        }
    }

    if (isFetching) {
        return <View style={styles.loading}>
            <Ionicons name="sparkles" size={40} color={colors.secondary} style={{ marginBottom: 8 }} />
            <Text style={styles.loadingText}>Carregando...</Text>
            <Text style={styles.loadingText}>Consultando IA...</Text>
        </View>;
    }

    if (error) {
        return <View style={styles.loading}>
            <Text style={styles.loadingText}>Falha ao gerar dieta</Text>
            <Link href={"/"}>
                <Text style={styles.loadingText}> Tente novamente</Text>
            </Link>
        </View>;
    }

    const hasData = data && Object.keys(data).length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedHeader}>
                <View style={styles.contentHeader}>
                    <Text style={[styles.title, { color: colors.text }]}>Sua Dieta</Text>
                    <View style={styles.headerButtons}>
                        <Pressable style={[styles.buttonShare, { backgroundColor: colors.accent }]} onPress={handleShare}>
                            <Ionicons name="share-outline" size={18} color={colors.white} />
                        </Pressable>
                        <Pressable style={[styles.buttonShare, { backgroundColor: colors.primary, marginLeft: 8 }]} onPress={toggleTheme}>
                            <Ionicons
                                name={theme === 'light' ? 'moon' : 'sunny'}
                                size={18}
                                color={colors.white}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {hasData ? (
                    <View style={styles.content}>
                        {/* Hero Section */}
                        <View style={styles.heroSection}>
                            <View style={styles.heroCard}>
                                <View style={styles.heroIcon}>
                                    <Ionicons name="restaurant" size={32} color={colors.primary} />
                                </View>
                                <View style={styles.heroText}>
                                    <Text style={styles.heroTitle}>Olá, {data?.nome}!</Text>
                                    <Text style={styles.heroSubtitle}>Seu plano alimentar personalizado está pronto</Text>
                                    <Text style={styles.heroGoal}>Objetivo: {data?.objetivo}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View style={styles.statsSection}>
                            <View style={styles.statCard}>
                                <Ionicons name="person" size={24} color={colors.primary} />
                                <Text style={styles.statValue}>{data?.idade} anos</Text>
                                <Text style={styles.statLabel}>Idade</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Ionicons name="body" size={24} color={colors.primary} />
                                <Text style={styles.statValue}>{data?.altura}cm</Text>
                                <Text style={styles.statLabel}>Altura</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Ionicons name="trophy" size={24} color={colors.secondary} />
                                <Text style={styles.statValue}>{data?.objetivo}</Text>
                                <Text style={styles.statLabel}>Meta</Text>
                            </View>
                        </View>

                        {/* Daily Meal Plan */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="calendar" size={24} color={colors.primary} />
                                <Text style={styles.sectionTitle}>Plano Alimentar Diário</Text>
                            </View>

                            {data?.refeicoes && data.refeicoes.length > 0 ? (
                                data.refeicoes.map((refeicao, index) => (
                                    <View key={index} style={styles.mealCard}>
                                        <View style={styles.mealHeader}>
                                            <View style={styles.mealIcon}>
                                                {refeicao.nome.toLowerCase().includes('café') && <Ionicons name="cafe" size={20} color={colors.white} />}
                                                {refeicao.nome.toLowerCase().includes('almoço') && <Ionicons name="restaurant" size={20} color={colors.white} />}
                                                {refeicao.nome.toLowerCase().includes('jantar') && <Ionicons name="moon" size={20} color={colors.white} />}
                                                {refeicao.nome.toLowerCase().includes('lanche') && <Ionicons name="fast-food" size={20} color={colors.white} />}
                                                {!refeicao.nome.toLowerCase().includes('café') && !refeicao.nome.toLowerCase().includes('almoço') && !refeicao.nome.toLowerCase().includes('jantar') && !refeicao.nome.toLowerCase().includes('lanche') && <Ionicons name="nutrition" size={20} color={colors.white} />}
                                            </View>
                                            <View style={styles.mealInfo}>
                                                <Text style={styles.mealTitle}>{refeicao.nome}</Text>
                                                <View style={styles.mealTime}>
                                                    <Ionicons name="time" size={14} color={colors.textSecondary} />
                                                    <Text style={styles.mealTimeText}>{refeicao.horario}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.foodList}>
                                            <Text style={styles.foodTitle}>Alimentos recomendados:</Text>
                                            {refeicao.alimentos.map((alimento, foodIndex) => (
                                                <View key={foodIndex} style={styles.foodItem}>
                                                    <View style={styles.foodBullet} />
                                                    <Text style={styles.foodText}>{alimento}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View style={styles.emptyCard}>
                                    <Ionicons name="sad" size={48} color={colors.textSecondary} />
                                    <Text style={styles.emptyText}>Nenhuma refeição encontrada</Text>
                                </View>
                            )}
                        </View>

                        {/* Supplements */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="medkit" size={24} color={colors.primary} />
                                <Text style={styles.sectionTitle}>Suplementos Recomendados</Text>
                            </View>

                            <View style={styles.supplementsCard}>
                                {data?.suplementos?.length ? (
                                    data.suplementos.map((item, index) => (
                                        <View key={index} style={styles.supplementItem}>
                                            <View style={styles.supplementIcon}>
                                                <Ionicons name="medkit" size={16} color={colors.secondary} />
                                            </View>
                                            <Text style={styles.supplementText}>{item}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <View style={styles.emptyCard}>
                                        <Ionicons name="checkmark-circle" size={48} color={colors.secondary} />
                                        <Text style={styles.emptyText}>Nenhum suplemento necessário</Text>
                                        <Text style={styles.emptySubtext}>Sua dieta já fornece todos os nutrientes essenciais</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Action Button */}
                        <View style={styles.actionSection}>
                            <Pressable style={styles.primaryButton} onPress={() => router.replace("/")}>
                                <Ionicons name="home" size={20} color={colors.white} />
                                <Text style={styles.primaryButtonText}>Voltar ao Início</Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text" size={64} color={colors.textSecondary} />
                        <Text style={styles.emptyStateTitle}>Nenhum dado encontrado</Text>
                        <Text style={styles.emptyStateText}>Tente gerar sua dieta novamente</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
