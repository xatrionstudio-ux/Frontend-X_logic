import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function AnalyticsModule() {
  // Conversaciones por canal
  const channelData = [
    { name: 'WhatsApp', value: 45, color: '#25D366' },
    { name: 'Instagram', value: 32, color: '#E4405F' },
    { name: 'Facebook', value: 18, color: '#1877F2' },
    { name: 'Email', value: 5, color: '#EA4335' }
  ];

  // Conversión por agente
  const agentData = [
    { name: 'IA Bot', conversaciones: 856, convertidas: 187 },
    { name: 'Juan P.', conversaciones: 234, convertidas: 45 },
    { name: 'María G.', conversaciones: 189, convertidas: 52 },
    { name: 'Carlos R.', conversaciones: 156, convertidas: 38 }
  ];

  // Eficiencia IA vs Humano
  const efficiencyData = [
    { hora: '08:00', ia: 12, humano: 4 },
    { hora: '10:00', ia: 25, humano: 8 },
    { hora: '12:00', ia: 32, humano: 12 },
    { hora: '14:00', ia: 28, humano: 10 },
    { hora: '16:00', ia: 35, humano: 15 },
    { hora: '18:00', ia: 30, humano: 18 },
    { hora: '20:00', ia: 18, humano: 6 }
  ];

  // Horarios de mayor intención
  const intentionData = [
    { hora: '09:00', intención: 65 },
    { hora: '11:00', intención: 78 },
    { hora: '13:00', intención: 45 },
    { hora: '15:00', intención: 82 },
    { hora: '17:00', intención: 92 },
    { hora: '19:00', intención: 75 },
    { hora: '21:00', intención: 38 }
  ];

  // Mapa de leads (simulado)
  const locationData = [
    { ciudad: 'Madrid', leads: 145, conversion: 23 },
    { ciudad: 'Barcelona', leads: 132, conversion: 28 },
    { ciudad: 'Valencia', leads: 89, conversion: 19 },
    { ciudad: 'Sevilla', leads: 67, conversion: 15 },
    { ciudad: 'Bilbao', leads: 54, conversion: 12 }
  ];

  const handleExportPDF = () => {
    toast.success('Generando PDF ejecutivo...');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analítica Avanzada</h1>
          <p className="text-gray-600 mt-1">Visualización de datos en tiempo real</p>
        </div>
        <Button onClick={handleExportPDF} className="gap-2 bg-red-600 hover:bg-red-700">
          <Download className="w-4 h-4" />
          Exportar PDF Ejecutivo
        </Button>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Conversaciones por canal */}
        <Card>
          <CardHeader>
            <CardTitle>Conversaciones por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversión por agente */}
        <Card>
          <CardHeader>
            <CardTitle>Conversión por Agente</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversaciones" fill="#3b82f6" name="Conversaciones" />
                <Bar dataKey="convertidas" fill="#22c55e" name="Convertidas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Eficiencia IA vs Humano */}
        <Card>
          <CardHeader>
            <CardTitle>Eficiencia IA vs Humano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ia" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="IA"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="humano" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Humano"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Horarios de mayor intención */}
        <Card>
          <CardHeader>
            <CardTitle>Horarios de Mayor Intención de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={intentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="intención" fill="#8b5cf6" name="Score Intención" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa Geográfico de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((loc, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32 font-medium">{loc.ciudad}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-end pr-3 text-white text-sm font-bold"
                        style={{ width: `${(loc.leads / 145) * 100}%` }}
                      >
                        {loc.leads} leads
                      </div>
                    </div>
                    <div className="w-24 text-sm text-gray-600">
                      {loc.conversion}% conv.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Conversaciones Totales</p>
            <p className="text-3xl font-bold">1,435</p>
            <p className="text-xs text-green-600 mt-1">↑ +18% vs semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Tiempo Respuesta Promedio</p>
            <p className="text-3xl font-bold text-blue-600">2.3s</p>
            <p className="text-xs text-green-600 mt-1">↓ -0.5s mejora</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Satisfacción Cliente</p>
            <p className="text-3xl font-bold text-purple-600">4.6/5</p>
            <p className="text-xs text-green-600 mt-1">↑ +0.3 puntos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">ROI Mensual</p>
            <p className="text-3xl font-bold text-green-600">347%</p>
            <p className="text-xs text-green-600 mt-1">↑ +23% este mes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
