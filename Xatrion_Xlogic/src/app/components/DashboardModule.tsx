import { useState } from 'react';
import { 
  TrendingUp, 
  Clock,
  Flame,
  Users,
  ArrowRight,
  HelpCircle,
  Zap,
  Phone,
  MessageSquare,
  Target as TargetIcon,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

export function DashboardModule() {
  const [showCalculation, setShowCalculation] = useState(false);

  const handleOptimizeFunnel = () => {
    toast.success('IA está analizando el embudo y generando sugerencias...');
  };

  const handleActivateReactivation = (customerId: string) => {
    toast.success('Campaña de reactivación activada');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Centro de Mando</h1>
        <p className="text-gray-600 mt-1">Vista ROI inmediato</p>
      </div>

      {/* KPIs Superiores */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Ingresos Detectados Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-3">€24,350</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => toast.info('Mostrando conversaciones con intención de compra alta')}
            >
              Ver Conversaciones
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Tasa Resolución Automática
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-3">87%</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => toast.info('Mostrando tickets escalados a humano')}
            >
              Ver Tickets Escalados
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Horas Hombre Ahorradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-3">142h</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => setShowCalculation(true)}
            >
              <HelpCircle className="w-3 h-3 mr-1" />
              Ver Cálculo Detallado
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Leads Calificados Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-3">23</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => toast.info('Redirigiendo a CRM etapa Caliente')}
            >
              Ir a CRM Caliente
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Embudo Central Visual */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Embudo de Conversión en Tiempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Funnel Steps */}
            <div className="flex items-center justify-between">
              {[
                { label: 'Tráfico', value: 1250, color: 'bg-gray-400' },
                { label: 'Conversaciones', value: 856, color: 'bg-blue-500', conversion: '68%' },
                { label: 'Leads', value: 342, color: 'bg-purple-500', conversion: '40%' },
                { label: 'Citas', value: 89, color: 'bg-orange-500', conversion: '26%' },
                { label: 'Ventas', value: 23, color: 'bg-green-500', conversion: '26%' }
              ].map((step, idx) => (
                <div key={idx} className="flex-1 group relative">
                  <div className="text-center">
                    <div className={`${step.color} rounded-lg p-6 relative overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-xl`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                      <div className="relative">
                        <div className="text-3xl font-bold text-white mb-1">{step.value}</div>
                        <div className="text-sm text-white/90 font-medium">{step.label}</div>
                        {step.conversion && (
                          <Badge className="mt-2 bg-white/20 text-white">
                            {step.conversion}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-900 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      <p className="text-xs font-medium mb-1">vs Semana Pasada</p>
                      <p className="text-sm text-green-400">↑ +12%</p>
                    </div>
                  </div>
                  {idx < 4 && (
                    <ArrowRight className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 text-gray-300 z-10" />
                  )}
                </div>
              ))}
            </div>

            {/* Optimize Button */}
            <div className="text-center pt-4 border-t">
              <Button 
                onClick={handleOptimizeFunnel}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 gap-2"
              >
                <Zap className="w-4 h-4" />
                Optimizar Embudo con IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Retención */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alertas de Retención</CardTitle>
            <Badge variant="destructive">3 en riesgo</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: '1', name: 'Empresa ABC S.L.', status: 'critical', days: 62, color: 'border-l-red-500' },
              { id: '2', name: 'Inmobiliaria XYZ', status: 'warning', days: 26, color: 'border-l-yellow-500' },
              { id: '3', name: 'Constructora DEF', status: 'good', days: 8, color: 'border-l-green-500' }
            ].map(client => (
              <div 
                key={client.id}
                className={`border-l-4 ${client.color} bg-white p-4 rounded-r-lg flex items-center justify-between hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.days} días sin interacción</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {client.status === 'critical' && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      En riesgo
                    </Badge>
                  )}
                  {client.status === 'warning' && (
                    <Badge className="bg-yellow-500 gap-1">
                      <Clock className="w-3 h-3" />
                      Inactivo
                    </Badge>
                  )}
                  {client.status === 'good' && (
                    <Badge className="bg-green-500 gap-1">
                      Activo
                    </Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant={client.status === 'critical' ? 'default' : 'outline'}
                    onClick={() => handleActivateReactivation(client.id)}
                    className="gap-1"
                  >
                    <TargetIcon className="w-3 h-3" />
                    Activar Campaña
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-4">
        <button className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all group text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="font-bold">Llamada IA</p>
              <p className="text-sm text-gray-500">156 completadas hoy</p>
            </div>
          </div>
        </button>

        <button className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-bold">Inbox Activo</p>
              <p className="text-sm text-gray-500">23 conversaciones abiertas</p>
            </div>
          </div>
        </button>

        <button className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all group text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-bold">Workflows</p>
              <p className="text-sm text-gray-500">8 activos, 247 ejecuciones</p>
            </div>
          </div>
        </button>
      </div>

      {/* Modal Cálculo Detallado */}
      <Dialog open={showCalculation} onOpenChange={setShowCalculation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cálculo de Horas Ahorradas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">Fórmula:</p>
              <code className="text-xs bg-white p-3 rounded block">
                (Conversaciones IA × Tiempo Promedio) / 60
              </code>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conversaciones gestionadas por IA:</span>
                <span className="font-semibold">856</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tiempo promedio por conversación:</span>
                <span className="font-semibold">10 min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Costo hora agente:</span>
                <span className="font-semibold">€15</span>
              </div>
              <div className="pt-3 border-t flex justify-between">
                <span className="font-bold">Total ahorrado:</span>
                <span className="font-bold text-green-600">€2,130</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
