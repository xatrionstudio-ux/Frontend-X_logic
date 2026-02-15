import { useState } from 'react';
import { 
  Play, 
  Save,
  Plus,
  Zap,
  Link2,
  TestTube,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  label: string;
  icon: string;
}

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'paused';
  trigger: string;
  actions: number;
  lastRun?: string;
}

export function WorkflowsModule() {
  const [workflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Onboarding Automático Cliente Nuevo',
      status: 'active',
      trigger: 'Lead marcado como "Cerrado"',
      actions: 5,
      lastRun: '2026-02-15 10:30'
    },
    {
      id: '2',
      name: 'Seguimiento Post-Cita',
      status: 'active',
      trigger: 'Cita completada en Calendar',
      actions: 3,
      lastRun: '2026-02-14 16:45'
    },
    {
      id: '3',
      name: 'Notificación Hot Lead',
      status: 'active',
      trigger: 'Score > 85',
      actions: 2,
      lastRun: '2026-02-15 09:15'
    },
    {
      id: '4',
      name: 'Sincronización con CRM Externo',
      status: 'draft',
      trigger: 'Nuevo lead creado',
      actions: 4
    }
  ]);

  const [showBuilder, setShowBuilder] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);

  const integrations = [
    { name: 'Salesforce', icon: '☁️', status: 'connected' },
    { name: 'Zapier', icon: '⚡', status: 'available' },
    { name: 'Make (Integromat)', icon: '🔄', status: 'available' },
    { name: 'HubSpot', icon: '🟠', status: 'connected' },
    { name: 'Google Calendar', icon: '📅', status: 'connected' },
    { name: 'WhatsApp Business', icon: '💬', status: 'connected' }
  ];

  const handleSimulateSandbox = () => {
    toast.loading('Simulando workflow...', { duration: 2000 });
    setTimeout(() => {
      toast.success('✓ Simulación completada sin errores');
    }, 2000);
  };

  const handleAutomateOnboarding = () => {
    toast.success('Secuencia de onboarding creada. Se enviará al cerrar un lead.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows & Automation</h1>
          <p className="text-gray-600 mt-1">Constructor No-Code de Flujos</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showBuilder} onOpenChange={setShowBuilder}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Constructor de Workflow</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="bg-gray-50 border-2 border-dashed rounded-lg p-8 min-h-96">
                  <div className="space-y-4">
                    {/* Workflow Visual Builder */}
                    <div className="flex items-center gap-4">
                      <Card className="w-48 bg-green-50 border-green-200">
                        <CardContent className="p-4 text-center">
                          <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-xs text-gray-600 mt-1">Lead Score &gt; 80</p>
                        </CardContent>
                      </Card>
                      
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                      
                      <Card className="w-48 bg-blue-50 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <p className="text-sm font-medium">Acción</p>
                          <p className="text-xs text-gray-600 mt-1">Enviar WhatsApp</p>
                        </CardContent>
                      </Card>
                      
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                      
                      <Card className="w-48 bg-purple-50 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <p className="text-sm font-medium">Acción</p>
                          <p className="text-xs text-gray-600 mt-1">Notificar Admin</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSimulateSandbox} variant="outline" className="gap-2">
                    <TestTube className="w-4 h-4" />
                    Simular Sandbox
                  </Button>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Workflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showIntegrations} onOpenChange={setShowIntegrations}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Link2 className="w-4 h-4" />
                Integraciones
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Centro de Integraciones</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {integrations.map(integration => (
                  <Card key={integration.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{integration.icon}</span>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <Badge 
                              variant={integration.status === 'connected' ? 'default' : 'secondary'}
                              className={integration.status === 'connected' ? 'bg-green-500' : ''}
                            >
                              {integration.status === 'connected' ? 'Conectado' : 'Disponible'}
                            </Badge>
                          </div>
                        </div>
                        {integration.status === 'available' && (
                          <Button 
                            size="sm"
                            onClick={() => toast.success(`Conectado con ${integration.name}`)}
                          >
                            Conectar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleAutomateOnboarding}
            className="bg-purple-600 hover:bg-purple-700 gap-2"
          >
            <Zap className="w-4 h-4" />
            Automatizar Onboarding
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Workflows Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {workflows.filter(w => w.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ejecuciones Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tiempo Ahorrado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">12.5h</div>
            <p className="text-xs text-gray-500 mt-1">Esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tasa de Éxito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">98.5%</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Tus Workflows</h2>
        <div className="grid grid-cols-2 gap-4">
          {workflows.map(workflow => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={
                          workflow.status === 'active' ? 'default' : 
                          workflow.status === 'draft' ? 'secondary' : 
                          'outline'
                        }
                        className={workflow.status === 'active' ? 'bg-green-500' : ''}
                      >
                        {workflow.status === 'active' ? 'Activo' : 
                         workflow.status === 'draft' ? 'Borrador' : 
                         'Pausado'}
                      </Badge>
                    </div>
                  </div>
                  {workflow.status === 'active' && (
                    <Play className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Trigger</p>
                      <p className="text-sm font-medium">{workflow.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{workflow.actions} acciones configuradas</span>
                  </div>
                  {workflow.lastRun && (
                    <div className="pt-3 border-t text-xs text-gray-500">
                      Última ejecución: {workflow.lastRun}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
