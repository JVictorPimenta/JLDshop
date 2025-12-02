import { Steps } from 'primereact/steps';

export default function TesteSteps() {
  const steps = [
    { label: 'Passo 1' },
    { label: 'Passo 2' },
    { label: 'Passo 3' }
  ];

  return (
    <div style={{ padding: 40, border: '2px solid red' }}>
      <Steps model={steps} activeIndex={1} />
    </div>
  );
}
