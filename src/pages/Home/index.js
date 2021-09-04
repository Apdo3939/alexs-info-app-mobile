import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../config/configApi';

export default function Home() {
    const navigation = useNavigation();
    const [budgets, setBudgets] = useState('');

    const getListBudget = async () => {
        try {
            const response = await api.get('/list');
            setBudgets(response.data.budget);
        } catch (error) {
            Alert.alert('Erro: Tente mais tarde.')
        }
    }

    useFocusEffect(
        useCallback(() => {
            getListBudget();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Listar Orçamentos</Text>

            <FlatList
                style={styles.listData}
                data={budgets}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Services', {
                        budgetId: item.id
                    })}>
                        <View style={styles.listContent}>
                            <Text style={styles.textTitle}>{item.id + ' - ' + item.name}</Text>
                            <Text style={styles.textDesc}>{item.subject}</Text>
                        </View>
                    </TouchableOpacity>
                )} keyExtractor={budget => String(budget.id)}
            />
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
    listContent: {
        display: 'flex',
        backgroundColor: '#00550020',
        borderColor: '#005500',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 5,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#005500',
        marginBottom: 5,
        textTransform: 'capitalize'
    },
    textDesc: {
        fontSize: 22,
        fontWeight: '700',
        color: '#005555',
        marginBottom: 5,
        textTransform: 'uppercase'
    }
});