import {View, StyleSheet, Text, TextInput, KeyboardTypeOptions} from 'react-native'
import {Controller} from 'react-hook-form'
import { colors, useColors } from '@/constants/colors'

interface  InputProps {
    control: any
    name: string
    placeholder?: string
    rules?: object
    error?: string
    keyboardType: KeyboardTypeOptions
}


export  function Input({ name, control, placeholder, rules, error, keyboardType}: InputProps) {
    const colors = useColors();
    return (
        <View style={styles.container}>
            <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field:{onChange, onBlur, value}}) => (
                <TextInput style={styles.input}
                placeholder= {placeholder}
                placeholderTextColor={colors.textSecondary}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType} 
                />      
                )
            }
             /> 
             {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        height: 48,
        backgroundColor: colors.surface,
        paddingHorizontal: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: 16,
        color: colors.text,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    errorText: {
        color: colors.error,
        marginTop: 8,
        fontSize: 14,
    }
})