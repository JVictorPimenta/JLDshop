import { useNavigate } from 'react-router-dom'
import { Steps } from 'primereact/steps'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useCart } from '../contexts/CartContext'
import { useState } from 'react'

export default function PaginaDePagamento() {
  const navigate = useNavigate()
  const { items } = useCart()

  const [cartao, setCartao] = useState('')
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [cvv, setCvv] = useState('')

  const total = items
    .reduce((s, i) => s + i.price * i.qty, 0)
    .toFixed(2)

  const steps = [
    { label: 'Carrinho', command: () => navigate('/cart') },
    { label: 'Pagamento' },
    { label: 'Confirmação' }
  ]

  const pagamentoValido = cartao && nome && validade && cvv

  const finalizarCompra = () => {
    if (!pagamentoValido) return
    navigate('/confirmacao')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Steps model={steps} activeIndex={1} readOnly />

      <h2 style={{ marginTop: 30 }}>Pagamento</h2>

      {/* RESUMO DO PEDIDO */}
      <div style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
        <h4>Resumo do pedido</h4>
        {items.map(i => (
          <div key={i.id}>
            {i.title} — {i.qty}x R${i.price}
          </div>
        ))}
        <p><strong>Total: R${total}</strong></p>
      </div>

      {/* FORMULÁRIO */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InputText
          placeholder="Número do cartão"
          value={cartao}
          onChange={e => setCartao(e.target.value)}
        />

        <InputText
          placeholder="Nome no cartão"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <InputText
          placeholder="Validade (MM/AA)"
          value={validade}
          onChange={e => setValidade(e.target.value)}
        />

        <InputText
          placeholder="CVV"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
        />
      </div>

      {/* BOTÕES */}
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
