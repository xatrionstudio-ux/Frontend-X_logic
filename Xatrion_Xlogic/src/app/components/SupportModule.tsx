import { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Volume2,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Instagram,
  Facebook,
  UserCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'agent';
  text: string;
  timestamp: string;
  sentiment?: 'happy' | 'angry' | 'confused' | 'neutral';
}

interface Conversation {
  id: string;
  customerName: string;
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'email';
  status: 'ai-active' | 'human-control' | 'resolved';
  language: string;
  source: string;
  messages: Message[];
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  time: string;
  event: string;
  type: 'info' | 'success' | 'warning';
}

export function SupportModule() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      customerName: 'Laura Fernández',
      channel: 'whatsapp',
      status: 'ai-active',
      language: 'Español',
      source: 'Instagram DM - Black Friday Ads',
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'Hola, vi su anuncio sobre propiedades',
          timestamp: '09:00',
          sentiment: 'neutral'
        },
        {
          id: 'm2',
          sender: 'ai',
          text: '¡Hola Laura! Encantado de ayudarte. ¿Qué tipo de propiedad estás buscando?',
          timestamp: '09:01',
        },
        {
          id: 'm3',
          sender: 'customer',
          text: 'Busco un apartamento de 2 habitaciones en el centro',
          timestamp: '09:02',
          sentiment: 'happy'
        }
      ],
      timeline: [
        { time: '09:00', event: 'Lead entró por Instagram DM', type: 'info' },
        { time: '09:01', event: 'IA clasificó como "Duda de Precio"', type: 'info' },
        { time: '09:05', event: 'IA agendó cita en Google Calendar', type: 'success' },
        { time: '09:06', event: 'Notificación enviada al Admin humano', type: 'success' }
      ]
    },
    {
      id: '2',
      customerName: 'Roberto Silva',
      channel: 'instagram',
      status: 'human-control',
      language: 'Español',
      source: 'Instagram Comments - Post Orgánico',
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'No estoy conforme con el servicio',
          timestamp: '08:45',
          sentiment: 'angry'
        },
        {
          id: 'm2',
          sender: 'ai',
          text: 'Lamento que no estés satisfecho. ¿Podrías contarme más sobre lo sucedido?',
          timestamp: '08:46',
        },
        {
          id: 'm3',
          sender: 'agent',
          text: 'Hola Roberto, soy María del equipo de soporte. Voy a revisar tu caso personalmente.',
          timestamp: '08:50',
        }
      ],
      timeline: [
        { time: '08:45', event: 'Cliente expresó insatisfacción', type: 'warning' },
        { time: '08:46', event: 'IA detectó sentimiento negativo', type: 'warning' },
        { time: '08:50', event: 'Agente humano tomó control', type: 'info' }
      ]
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<string>(conversations[0].id);
  const [controlledBy, setControlledBy] = useState<'ai' | 'human'>('ai');

  const currentConversation = conversations.find(c => c.id === activeConversation);

  const handleTakeControl = () => {
    setControlledBy('human');
    toast.success('Control tomado. IA pausada para esta conversación.');
  };

  const handleReturnToAI = () => {
    setControlledBy('ai');
    toast.success('Control devuelto a IA. El bot continuará la conversación.');
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: '🟢',
      instagram: '📷',
      facebook: '📘',
      email: '✉️'
    };
    return icons[channel as keyof typeof icons] || '💬';
  };

  const getSentimentBadge = (sentiment?: string) => {
    if (!sentiment) return null;
    
    const config = {
      happy: { label: 'Feliz', color: 'bg-green-500' },
      angry: { label: 'Enojado', color: 'bg-red-500' },
      confused: { label: 'Confuso', color: 'bg-yellow-500' },
      neutral: { label: 'Neutral', color: 'bg-gray-500' }
    };
    
    const { label, color } = config[sentiment as keyof typeof config];
    
    return (
      <Badge className={`${color} text-white text-xs`}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Inbox Unificado</h2>
          <p className="text-sm text-gray-600 mt-1">Soporte Omnicanal</p>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeConversation === conv.id 
                    ? 'bg-red-50 border border-red-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getChannelIcon(conv.channel)}</span>
                    <div>
                      <p className="font-medium text-sm">{conv.customerName}</p>
                      <p className="text-xs text-gray-500">{conv.language}</p>
                    </div>
                  </div>
                  {conv.status === 'human-control' && (
                    <Badge variant="destructive" className="text-xs">
                      <UserCheck className="w-3 h-3 mr-1" />
                      Humano
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {conv.messages[conv.messages.length - 1].text}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {conv.messages[conv.messages.length - 1].timestamp}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Conversation Area */}
      {currentConversation && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getChannelIcon(currentConversation.channel)}</span>
                  <div>
                    <h3 className="font-bold text-lg">{currentConversation.customerName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline">{currentConversation.channel.toUpperCase()}</Badge>
                      <span>•</span>
                      <span>{currentConversation.language}</span>
                      <span>•</span>
                      <Badge variant="secondary">Ventas_Bot_V2</Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-xs text-blue-600 p-0 h-auto"
                  onClick={() => toast.info(`Origen: ${currentConversation.source}`)}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Ver Fuente de Origen
                </Button>
              </div>
              
              <div className="flex gap-2">
                {controlledBy === 'ai' ? (
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
                    <CheckCircle className="w-4 h-4" />
                    Devolver a IA
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Messages + Timeline */}
          <div className="flex-1 flex">
            {/* Messages */}
            <div className="flex-1 flex flex-col">
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
                            ? 'bg-blue-500 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">
                            {msg.sender === 'customer' 
                              ? currentConversation.customerName 
                              : msg.sender === 'ai' 
                              ? '🤖 IA' 
                              : '👤 Agente'}
                          </span>
                          <span className="text-xs opacity-75">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                        {msg.sentiment && (
                          <div className="mt-2 flex items-center gap-2">
                            <Volume2 className="w-3 h-3" />
                            {getSentimentBadge(msg.sentiment)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={
                      controlledBy === 'ai' 
                        ? 'IA está manejando esta conversación...' 
                        : 'Escribe tu mensaje...'
                    }
                    disabled={controlledBy === 'ai'}
                    className="flex-1 px-4 py-2 border rounded-lg disabled:bg-gray-100"
                  />
                  <Button disabled={controlledBy === 'ai'}>
                    Enviar
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline Sidebar */}
            <div className="w-80 bg-white border-l p-4">
              <h3 className="font-bold mb-4">Línea de Tiempo del Evento</h3>
              <div className="space-y-4">
                {currentConversation.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.type === 'success' ? 'bg-green-100' :
                        event.type === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {event.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                         event.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                         <Clock className="w-4 h-4 text-blue-600" />}
                      </div>
                      {idx < currentConversation.timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">[{event.time}]</p>
                      <p className="text-sm font-medium">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
