import { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  Flame, 
  Filter,
  Plus,
  User,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  source: string;
  lastContact?: string;
}

export function RevenueModule() {
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'María González',
      email: 'maria@example.com',
      phone: '+34 612 345 678',
      score: 92,
      status: 'qualified',
      source: 'Instagram Ads',
      lastContact: '2026-02-14'
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      phone: '+34 623 456 789',
      score: 85,
      status: 'contacted',
      source: 'WhatsApp Direct',
      lastContact: '2026-02-13'
    },
    {
      id: '3',
      name: 'Ana López',
      email: 'ana@example.com',
      phone: '+34 634 567 890',
      score: 78,
      status: 'new',
      source: 'Facebook Comments',
    },
    {
      id: '4',
      name: 'Pedro Martínez',
      email: 'pedro@example.com',
      phone: '+34 645 678 901',
      score: 95,
      status: 'proposal',
      source: 'Google Ads',
      lastContact: '2026-02-15'
    }
  ]);

  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [filterHotLeads, setFilterHotLeads] = useState(false);

  const handleScheduleAICall = (voice: string, script: string) => {
    toast.success(`Llamada IA programada con voz ${voice} y script ${script}`);
    setShowCallDialog(false);
  };

  const handleScheduleAppointment = (leadId: string, date: string) => {
    toast.success('Cita agendada. Confirmación enviada por WhatsApp.');
    setShowAppointmentDialog(false);
  };

  const filteredLeads = filterHotLeads 
    ? leads.filter(lead => lead.score > 80)
    : leads;

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500',
      contacted: 'bg-yellow-500',
      qualified: 'bg-purple-500',
      proposal: 'bg-orange-500',
      closed: 'bg-green-500'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Engine</h1>
          <p className="text-gray-600 mt-1">CRM Predictivo & Gestión de Leads</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterHotLeads ? "default" : "outline"}
            onClick={() => setFilterHotLeads(!filterHotLeads)}
            className="gap-2"
          >
            <Flame className="w-4 h-4" />
            Ver Leads Calientes (Score &gt; 80)
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leads.length}</div>
            <p className="text-xs text-gray-500 mt-1">+12% desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {leads.filter(l => l.score > 80).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Score &gt; 80</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">23%</div>
            <p className="text-xs text-gray-500 mt-1">+5% este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Llamadas IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-xs text-gray-500 mt-1">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 gap-2">
              <Phone className="w-4 h-4" />
              Programar Llamada IA
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar Llamada con IA</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Selecciona Script</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un script..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ventas">Script de Ventas</SelectItem>
                    <SelectItem value="seguimiento">Script de Seguimiento</SelectItem>
                    <SelectItem value="reactivacion">Script de Reactivación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Selecciona Voz (ElevenLabs)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige una voz..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sophia">Sophia - Femenina profesional</SelectItem>
                    <SelectItem value="alex">Alex - Masculino confiado</SelectItem>
                    <SelectItem value="maria">María - Femenina cálida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => handleScheduleAICall('Sophia', 'Ventas')}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Disparar Llamada
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Agendar Cita Manual
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Cita</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Selecciona Lead</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un lead..." />
                  </SelectTrigger>
                  <SelectContent>
                    {leads.map(lead => (
                      <SelectItem key={lead.id} value={lead.id}>
                        {lead.name} - Score: {lead.score}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Fecha y Hora</label>
                <input 
                  type="datetime-local" 
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <Button 
                onClick={() => handleScheduleAppointment('1', '2026-02-16')}
                className="w-full"
              >
                Confirmar Cita
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Se enviará confirmación automática por WhatsApp con link de cancelación/reprogramación
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leads Kanban */}
      <div className="grid grid-cols-5 gap-4">
        {['new', 'contacted', 'qualified', 'proposal', 'closed'].map(status => (
          <div key={status} className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-sm capitalize">{status}</h3>
              <Badge variant="secondary">
                {filteredLeads.filter(l => l.status === status).length}
              </Badge>
            </div>
            <div className="space-y-2">
              {filteredLeads
                .filter(lead => lead.status === status)
                .map(lead => (
                  <Card key={lead.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.source}</p>
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            lead.score > 80 ? 'bg-red-500' : 
                            lead.score > 60 ? 'bg-orange-500' : 
                            'bg-gray-500'
                          }`}
                        >
                          {lead.score}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                      {lead.lastContact && (
                        <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                          Último contacto: {lead.lastContact}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
