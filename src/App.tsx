import SettingsForm from './components/settings/SettingsForm'
import './App.css'

function App() {
  const handleSave = async (values: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form values successfully saved:", values);
  };

  return (
    <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>FE-03 Workflow Drill</h1>
        <p style={{ color: 'var(--text)', opacity: 0.8 }}>
          Demonstrating Round 2: Precise Prompting, Zod Schema Validation, and Screen-Reader Accessibility.
        </p>
      </header>

      <section style={{
        width: '100%',
        maxWidth: '480px',
        padding: '1.5rem',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--accent-bg)',
        boxShadow: 'var(--shadow)',
        textAlign: 'left'
      }}>
        <SettingsForm onSave={handleSave} />
      </section>

      <footer style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text)', opacity: 0.6 }}>
        All tests are passing. Check <code>WORKFLOW.md</code> at the root for the detailed diff write-up.
      </footer>
    </main>
  );
}

export default App

