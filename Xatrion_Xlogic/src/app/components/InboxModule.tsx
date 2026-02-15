import { useState } from 'react';
import { 
  MessageSquare,
  Phone,
  Globe,
  Bot,
  User,
  RefreshCw,
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'agent';
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  customerName: string;
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'voice';
  status: 'ai-active' | 'human-control';
  aiTag: 'hot-lead' | 'support' | 'appointment';
  score: number;
  language: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
  crmData: {
    name: string;
    phone: string;
    email: string;
    budget: string;
    service: string;
    urgency: string;
    closeProbability: number;
  };
}

export function InboxModule() {
  const [activeChannel, setActiveChannel] = useState<string>('all');
  const [priorityMode, setPriorityMode] = useState(false);
  const [controlMode, setControlMode] = useState<'ai' | 'human'>('ai');
  const [selectedConversation, setSelectedConversation] = useState<string>('1');

  const conversations: Conversation[] = [
    {
      id: '1',
      customerName: 'María González',
      channel: 'whatsapp',
      status: 'ai-active',
      aiTag: 'hot-lead',
      score: 92,
      language: 'Español',
      lastMessage: 'Me interesa el departamento de 2 habitaciones',
      timestamp: '11:45',
      messages: [
        { id: 'm1', sender: 'customer', text: 'Hola, vi su anuncio', timestamp: '11:40' },
        { id: 'm2', sender: 'ai', text: '¡Hola María! Encantado de ayudarte. ¿Qué tipo de propiedad buscas?', timestamp: '11:41' },
        { id: 'm3', sender: 'customer', text: 'Me interesa el departamento de 2 habitaciones', timestamp: '11:45' }
      ],
      crmData: {
        name: 'María González',
        phone: '+34 612 345 678',
        email: 'maria@example.com',
        budget: '€180,000 - €220,000',
        service: 'Compra de vivienda',
        urgency: 'Alta - Busca en 2 meses',
        closeProbability: 85
      }
    },
    {
      id: '2',
      customerName: 'Carlos Ruiz',
      channel: 'instagram',
      status: 'human-control',
      aiTag: 'support',
      score: 45,
      language: 'Español',
      lastMessage: 'Necesito ayuda con el contrato',
      timestamp: '11:30',
      messages: [
        { id: 'm1', sender: 'customer', text: 'Necesito ayuda con el contrato', timestamp: '11:30' },
        { id: 'm2', sender: 'ai', text: 'Claro, ¿en qué puedo ayudarte?', timestamp: '11:31' },
        { id: 'm3', sender: 'agent', text: 'Hola Carlos, soy Juan. Déjame revisar tu caso.', timestamp: '11:35' }
      ],
      crmData: {
        name: 'Carlos Ruiz',
        phone: '+34 623 456 789',
        email: 'carlos@example.com',
        budget: 'No especificado',
        service: 'Soporte post-venta',
        urgency: 'Media',
        closeProbability: 0
      }
    },
    {
      id: '3',
      customerName: 'Ana López',
      channel: 'facebook',
      status: 'ai-active',
      aiTag: 'appointment',
      score: 78,
      language: 'Español',
      lastMessage: 'Sí, mañana a las 3pm está bien',
      timestamp: '10:15',
      messages: [
        { id: 'm1', sender: 'customer', text: '¿Puedo agendar una visita?', timestamp: '10:10' },
        { id: 'm2', sender: 'ai', text: 'Por supuesto. ¿Qué día y hora te viene mejor?', timestamp: '10:12' },
        { id: 'm3', sender: 'customer', text: 'Sí, mañana a las 3pm está bien', timestamp: '10:15' }
      ],
      crmData: {
        name: 'Ana López',
        phone: '+34 634 567 890',
        email: 'ana@example.com',
        budget: '€150,000 - €180,000',
        service: 'Visita programada',
        urgency: 'Media - Visita mañana',
        closeProbability: 65
      }
    }
  ];

  const filteredConversations = conversations
    .filter(conv => activeChannel === 'all' || conv.channel === activeChannel)
    .sort((a, b) => {
      if (priorityMode) {
        return b.score - a.score;
      }
      return 0;
    });

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: '🟢',
      instagram: '📷',
      facebook: '📘',
      voice: '🎤'
    };
    return icons[channel as keyof typeof icons] || '💬';
  };

  const getTagBadge = (tag: string) => {
    const config = {
      'hot-lead': { label: 'Lead Caliente', color: 'bg-red-500', icon: '🔥' },
      'support': { label: 'Soporte', color: 'bg-yellow-500', icon: '🛟' },
      'appointment': { label: 'Cita', color: 'bg-green-500', icon: '📅' }
    };
    const { label, color, icon } = config[tag as keyof typeof config];
    return (
      <Badge className={`${color} text-white text-xs gap-1`}>
        <span>{icon}</span>
        {label}
      </Badge>
    );
  };

  const handleTakeControl = () => {
    setControlMode('human');
    toast.success('Control tomado. IA pausada.');
  };

  const handleReturnToAI = () => {
    setControlMode('ai');
    toast.success('Control devuelto a IA.');
  };

  const handleAICall = () => {
    toast.success('Iniciando llamada IA...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* COLUMNA 1 - Lista de Conversaciones */}
      <div className="w-96 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-3">Inbox Unificado</h2>
          
          {/* Channel Filters */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <Button
              size="sm"
              variant={activeChannel === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveChannel('all')}
            >
              Todos
            </Button>
            <Button
              size="sm"
              variant={activeChannel === 'whatsapp' ? 'default' : 'outline'}
              onClick={() => setActiveChannel('whatsapp')}
            >
              🟢 WhatsApp
            </Button>
            <Button
              size="sm"
              variant={activeChannel === 'instagram' ? 'default' : 'outline'}
              onClick={() => setActiveChannel('instagram')}
            >
              📷 Instagram
            </Button>
            <Button
              size="sm"
              variant={activeChannel === 'facebook' ? 'default' : 'outline'}
              onClick={() => setActiveChannel('facebook')}
            >
              📘 Facebook
            </Button>
            <Button
              size="sm"
              variant={activeChannel === 'voice' ? 'default' : 'outline'}
              onClick={() => setActiveChannel('voice')}
            >
              🎤 Voz
            </Button>
          </div>

          {/* Priority Mode Toggle */}
          <Button
            size="sm"
            variant={priorityMode ? 'default' : 'outline'}
            onClick={() => setPriorityMode(!priorityMode)}
            className="w-full gap-2"
          >
            <Star className="w-4 h-4" />
            {priorityMode ? 'Modo Prioridad IA Activo' : 'Activar Modo Prioridad IA'}
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedConversation === conv.id
                    ? 'bg-red-50 border-2 border-red-200'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getChannelIcon(conv.channel)}</span>
                    <div>
                      <p className="font-medium text-sm">{conv.customerName}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {conv.language}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-red-600 mb-1">
                      Score: {conv.score}
                    </div>
                    {conv.status === 'human-control' && (
                      <Badge variant="destructive" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        Humano
                      </Badge>
                    )}
                  </div>
                </div>
                
                {getTagBadge(conv.aiTag)}
                
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* COLUMNA 2 - Conversación Activa */}
      {currentConversation && (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getChannelIcon(currentConversation.channel)}</span>
                <div>
                  <h3 className="font-bold text-lg">{currentConversation.customerName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline">{currentConversation.channel.toUpperCase()}</Badge>
                    <span>•</span>
                    <span>{currentConversation.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {controlMode === 'ai' ? (
                  <Button
                    onClick={handleTakeControl}
                    className="bg-red-600 hover:bg-red-700 gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    TOMAR CONTROL
                  </Button>
                ) : (
                  <Button
                    onClick={handleReturnToAI}
                    variant="outline"
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Devolver a IA
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <Globe className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleAICall}>
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {getTagBadge(currentConversation.aiTag)}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentConversation.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'customer' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-md rounded-lg p-3 ${
                      msg.sender === 'customer'
                        ? 'bg-gray-100'
                        : msg.sender === 'ai'
                        ? 'bg-blue-500 text-white border-l-4 border-blue-700'
                        : 'bg-red-600 text-white border-l-4 border-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'ai' && <Bot className="w-4 h-4" />}
                      {msg.sender === 'agent' && <User className="w-4 h-4" />}
                      <span className="text-xs font-semibold">
                        {msg.sender === 'customer'
                          ? currentConversation.customerName
                          : msg.sender === 'ai'
                          ? 'IA'
                          : 'Agente Humano'}
                      </span>
                      <span className="text-xs opacity-75">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder={
                  controlMode === 'ai'
                    ? 'IA está manejando esta conversación...'
                    : 'Escribe tu mensaje...'
                }
                disabled={controlMode === 'ai'}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Mic className="w-4 h-4" />
              </Button>
              <Button disabled={controlMode === 'ai'}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* COLUMNA 3 - Copiloto CRM */}
      {currentConversation && (
        <div className="w-80 bg-white border-l">
          <div className="p-4 border-b bg-gradient-to-r from-red-50 to-pink-50">
            <h3 className="font-bold flex items-center gap-2">
              <Bot className="w-5 h-5 text-red-600" />
              Copiloto CRM
            </h3>
            <p className="text-xs text-gray-600 mt-1">Autocompletado en tiempo real</p>
          </div>

          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-4 space-y-4">
              {/* CRM Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Nombre</label>
                  <Input
                    value={currentConversation.crmData.name}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Teléfono</label>
                  <Input
                    value={currentConversation.crmData.phone}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Email</label>
                  <Input
                    value={currentConversation.crmData.email}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Presupuesto Estimado</label>
                  <Input
                    value={currentConversation.crmData.budget}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Servicio de Interés</label>
                  <Input
                    value={currentConversation.crmData.service}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Urgencia Detectada</label>
                  <Input
                    value={currentConversation.crmData.urgency}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">
                    Probabilidad de Cierre
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          currentConversation.crmData.closeProbability > 70
                            ? 'bg-green-500'
                            : currentConversation.crmData.closeProbability > 40
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${currentConversation.crmData.closeProbability}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">
                      {currentConversation.crmData.closeProbability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Próximo Paso Sugerido */}
              <div className="pt-4 border-t">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Próximo Paso Sugerido
                </h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Calendar className="w-4 h-4" />
                    Enviar link de agenda
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <DollarSign className="w-4 h-4" />
                    Ofrecer descuento
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <User className="w-4 h-4" />
                    Escalar a asesor senior
                  </Button>
                </div>
              </div>

              {/* Create Task */}
              <Button className="w-full gap-2 bg-red-600 hover:bg-red-700">
                <Clock className="w-4 h-4" />
                Crear Tarea
              </Button>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
