import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import PecaService from '../../../services/Peca-service';

class PecaConsulta extends Component{
  pecaService = new PecaService();

  constructor(props) {
    super(props);
    this.state = { pecas: [] }
    
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.pecaService.buscarPecas()
      .then(res =>  this.setState({pecas: res.data})
        ).catch(() => { console.log('Erro ao recuperar os dados'); });    
  }

  componentDidMount() {
    this.refresh();
  }

  criarPeca(){
    this.props.history.push("/peca-detalhe");
  }

  alterarPeca(codigoPeca){
    this.props.history.push({
      pathname: "/peca-detalhe",
      state: {codigoPeca: codigoPeca}
    });
  }

  excluirPeca(codigoPeca){
    const isExcluir = window.confirm('Realmente deseja excluir a peça?');

    if(isExcluir){
      this.pecaService.deletarPeca(codigoPeca)
        .then(()=>this.refresh());
    }
  }

  //TODO: ORDENAR PELO NOME ALFABETICAMENTE
  render(){
    return (
      <div className="p-2">
        <div>
          <h1>Consulta de Peça</h1>
          <button className="btn btn-primary float-right mb-1" onClick={() => this.criarPeca()}>Nova Peça</button>
        </div>

        <div>            
           <table className="table table-striped">
             <thead>
               <tr>
                 <th>Nome</th>
                 <th>Veículo Aplicação</th>
                 <th>Peso Liquido</th>
                 <th>Peso Bruto</th>
                 <th>Ações</th>
               </tr>
             </thead>

             <tbody>
               {this.state.pecas.map((peca, index) => (
                 <tr key={index}>
                   <td>{peca.nome}</td>
                   <td>{peca.veiculoAplicacao}</td>
                   <td>{peca.pesoLiquido}</td>
                   <td>{peca.pesoBruto}</td>
                   <td>
                     <button className="btn btn-primary" onClick={() => this.alterarPeca(peca.codigo)}>Alterar</button>
                     <button className="btn btn-danger" onClick={() => this.excluirPeca(peca.codigo)}>Apagar</button>
                    </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    );
  }    
}

export default withRouter(PecaConsulta);