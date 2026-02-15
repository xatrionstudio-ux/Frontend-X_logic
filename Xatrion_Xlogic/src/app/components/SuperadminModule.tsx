import { 
  Eye, 
  Activity, 
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Database
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface ClientUsage {
  id: string;
  companyName: string;
  plan: 'starter' | 'pro' | 'enterprise';
  messagesUsed: number;
  messagesLimit: number;
  voiceMinutes: number;
  voiceLimit: number;
  lastActivity: string;
  health: 'good' | 'warning' | 'critical';
}

export function SuperadminModule() {
  const clients: ClientUsage[] = [
    {
      id: '1',
      companyName: 'Inmobiliaria Premium S.L.',
      plan: 'enterprise',
      messagesUsed: 12450,
      messagesLimit: 50000,
      voiceMinutes: 320,
      voiceLimit: 1000,
      lastActivity: '2026-02-15 11:45',
      health: 'good'
    },
    {
      id: '2',
      companyName: 'Propiedades Modernas',
      plan: 'pro',
      messagesUsed: 8900,
      messagesLimit: 10000,
      voiceMinutes: 180,
      voiceLimit: 500,
      lastActivity: '2026-02-14 18:30',
      health: 'warning'
    },
    {
      id: '3',
      companyName: 'Casas del Sol',
      plan: 'starter',
      messagesUsed: 4800,
      messagesLimit: 5000,
      voiceMinutes: 95,
      voiceLimit: 100,
      lastActivity: '2026-02-10 09:15',
      health: 'critical'
    }
  ];

  const handleShadowLogin = (companyId: string, companyName: string) => {
    toast.info(`Accediendo al dashboard de ${companyName}...`);
  };

  const handleAdjustLimit = (companyId: string) => {
    toast.success('Límite ajustado correctamente');
  };

  const handleExportBenchmark = () => {
    toast.success('Exportando análisis comparativo de todas las inmobiliarias...');
  };

  const getHealthColor = (health: string) => {
    return health === 'good' ? 'text-green-600' : 
           health === 'warning' ? 'text-orange-600' : 
           'text-red-600';
  };

  const getHealthBadge = (health: string) => {
    const config = {
      good: { label: 'Saludable', color: 'bg-green-500' },
      warning: { label: 'Atención', color: 'bg-orange-500' },
      critical: { label: 'Crítico', color: 'bg-red-500' }
    };
    const { label, color } = config[health as keyof typeof config];
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Superadmin Panel</h1>
          <p className="text-gray-400 mt-1">Control SaaS & Gestión de Clientes</p>
          <Badge variant="destructive" className="mt-2">Acceso Restringido</Badge>
        </div>
        <Button 
          onClick={handleExportBenchmark}
          className="gap-2 bg-red-600 hover:bg-red-700"
        >
          <TrendingUp className="w-4 h-4" />
          Exportar Benchmark
        </Button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Clientes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{clients.length}</div>
            <p className="text-xs text-gray-500 mt-1">+2 este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">MRR Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">€45.2K</div>
            <p className="text-xs text-gray-500 mt-1">+12% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Consumo IA Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">26.1K</div>
            <p className="text-xs text-gray-500 mt-1">Mensajes procesados hoy</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Minutos de Voz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">595</div>
            <p className="text-xs text-gray-500 mt-1">Llamadas IA esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Monitor */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Health Monitor de Clientes</h2>
        <div className="space-y-4">
          {clients.map(client => (
            <Card key={client.id} className="bg-gray-900 border-gray-800 hover:bg-gray-850 transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {client.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{client.companyName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="capitalize border-gray-700 text-gray-300">
                            Plan {client.plan}
                          </Badge>
                          {getHealthBadge(client.health)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShadowLogin(client.id, client.companyName)}
                        className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Eye className="w-4 h-4" />
                        Shadow Login
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustLimit(client.id)}
                        className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Settings className="w-4 h-4" />
                        Ajustar Límite
                      </Button>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Messages */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">
                          Mensajes IA
                        </span>
                        <span className="text-sm font-bold text-white">
                          {client.messagesUsed.toLocaleString()} / {client.messagesLimit.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={(client.messagesUsed / client.messagesLimit) * 100} 
                        className="h-2 bg-gray-800"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((client.messagesUsed / client.messagesLimit) * 100)}% utilizado
                      </p>
                    </div>

                    {/* Voice Minutes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">
                          Minutos de Voz
                        </span>
                        <span className="text-sm font-bold text-white">
                          {client.voiceMinutes} / {client.voiceLimit}
                        </span>
                      </div>
                      <Progress 
                        value={(client.voiceMinutes / client.voiceLimit) * 100} 
                        className="h-2 bg-gray-800"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((client.voiceMinutes / client.voiceLimit) * 100)}% utilizado
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Activity className={`w-4 h-4 ${getHealthColor(client.health)}`} />
                      <span>Última actividad: {client.lastActivity}</span>
                    </div>
                    {client.health === 'critical' && (
                      <Badge variant="destructive" className="gap-1">
                        <Database className="w-3 h-3" />
                        Cerca del límite
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Analytics */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Análisis Global del Mercado</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Tasa de Conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500 mb-2">18.5%</div>
              <p className="text-sm text-gray-400">Promedio en inmobiliarias</p>
              <div className="mt-3 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Mejor:</span>
                  <span className="font-semibold text-gray-300">23.2%</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Peor:</span>
                  <span className="font-semibold text-gray-300">12.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Tiempo de Respuesta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-400 mb-2">2.3s</div>
              <p className="text-sm text-gray-400">Promedio de respuesta IA</p>
              <div className="mt-3 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Más rápido:</span>
                  <span className="font-semibold text-gray-300">1.1s</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Más lento:</span>
                  <span className="font-semibold text-gray-300">4.5s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Satisfacción Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-400 mb-2">4.6/5</div>
              <p className="text-sm text-gray-400">Rating promedio</p>
              <div className="mt-3 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Mejor:</span>
                  <span className="font-semibold text-gray-300">4.9/5</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Peor:</span>
                  <span className="font-semibold text-gray-300">3.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}