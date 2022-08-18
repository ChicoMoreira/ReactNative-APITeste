import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function pegarRepositoriosDoUsuarioPorNome(name) {
    try {
        const resultado = await api.get(`/users/${name}/repos`)
        return resultado.data
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data, 
            postId: postId,
            id: id
        })
        return 'sucesso'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}

export async function buscaRepositorio(name) {
    try {
        const resultado = await api.get(`/repos?name=${name}`)
        return resultado.data[0]
    }
    catch (error) {
        console.log(error)
        return {}
    }
}


export async function PegarRepositoriosDoUsuarioPeloNome(id, nome){
    const resultado = await api.get(`/posts/${id}/repos?name=${nome}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return [];
    })
    return resultado;
}


export async function criarRepositoriosDoUsuario(postId, nome, data) {
    try {
        await api.post(`/repos/`, {
            name: nome,
            data: data, 
            postId: postId,
        })
        return 'sucesso'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}

export async function deletarRepositoriosDoUsuario(id) {
    try {
        await api.delete(`/repos/${id}` )
        return 'sucesso'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}