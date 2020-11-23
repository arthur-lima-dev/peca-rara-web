import api from '../support/api';

export default class PecaService {
    
    buscarPecas(){
       return api.get('/peca');
    }

    buscarPecaPorCodigo(codigo){
        return api.get(`/peca/${codigo}`);
     }

     salvarPeca(peca){
        return api.post('/peca', peca);
     }

     alterarPeca(codigoPeca, peca){
         return api.put(`/peca/${codigoPeca}`, peca);
     }

      deletarPeca(codigoPeca){
         return api.delete(`/peca/${codigoPeca}`);
      }
}
