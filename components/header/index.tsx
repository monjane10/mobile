import{View, 
    StyleSheet, 
    Pressable, 
    Text, 
    SafeAreaView, 
    Platform, 
    StatusBar} from 'react-native'
import { colors, useColors } from '@/constants/colors'
import {Feather} from '@expo/vector-icons'
import { router } from 'expo-router'

interface HeaderProps {
    step: string
    title: string
}

export function Header({step, title}: HeaderProps) {
  const colors = useColors();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.row}>
                <Pressable onPress={() => router.back()}>
                    <Feather name='arrow-left' size={20} color={colors.text} />
                </Pressable>
                <Text style={styles.text}>{step}<Feather name='loader' size={14} color={colors.primary} /> </Text>

            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingTop: 8,
        paddingBottom: 8,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 8,
    }
})