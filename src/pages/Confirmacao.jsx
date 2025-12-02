import { Steps } from 'primereact/steps'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'

export default function Confirmacao() {
  const navigate = useNavigate()
  const { clear } = useCart()

  const steps = [
    { label: 'Carrinho', command: () => navigate('/cart') },
    { label: 'Pagamento', command: () => navigate('/pagamento') },
    { label: 'Confirmação' }
  ]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      
      <Steps model={steps} activeIndex={2} readOnly />

      <h2 style={{ marginTop: 30 }}>✅ Compra realizada com sucesso!</h2>
      <p>Obrigado por comprar com a gente.</p>

      <div style={{ marginTop: 20 }}>
        <Button
          label="Voltar para a loja"
          onClick={() => {
            clear()
            navigate('/cart')
          }}
        />
      </div>
    </div>
  )
}
