import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import { colors, useColors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import {useState} from 'react'

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    control: any;
    name: string;
    placeholder?: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {

    const [Visible, setVisible] = useState(false);
    const colors = useColors();

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                            <Text style={styles.selectText}>{value? options.find(item => item.value === value)?.label : placeholder}</Text>
                            <Feather name="arrow-down" size={16} color={colors.text} />
                        </TouchableOpacity>

                        <Modal
                            visible={Visible}
                            animationType="fade"
                            transparent={true}
                            onRequestClose={() => setVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.modalContainer}
                                activeOpacity={1}
                                onPress={() => setVisible(false)}
                            >
                                <TouchableOpacity
                                    style={styles.modalContent}
                                    activeOpacity={1}
                                >
                                    <FlatList contentContainerStyle={{gap: 4}}
                                        data={options}
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity 
                                            style={styles.option}
                                            onPress={() => {
                                                 onChange(item.value);
                                                setVisible(false);
                                               
                                            } }>
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    selectText: {
        fontSize: 16,
        color: colors.text,
    },
    errorText: {
        color: colors.error,
        marginTop: 8,
        fontSize: 14,
    },
    select: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 20,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    option: {
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: colors.border,
    }
});
