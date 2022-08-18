import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { buscaRepositorio, pegarRepositoriosDoUsuario, PegarRepositoriosDoUsuarioPorNome } from '../../services/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [repoBusca, setRepoBusca] = useState({});
    const [nomeRepo, setNomeRepo] = useState('');
    const estaNaTela = useIsFocused();

    useEffect(async () => {
        const resultado = await PegarRepositoriosDoUsuarioPorNome(route.params.name)
        setRepo(resultado)
    }, [estaNaTela])

    async function buscaRepo() {
        const resultado = await buscaRepositorio(nomeRepo)
        console.log(resultado)

        setNomeRepo('')
        if (resultado) {
            setRepoBusca(resultado)
        }
        else {
            Alert.alert('repositório não encontrado')
            setRepoBusca({})
        }

    }

    async function buscarRepositorioPorNome() {
        const resultado = await PegarRepositoriosDoUsuarioPeloNome(route.params.id, nomeRepo);
        setRepoBusca(resultado);
        setNomeRepo('');
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            {/*<TextInput
                    placeholder="Busque por um repositório"
                    autoCapitalize="none"
                    
                    value={nomeRepo}
                    onChangeText={setNomeRepo}

                />

                <TouchableOpacity style={estilos.botao}
                    onPress={buscaRepo}
                >
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>

                <View >
                {
                    repoBusca?.name && 
                <>
                 <Text>{repoBusca.id}</Text>
                 <Text>{repoBusca.name}</Text>
                </>
                }
            </View>*/}

            <View style={estilos.container}>
                <TextInput
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                    placeholder="Busque por um repositorio"
                    autoCapitalize="none"
                    style={estilos.entrada}
                />
                <TouchableOpacity
                    onPress={buscarRepositorioPorNome}
                >
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={repo}
                style={{ width: '100%' }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => navigation.navigate('InfoRepositorio', { item })}
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )}></FlatList>

        </View>
    );
}
