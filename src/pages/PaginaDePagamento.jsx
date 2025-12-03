import { useNavigate } from 'react-router-dom'
import { Steps } from 'primereact/steps'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useCart } from '../contexts/CartContext'
import { useState, useRef } from 'react'
import { Toast } from 'primereact/toast'

export default function PaginaDePagamento() {
  const navigate = useNavigate()
  const { items } = useCart()
  const toast = useRef(null)

  const [cartao, setCartao] = useState('')
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [cvv, setCvv] = useState('')

  const total = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)

  const steps = [
    { label: 'Carrinho', command: () => navigate('/cart') },
    { label: 'Pagamento' },
    { label: 'Confirmação' }
  ]

  function erro(msg) {
    toast.current.show({
      severity: 'error',
      summary: 'Erro',
      detail: msg,
      life: 2000
    })
  }

  function validarCartao(e) {
    let valor = e.target.value.replace(/\D/g, '')
    if (valor.length > 16) {
      erro("O cartão deve ter 16 dígitos.")
      return
    }
    setCartao(valor)
  }

  function validarNome(e) {
    const valor = e.target.value
    if (!/^[A-Za-zÀ-ú ]*$/.test(valor)) {
      erro("O nome deve conter apenas letras.")
      return
    }
    setNome(valor)
  }

  function validarValidade(e) {
    let valor = e.target.value.replace(/[^0-9/]/g, '')

    if (valor.length === 2 && validade.length === 1) {
      valor = valor + "/"
    }

    if (valor.length > 5) return

    setValidade(valor)
  }

  function validarCVV(e) {
    const valor = e.target.value.replace(/\D/g, '')
    if (valor.length > 3) {
      erro("O CVV deve conter 3 números.")
      return
    }
    setCvv(valor)
  }

  function luhn(cartao) {
    let soma = 0
    let alternar = false

    for (let i = cartao.length - 1; i >= 0; i--) {
      let n = parseInt(cartao[i])
      if (alternar) {
        n *= 2
        if (n > 9) n -= 9
      }
      soma += n
      alternar = !alternar
    }
    return soma % 10 === 0
  }

  function validarCampos() {
    if (cartao.length !== 16) {
      erro("O cartão deve conter 16 dígitos.")
      return false
    }

    if (!luhn(cartao)) {
      erro("Número do cartão inválido.")
      return false
    }

    if (nome.trim().split(" ").length < 2) {
      erro("Digite o nome completo.")
      return false
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
      erro("Validade deve ser no formato MM/AA.")
      return false
    }

    const [mes, ano] = validade.split("/").map(Number)
    if (mes < 1 || mes > 12) {
      erro("Mês da validade inválido.")
      return false
    }

    const hoje = new Date()
    const anoAtual = hoje.getFullYear() % 100
    const mesAtual = hoje.getMonth() + 1

    if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
      erro("Cartão expirado.")
      return false
    }

    if (cvv.length !== 3) {
      erro("CVV deve conter 3 dígitos.")
      return false
    }

    return true
  }

  const finalizarCompra = () => {
    if (!validarCampos()) return
    navigate('/confirmacao')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Toast ref={toast} />

      <Steps model={steps} activeIndex={1} readOnly />

      <h2 style={{ marginTop: 30 }}>Pagamento</h2>

      <div style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
        <h4>Resumo do pedido</h4>
        {items.map(i => (
          <div key={i.id}>
            {i.title} — {i.qty}x R${i.price}
          </div>
        ))}
        <p><strong>Total: R${total}</strong></p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InputText placeholder="Número do cartão" value={cartao} onChange={validarCartao} />
        <InputText placeholder="Nome no cartão" value={nome} onChange={validarNome} />
        <InputText placeholder="Validade (MM/AA)" value={validade} onChange={validarValidade} />
        <InputText placeholder="CVV" value={cvv} onChange={validarCVV} />
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <Button label="Voltar" onClick={() => navigate('/cart')} />
        <Button label="Finalizar compra" className="p-button-success" onClick={finalizarCompra} />
      </div>
    </div>
  )
}
