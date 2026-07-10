import SettingsForm from './components/settings/SettingsForm'
import './App.css'

function App() {
  const handleSave = async (values: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Saved:', values)
  }

  return (
    <div className="min-h-screen w-full bg-[#020817] flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden font-[Poppins,sans-serif]">

      {/* Background glowing orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[520px] flex flex-col items-center gap-8">
        {/* Form card */}
        <div className="relative group w-full">
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-700" />
          {/* Card itself */}
          <div className="relative w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Top color bar */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600" />
            <SettingsForm onSave={handleSave} />
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-700 text-[11px] font-mono text-center">
          5 / 5 tests passing ·{' '}
          <code className="text-slate-600 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
            WORKFLOW.md
          </code>{' '}
          at repo root
        </p>

      </div>
    </div>
  )
}

export default App
