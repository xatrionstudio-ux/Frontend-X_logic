import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/DashboardModule';
import { InboxModule } from './components/InboxModule';
import { CRMModule } from './components/CRMModule';
import { WorkflowsModule } from './components/WorkflowsModule';
import { RetentionModule } from './components/RetentionModule';
import { AnalyticsModule } from './components/AnalyticsModule';
import { SettingsModule } from './components/SettingsModule';
import { SuperadminModule } from './components/SuperadminModule';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [hasHotLeads, setHasHotLeads] = useState(true);

  // Simulate hot leads detection
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would check for actual hot leads
      setHasHotLeads(Math.random() > 0.3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'inbox':
        return <InboxModule />;
      case 'crm':
        return <CRMModule />;
      case 'workflows':
        return <WorkflowsModule />;
      case 'retention':
        return <RetentionModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'settings':
        return <SettingsModule />;
      case 'superadmin':
        return <SuperadminModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        hasHotLeads={hasHotLeads}
      />
      <main className="flex-1 overflow-auto">
        {renderModule()}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
