import { 
  TrendingDown, 
  Send, 
  BarChart3,
  Gift,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface ChurnAlert {
  id: string;
  customerName: string;
  lastInteraction: string;
  daysInactive: number;
  ltv: number;
  risk: 'high' | 'medium' | 'low';
}

export function RetentionModule() {
  const churnAlerts: ChurnAlert[] = [
    {
      id: '1',
      customerName: 'Empresa ABC S.L.',
      lastInteraction: '2025-12-15',
      daysInactive: 62,
      ltv: 12500,
      risk: 'high'
    },
    {
      id: '2',
      customerName: 'Inmobiliaria XYZ',
      lastInteraction: '2026-01-20',
      daysInactive: 26,
      ltv: 8900,
      risk: 'medium'
    },
    {
      id: '3',
      customerName: 'Constructora DEF',
      lastInteraction: '2026-01-05',
      daysInactive: 41,
      ltv: 15200,
      risk: 'high'
    }
  ];

  const handleLaunchReactivation = () => {
    toast.success('Campaña de reactivación lanzada a 3 clientes inactivos');
  };

  const handleAnalyzeSentiment = (customerId: string) => {
    toast.info('Generando análisis de sentimiento histórico...');
  };

  const getRiskColor = (risk: string) => {
    return risk === 'high' ? 'bg-red-500' : 
           risk === 'medium' ? 'bg-orange-500' : 
           'bg-yellow-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Retention Engine</h1>
          <p className="text-gray-600 mt-1">Monitor de Churn & Fidelización</p>
        </div>
        <Button 
          onClick={handleLaunchReactivation}
          className="bg-purple-600 hover:bg-purple-700 gap-2"
        >
          <Send className="w-4 h-4" />
          Lanzar Campaña de Reactivación
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tasa de Retención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">87%</div>
            <p className="text-xs text-gray-500 mt-1">+3% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes en Riesgo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {churnAlerts.filter(c => c.risk === 'high').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Alto riesgo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">LTV Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">€12.2K</div>
            <p className="text-xs text-gray-500 mt-1">Por cliente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">NPS Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">72</div>
            <p className="text-xs text-gray-500 mt-1">Muy positivo</p>
          </CardContent>
        </Card>
      </div>

      {/* Churn Alerts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Alertas de Retención</h2>
        <div className="space-y-3">
          {churnAlerts.map(alert => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.risk === 'high' ? 'text-red-600' : 
                        alert.risk === 'medium' ? 'text-orange-600' : 
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{alert.customerName}</h3>
                        <Badge className={getRiskColor(alert.risk)}>
                          Riesgo {alert.risk === 'high' ? 'Alto' : alert.risk === 'medium' ? 'Medio' : 'Bajo'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.daysInactive} días sin interacción</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-4 h-4" />
                          <span>Última interacción: {alert.lastInteraction}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>LTV: €{alert.ltv.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAnalyzeSentiment(alert.id)}
                      className="gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Analizar Sentimiento Histórico
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => toast.success(`Cupón personalizado generado para ${alert.customerName}`)}
                    >
                      <Gift className="w-4 h-4" />
                      Enviar Cupón
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Campaigns Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Campañas de LTV</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Reactivación 30 días</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviados:</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Abiertos:</span>
                  <span className="font-semibold">32 (71%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Convertidos:</span>
                  <span className="font-semibold text-green-600">12 (27%)</span>
                </div>
                <Badge className="bg-green-500 w-full justify-center">Activa</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Cupón Cumpleaños</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviados:</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Abiertos:</span>
                  <span className="font-semibold">21 (91%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Convertidos:</span>
                  <span className="font-semibold text-green-600">18 (78%)</span>
                </div>
                <Badge className="bg-green-500 w-full justify-center">Activa</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Encuesta NPS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviados:</span>
                  <span className="font-semibold">120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Respuestas:</span>
                  <span className="font-semibold">87 (73%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">NPS Score:</span>
                  <span className="font-semibold text-purple-600">72</span>
                </div>
                <Badge className="bg-green-500 w-full justify-center">Activa</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
