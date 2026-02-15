import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  status: 'nuevo' | 'contactado' | 'caliente' | 'agendado' | 'cerrado' | 'perdido';
  source: string;
  budget: string;
  aiSummary: string[];
}

interface DraggableLeadCardProps {
  lead: Lead;
  onView: (lead: Lead) => void;
}

const DraggableLeadCard = ({ lead, onView }: DraggableLeadCardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'lead',
    item: { id: lead.id, status: lead.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="hover:shadow-lg transition-all cursor-move mb-3">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {lead.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.source}</p>
              </div>
            </div>
            <Badge
              className={`${
                lead.score > 80
                  ? 'bg-red-500'
                  : lead.score > 60
                  ? 'bg-orange-500'
                  : 'bg-gray-500'
              }`}
            >
              {lead.score}
            </Badge>
          </div>

          <div className="space-y-1 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{lead.budget}</span>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => toast.info('Abriendo conversación...')}
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => onView(lead)}
            >
              <Eye className="w-3 h-3 mr-1" />
              Ver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface DropZoneProps {
  status: string;
  children: React.ReactNode;
  onDrop: (leadId: string, newStatus: string) => void;
}

const DropZone = ({ status, children, onDrop }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'lead',
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`min-h-[600px] p-3 rounded-lg transition-all ${
        isOver ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50'
      }`}
    >
      {children}
    </div>
  );
};

export function CRMModule() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'María González',
      email: 'maria@example.com',
      phone: '+34 612 345 678',
      score: 92,
      status: 'caliente',
      source: 'Instagram Ads',
      budget: '€180K - €220K',
      aiSummary: [
        'Busca departamento 2 habitaciones en zona centro',
        'Presupuesto confirmado, tiene financiamiento pre-aprobado',
        'Urgencia alta - Necesita mudarse en 2 meses'
      ]
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      phone: '+34 623 456 789',
      score: 85,
      status: 'contactado',
      source: 'WhatsApp Direct',
      budget: '€150K - €180K',
      aiSummary: [
        'Interesado en inversión inmobiliaria',
        'Primer contacto positivo',
        'Solicita información sobre rentabilidad'
      ]
    },
    {
      id: '3',
      name: 'Ana López',
      email: 'ana@example.com',
      phone: '+34 634 567 890',
      score: 78,
      status: 'agendado',
      source: 'Facebook Comments',
      budget: '€150K - €180K',
      aiSummary: [
        'Cita programada para mañana 15:00',
        'Interesada en ver 3 propiedades',
        'Acompaña con su pareja'
      ]
    },
    {
      id: '4',
      name: 'Pedro Martínez',
      email: 'pedro@example.com',
      phone: '+34 645 678 901',
      score: 95,
      status: 'nuevo',
      source: 'Google Ads',
      budget: '€200K - €250K',
      aiSummary: [
        'Lead nuevo - Score muy alto',
        'Busca casa con jardín',
        'Presupuesto alto confirmado'
      ]
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleDrop = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus as Lead['status'] } : lead
      )
    );
    toast.success(`Lead movido a ${newStatus}. Workflow automático activado.`);
  };

  const statusColumns = [
    { id: 'nuevo', label: 'Nuevo', color: 'bg-blue-500' },
    { id: 'contactado', label: 'Contactado', color: 'bg-purple-500' },
    { id: 'caliente', label: 'Caliente', color: 'bg-red-500' },
    { id: 'agendado', label: 'Agendado', color: 'bg-orange-500' },
    { id: 'cerrado', label: 'Cerrado', color: 'bg-green-500' },
    { id: 'perdido', label: 'Perdido', color: 'bg-gray-500' }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 space-y-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CRM & Leads</h1>
            <p className="text-gray-600 mt-1">Pipeline de Ventas Drag & Drop</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Zap className="w-4 h-4" />
              Workflows Activos
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 gap-3">
          {statusColumns.map((col) => (
            <Card key={col.id}>
              <CardContent className="p-4">
                <div className={`w-3 h-3 ${col.color} rounded-full mb-2`} />
                <p className="text-2xl font-bold">
                  {leads.filter((l) => l.status === col.id).length}
                </p>
                <p className="text-xs text-gray-600">{col.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-6 gap-4">
          {statusColumns.map((column) => (
            <div key={column.id}>
              <div className="mb-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm capitalize">{column.label}</h3>
                  <Badge variant="secondary">
                    {leads.filter((l) => l.status === column.id).length}
                  </Badge>
                </div>
              </div>

              <DropZone status={column.id} onDrop={handleDrop}>
                {leads
                  .filter((lead) => lead.status === column.id)
                  .map((lead) => (
                    <DraggableLeadCard
                      key={lead.id}
                      lead={lead}
                      onView={(l) => setSelectedLead(l)}
                    />
                  ))}
              </DropZone>
            </div>
          ))}
        </div>

        {/* Lead Detail Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            {selectedLead && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedLead.name.charAt(0)}
                    </div>
                    <div>
                      <p>{selectedLead.name}</p>
                      <p className="text-sm font-normal text-gray-600">
                        Score: {selectedLead.score} • {selectedLead.source}
                      </p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Email</label>
                      <p className="text-sm font-medium">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Teléfono</label>
                      <p className="text-sm font-medium">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Presupuesto</label>
                      <p className="text-sm font-medium">{selectedLead.budget}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Estado</label>
                      <Badge className="capitalize">{selectedLead.status}</Badge>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div>
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      Historial IA Resumido
                    </h4>
                    <ul className="space-y-2">
                      {selectedLead.aiSummary.map((summary, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-red-500">•</span>
                          <span>{summary}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-4 gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => toast.success('Iniciando conversación...')}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => toast.success('Programando llamada IA...')}
                    >
                      <Phone className="w-4 h-4" />
                      Llamada IA
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => toast.success('Mensaje enviado por WhatsApp')}
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => toast.success('Secuencia de seguimiento activada')}
                    >
                      <Calendar className="w-4 h-4" />
                      Seguimiento
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}
