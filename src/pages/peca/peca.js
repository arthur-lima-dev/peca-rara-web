import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import './peca.css';
import PecaService from '../../services/Peca-service';
import Input from '../../components/form/Input';
import useQuery from '../../support/useQuery';

function Peca() {
  const formRef = useRef(null);
  const history = useHistory();
  const query = useQuery();
  const codigoPeca = query.get("codigoPeca");
  const pecaService = new PecaService();

  /**
   * Após carregar busca as informações na API
   */
  useEffect(() => {
    setTimeout(() => {
      if (codigoPeca) {
        pecaService.buscarPecaPorCodigo(codigoPeca)
          .then(peca => formRef.current.setData(peca.data));
      }
    });
  }, [pecaService]);

  /**
   * Ao finalizar a validação do formulário executa o método de salvar a peça
   * 
   * @param {*} peca 
   * @param {*} param1 
   */
  async function validarFormulario(peca, { reset }) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string()
          .required('O nome é obrigatório')
          .max(200, 'O limite máximo é de 200 caracteres'),
        veiculoAplicacao: Yup.string()
          .max(200, 'O limite máximo é de 200 caracteres'),
        //TODO: COLOCAR DUAS CASAS DECIMAIS
        pesoLiquido: Yup.number()
          //TODO: verificar typeError quando string vazia
          .typeError('O peso líquido é obrigatório')
          .required('O peso líquido é obrigatório')
          .test('pesoLiquitoMaior', 'O peso líquido não pode ser maior que o peso bruto', (pesoLiquido) => {
            return !(Number.parseFloat(pesoLiquido) > Number.parseFloat(peca.pesoBruto));
          }),
        pesoBruto: Yup.number()
          .typeError('O peso bruto é obrigatório')
          .required('O peso bruto é obrigatório'),
      });

      await schema.validate(peca, {
        abortEarly: false
      });

      salvar(peca);
      formRef.current.setErrors({});
      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const mensagensErro = {};
        error.inner.forEach(err =>
          mensagensErro[err.path] = err.message
        );

        formRef.current.setErrors(mensagensErro);
      }
    }
  }

  function alterarPeca(codigo, peca) {
    pecaService.alterarPeca(codigo, peca)
      .then(() => {
        alert('Peça alterada com sucesso');
        abrirTelaConsulta();
      }).catch((erro) => console.log("Erro ao alterar peça"));
  }

  function salvarPeca(peca) {
    pecaService.salvarPeca(peca)
      .then(() => {
        alert('Peça salva com sucesso');
      }).catch((erro) => console.log("Erro ao criar peça"));
  }

  function salvar(peca) {
    if (codigoPeca) {
      alterarPeca(Number.parseInt(codigoPeca), peca);
    } else {
      salvarPeca( peca);
    }
  }

  function abrirTelaConsulta(){
    history.push('/'); 
  }

  return (
    <div className="p-2">
      <button className="btn btn-link" onClick={() => abrirTelaConsulta()}>Consulta de Peças</button>
      <h1>Cadastro de Peça</h1>

      <div className="d-flex justify-content-center">
        <Form ref={formRef} onSubmit={validarFormulario}>
          <div className="form-group">
            <label htmlFor="txtNome">Nome</label>
            <Input id="txtNome" name="nome" />
          </div>
          <div className="form-group">
            <label htmlFor="txtVeiculoAplicacao">Veículo Aplicação</label>
            <Input id="txtVeiculoAplicacao" name="veiculoAplicacao" />
          </div>
          <div className="form-group">
            <label htmlFor="txtPesoLiquido">Peso Liquido</label>
            <Input id="txtPesoLiquido" type='number' name="pesoLiquido" />
          </div>
          <div className="form-group">
            <label htmlFor="txtPesoBruto">Peso Bruto</label>
            <Input id="txtPesoBruto" type='number' name="pesoBruto" />
          </div>
          <div className="form-group row float-right">
            <button type="reset" className="btn btn-primary">Limpar</button>
            <button type="submit" className="btn btn-success">Salvar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Peca;