import React, { Component } from 'react';
import './App.css';
import * as R from 'ramda'
import lpc from './lpc.png'

class App extends Component {

  state = {
    tamanhoDaComposicao: '36',
    tempoMovimentacao: '2',
    carregamentoTulha: '600',
    carregamentoVagao: '600',
    capacidadeVagao: '70.4',
    variacaoTulhaPositiva: '1.1',
    variacaoTulhaNegativa: '1.2',
    frequenciaTulhaNegativa: '0.8',
    frequenciaTulhaPositiva: '0.2',
    variacaoVagaoPositiva: '1.1',
    variacaoVagaoNegativa: '1.2',
    frequenciaVagaoNegativa: '0.8',
    frequenciaVagaoPositiva: '0.2',
    vagaoArray: [],
    newFullTime:'',
    tempoDaComposicao: [],
    tempoDaComposicaoSemMovimentacao: [],
    volumeCarregadoNaTulha: []
  }

  onChangeTamanhoDaComposicao = (event) => {
    const tempoMovimentacao = event.target.value
    this.setState({tempoMovimentacao})
  }

  onChangeTempoMovimentacao = (event) => {
    const tamanhoDaComposicao = event.target.value
    this.setState({tamanhoDaComposicao})
  }

  onChangeCarregamentoTulha = (event) => {
    const carregamentoTulha = event.target.value
    this.setState({carregamentoTulha})
  }

  onChangeCarregamentoVagao = (event) => {
    const carregamentoVagao = event.target.value
    this.setState({carregamentoVagao})
  }

  onChangeCapacidadeVagao = (event) => {
    const capacidadeVagao = event.target.value
    this.setState({capacidadeVagao})
  }

  onChangeVariacaoPositiva = (event) => {
    const variacaoPositiva = event.target.value
    this.setState({variacaoPositiva})
  }

  onChangeVariacaoNegativa = (event) => {
    const variacaoNegativa = event.target.value
    this.setState({variacaoNegativa})
  }

  onChangeFrequenciaNegativa = (event) => {
    const frequenciaNegativa = event.target.value
    this.setState({frequenciaNegativa})
  }

  onChangeFrequenciaPositiva = (event) => {
    const frequenciaPositiva = event.target.value
    this.setState({frequenciaPositiva})
  }

  onCreateResults = () => {
    const carregamentoTulhaPorMin = parseInt(this.state.carregamentoTulha)/60
    const carregamentoVagaoPorMin = parseInt(this.state.carregamentoVagao)/60
    const variacaoTulhaPositiva = this.state.variacaoTulhaPositiva
    const variacaoTulhaNegativa = this.state.variacaoTulhaNegativa
    const frequenciaTulhaPositiva = this.state.frequenciaTulhaPositiva
    const frequenciaTulhaNegativa = this.state.frequenciaTulhaNegativa
    const variacaoVagaoPositiva = this.state.variacaoVagaoPositiva
    const variacaoVagaoNegativa = this.state.variacaoVagaoNegativa
    const frequenciaVagaoPositiva = this.state.frequenciaVagaoPositiva
    const frequenciaVagaoNegativa = this.state.frequenciaVagaoNegativa
    const carregamentoTulhaAlto = carregamentoTulhaPorMin*(variacaoTulhaPositiva)
    const carregamentoTulhaBaixo = carregamentoTulhaPorMin/(variacaoTulhaNegativa)
    const carregamentoVagaoAlto = carregamentoVagaoPorMin*(variacaoVagaoPositiva)
    const carregamentoVagaoBaixo = carregamentoVagaoPorMin/(variacaoVagaoNegativa)
    const aleatorioTulha = Math.random()
    const aleatorioVagao = Math.random()
    if(aleatorioTulha < frequenciaTulhaPositiva) {
      var up = true;
      var value = this.state.capacidadeVagao;
      var decrement = carregamentoTulhaAlto;
      var floor = 0;
      const performCalc = () => {
        if (up == true && value >= floor) {
          value -= decrement
          this.setState({capacidadeVagao: value})
          this.state.vagaoArray.push(value)
          console.log(value)
          if (value == floor) {
            up = false;
          }
        }
      }
      const result = performCalc()

    } else if(aleatorioTulha > frequenciaTulhaNegativa) {
        var up = true;
        var value = this.state.capacidadeVagao;
        var decrement = carregamentoTulhaBaixo;
        var floor = 0;
        const performCalc = () => {
          if (up == true && value >= floor) {
            value -= decrement
            this.setState({capacidadeVagao: value})
            this.state.vagaoArray.push(value)
            console.log(value)
            if (value == floor) {
              up = false;
            }
          }
        }
        const result = performCalc()
    } else {
        var up = true;
        var value = this.state.capacidadeVagao;
        var decrement = carregamentoTulhaPorMin;
        var floor = 0;
        const performCalc = () => {
          if (up == true && value >= floor) {
            value -= decrement
            this.setState({capacidadeVagao: value})
            this.state.vagaoArray.push(value)
            console.log(value)
            if (value == floor) {
              up = false;
            }
          }
        }
        const result = performCalc()
    }
  }

  onCalculateTime = () => {
    const timeFull = this.state.vagaoArray.length
    const lastElement = this.state.vagaoArray[this.state.vagaoArray.length - 1]*-1
    console.log(lastElement)
    console.log(timeFull)
    const newTimePart = R.dropLast(1, this.state.vagaoArray).length
    console.log(newTimePart)
    const lastElementTime = lastElement/(parseInt(this.state.carregamentoTulha)/60)
    console.log(lastElementTime)
    const newFullTime = lastElementTime + newTimePart
    this.setState({newFullTime})
  }

  onNovoVagao = () => {
    this.state.tempoDaComposicao.push(this.state.newFullTime)
    this.state.tempoDaComposicaoSemMovimentacao.push(this.state.newFullTime)
    console.log(this.state.tempoDaComposicao)
    this.state.tempoDaComposicao.push(parseInt(this.state.tempoMovimentacao))
    console.log(this.state.tempoDaComposicao)
    this.setState({newFullTime: 0})
    this.setState({capacidadeVagao: 70.4})
    this.setState({vagaoArray: []})
    const carregamentoTulhaPorMin = parseInt(this.state.carregamentoTulha)/60
    const carregamentoVagaoPorMin = parseInt(this.state.carregamentoVagao)/60
    const variacaoTulhaPositiva = this.state.variacaoTulhaPositiva
    const variacaoTulhaNegativa = this.state.variacaoTulhaNegativa
    const frequenciaTulhaPositiva = this.state.frequenciaTulhaPositiva
    const frequenciaTulhaNegativa = this.state.frequenciaTulhaNegativa
    const variacaoVagaoPositiva = this.state.variacaoVagaoPositiva
    const variacaoVagaoNegativa = this.state.variacaoVagaoNegativa
    const frequenciaVagaoPositiva = this.state.frequenciaVagaoPositiva
    const frequenciaVagaoNegativa = this.state.frequenciaVagaoNegativa
    const carregamentoTulhaAlto = carregamentoTulhaPorMin*(variacaoTulhaPositiva)
    const carregamentoTulhaBaixo = carregamentoTulhaPorMin/(variacaoTulhaNegativa)
    const carregamentoVagaoAlto = carregamentoVagaoPorMin*(variacaoVagaoPositiva)
    const carregamentoVagaoBaixo = carregamentoVagaoPorMin/(variacaoVagaoNegativa)
    const aleatorioTulha = Math.random()
    const aleatorioVagao = Math.random()
    if(aleatorioVagao < frequenciaVagaoPositiva) {
      this.state.volumeCarregadoNaTulha.push(this.state.newFullTime*carregamentoVagaoAlto)
    } else if(aleatorioVagao > frequenciaVagaoNegativa) {
        this.state.volumeCarregadoNaTulha.push(this.state.newFullTime*carregamentoVagaoBaixo)
      } else {
          this.state.volumeCarregadoNaTulha.push(this.state.newFullTime*carregamentoVagaoPorMin)
        }
  }

  render() {
    console.log(this.state.capacidadeVagao)
    return (
      <div className="App">
        <img src={lpc} alt='img'/>
        <div className='parameters'>
          <label> Tamanho da Composição </label>
          <input value={this.state.tamanhoDaComposicao} onChange={this.onChangeTamanhoDaComposicao}/>
          <label> Tempo de movimentação do vagão </label>
          <input value={this.state.tempoMovimentacao} onChange={this.onChangeTempoMovimentacao}/>
          <label> Carregamento da Tulha </label>
          <input value={this.state.carregamentoTulha} onChange={this.onChangeCarregamentoTulha}/>
          <label> Carregamento do Vagão </label>
          <input value={this.state.carregamentoVagao} onChange={this.onChangeCarregamentoVagao}/>
          <label> Capacidade do Vagão </label>
          <input onChange={this.onChangeCapacidadeVagao}/>
          <label> Variação do valor da Tulha + - </label>
          <input value={this.state.variacaoTulhaPositiva} onChange={this.onChangeVariacaoPositiva}/>
          <input value={this.state.variacaoTulhaNegativa} onChange={this.onChangeVariacaoNegativa}/>
          <label> Variação da Frequencia Tulha + - </label>
          <input value={this.state.frequenciaTulhaPositiva} onChange={this.onChangeFrequenciaPositiva}/>
          <input value={this.state.frequenciaTulhaNegativa} onChange={this.onChangeFrequenciaNegativa}/>
          <label> Variação do valor do Vagão + - </label>
          <input value={this.state.variacaoVagaoPositiva} onChange={this.onChangeVariacaoPositiva}/>
          <input value={this.state.variacaoVagaoNegativa} onChange={this.onChangeVariacaoNegativa}/>
          <label> Variação da Frequencia Vagão + - </label>
          <input value={this.state.frequenciaVagaoPositiva} onChange={this.onChangeFrequenciaPositiva}/>
          <input value={this.state.frequenciaVagaoNegativa} onChange={this.onChangeFrequenciaNegativa}/>
          <button className='large-button blue-class' onClick={this.onCreateResults}>CARREGAR + 1 MIN</button>
          <div>VOLUME NO VAGÃO RESTANTE: {this.state.capacidadeVagao}</div>
          <button className='large-button red-class' onClick={this.onCalculateTime}>CALCULAR TEMPO</button>
          <div>TEMPO DO VAGÃO: {this.state.newFullTime}</div>
          <button className='large-button blue-class' onClick={this.onNovoVagao}>PROXIMO VAGÃO!</button>
          <div className='infoContainer'>TEMPO DA COMPOSIÇÃO: {R.sum(this.state.tempoDaComposicao)}</div>
          <div className='infoContainer'>VOLUME TOTAL CARREGADO NO VAGÃO: {this.state.tempoDaComposicaoSemMovimentacao.length * this.state.capacidadeVagao}</div>
          <div className='infoContainer'>VOLUME TOTAL CARREGADO NA TULHA: {R.sum(this.state.volumeCarregadoNaTulha)}</div>
          <div className='infoContainer2'>VOLUME NO SILO DA TULHA: {R.sum(this.state.volumeCarregadoNaTulha) - (this.state.tempoDaComposicaoSemMovimentacao.length * this.state.capacidadeVagao)}</div>
          {this.state.tempoDaComposicaoSemMovimentacao &&
            this.state.tempoDaComposicaoSemMovimentacao.map((tempo, index) => (
            <div className='infoContainer' key={index}>
            VAGÃO{index+1} - TEMPO: {tempo}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App;
