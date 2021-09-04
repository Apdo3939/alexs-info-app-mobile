import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../config/configApi';

import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Services({ route }) {
    const navigation = useNavigation();
    const { budgetId } = route.params;
    const [budget, setBudget] = useState('');

    const getViewBudget = async () => {
        try {
            const response = await api.get('/budget/' + budgetId);
            setBudget(response.data.budget);
        } catch (error) {
            if (error.response) {
                Alert.alert("", error.response.data.message);
                navigation.navigate('Home');
            } else {
                Alert.alert("", "Erro: Tente mais tarde!");
                navigation.navigate('Home');
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            getViewBudget();
        }, [])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Visualizar Orçamento</Text>
            <View style={styles.content}>
                <Text style={styles.textId}>{'ID ' + budget.id}</Text>
                <Text style={styles.textName}>{budget.name + ' - ' + budget.email}</Text>
                <View style={styles.contentSubject}>
                    <Text style={styles.textSubject}>{budget.subject}</Text>
                    <Text style={styles.textContent}>{budget.content}</Text>
                </View>
            </View>
            <View style={styles.contentButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textButton}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#bbb'
    },
    title: {
        color: '#005500',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 12
    },
    listData: {
        width: '100%',
    },
    content: {
        display: 'flex',
        backgroundColor: '#00550020',
        borderColor: '#005500',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 5,
    },

    contentSubject: {
        display: 'flex',
        backgroundColor: '#00550050',
        borderColor: '#005500',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 5,
    },

    textId: {
        fontSize: 22,
        fontWeight: '700',
        color: '#005555',
        marginBottom: 5
    },

    textName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#005500',
        marginBottom: 5
    },

    textSubject: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000055',
        marginBottom: 16,
        textTransform: 'uppercase'
    },

    textContent: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000055',
        marginBottom: 16,
    },

    contentButton: {
        display: 'flex',
        alignItems: 'flex-end',
    },

    textButton: {
        width: '30%',
        paddingVertical: 12,
        paddingHorizontal: 24,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#005500',
        marginVertical: 16,
        borderColor: '#005500',
        borderWidth: 1,
        borderRadius: 8,
    }
});