import { useNavigate } from 'react-router-dom'
import { Steps } from 'primereact/steps'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useCart } from '../contexts/CartContext'
import { useState, useEffect } from 'react'

export default function PaginaDePagamento() {
  const navigate = useNavigate()
  const { items } = useCart()

  const [cartao, setCartao] = useState('')
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [cvv, setCvv] = useState('')

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [])

  const total = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)

  const steps = [
    { label: 'Carrinho', command: () => navigate('/cart') },
    { label: 'Pagamento' },
    { label: 'Confirmação' }
  ]

  const onlyNumbers = value => value.replace(/\D/g, '')
  const onlyLetters = value => value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')

  const handleCartao = e => {
    const value = onlyNumbers(e.target.value)
    setCartao(value.slice(0, 16))
  }

  const handleNome = e => {
    setNome(onlyLetters(e.target.value))
  }

  const handleValidade = e => {
    let value = onlyNumbers(e.target.value).slice(0, 4)
    if (value.length >= 3) {
      value = value.replace(/^(\d{2})(\d{1,2})/, '$1/$2')
    }
    setValidade(value)
  }

  const handleCvv = e => {
    const value = onlyNumbers(e.target.value)
    setCvv(value.slice(0, 3))
  }

  const pagamentoValido =
    cartao.length === 16 &&
    nome.length > 3 &&
    validade.length === 5 &&
    cvv.length === 3

  const finalizarCompra = () => {
    if (!pagamentoValido) return
    navigate('/confirmacao', { replace: true })
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
        <InputText
          placeholder="Número do cartão"
          value={cartao}
          onChange={handleCartao}
        />

        <InputText
          placeholder="Nome no cartão"
          value={nome}
          onChange={handleNome}
        />

        <InputText
          placeholder="Validade (MM/AA)"
          value={validade}
          onChange={handleValidade}
        />

        <InputText
          placeholder="CVV"
          value={cvv}
          onChange={handleCvv}
        />
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <Button
          label="Voltar"
          onClick={() => navigate('/cart')}
        />

        <Button
          label="Finalizar compra"
          disabled={!pagamentoValido}
          className="p-button-success"
          onClick={finalizarCompra}
        />
      </div>
    </div>
  )
}
