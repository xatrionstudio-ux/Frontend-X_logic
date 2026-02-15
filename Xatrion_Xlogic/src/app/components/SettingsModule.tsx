import { useState } from 'react';
import { 
  User,
  Building2,
  Bell,
  Globe,
  Key,
  CreditCard,
  Users,
  Save,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function SettingsModule() {
  const [settings, setSettings] = useState({
    // Perfil
    companyName: 'Inmobiliaria Premium S.L.',
    adminName: 'Juan Pérez',
    email: 'admin@inmopremium.com',
    phone: '+34 612 345 678',
    
    // Notificaciones
    emailNotifications: true,
    whatsappNotifications: true,
    hotLeadAlerts: true,
    dailyReport: true,
    
    // IA
    autoResponse: true,
    voiceAI: true,
    multiLanguage: true,
    sentiment: true,
    
    // Integraciones
    googleCalendar: true,
    whatsappBusiness: true,
    salesforce: false,
    zapier: false
  });

  const handleSave = () => {
    toast.success('Configuración guardada correctamente');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">Gestiona las preferencias de tu plataforma</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Globe className="w-4 h-4" />
            IA
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Key className="w-4 h-4" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Facturación
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre Completo</Label>
                  <Input
                    value={settings.adminName}
                    onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Contraseña</Label>
                  <Input type="password" placeholder="••••••••" className="mt-1" />
                </div>
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Datos de la Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre de la Empresa</Label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>CIF/NIF</Label>
                  <Input placeholder="B12345678" className="mt-1" />
                </div>
                <div>
                  <Label>Dirección</Label>
                  <Input placeholder="Calle Principal 123" className="mt-1" />
                </div>
                <div>
                  <Label>Ciudad</Label>
                  <Input placeholder="Madrid" className="mt-1" />
                </div>
                <div>
                  <Label>Código Postal</Label>
                  <Input placeholder="28001" className="mt-1" />
                </div>
                <div>
                  <Label>País</Label>
                  <Input placeholder="España" className="mt-1" />
                </div>
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones por Email</p>
                  <p className="text-sm text-gray-500">Recibe alertas en tu correo</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones por WhatsApp</p>
                  <p className="text-sm text-gray-500">Alertas directas a tu teléfono</p>
                </div>
                <Switch
                  checked={settings.whatsappNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, whatsappNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Hot Leads</p>
                  <p className="text-sm text-gray-500">Notificación inmediata cuando score &gt; 80</p>
                </div>
                <Switch
                  checked={settings.hotLeadAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, hotLeadAlerts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reporte Diario</p>
                  <p className="text-sm text-gray-500">Resumen de actividad cada día a las 8:00</p>
                </div>
                <Switch
                  checked={settings.dailyReport}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, dailyReport: checked })
                  }
                />
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Preferencias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Inteligencia Artificial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Respuesta Automática</p>
                  <p className="text-sm text-gray-500">IA responde automáticamente a mensajes</p>
                </div>
                <Switch
                  checked={settings.autoResponse}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoResponse: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Agente de Voz IA</p>
                  <p className="text-sm text-gray-500">Llamadas automáticas con ElevenLabs</p>
                </div>
                <Switch
                  checked={settings.voiceAI}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, voiceAI: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Multilenguaje</p>
                  <p className="text-sm text-gray-500">Detección y traducción automática</p>
                </div>
                <Switch
                  checked={settings.multiLanguage}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, multiLanguage: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Análisis de Sentimiento</p>
                  <p className="text-sm text-gray-500">Detecta emociones en mensajes y audios</p>
                </div>
                <Switch
                  checked={settings.sentiment}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, sentiment: checked })
                  }
                />
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Configuración IA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones Externas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    📅
                  </div>
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-gray-500">Sincroniza citas automáticamente</p>
                  </div>
                </div>
                <Switch
                  checked={settings.googleCalendar}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, googleCalendar: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    🟢
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp Business</p>
                    <p className="text-sm text-gray-500">API oficial de Meta</p>
                  </div>
                </div>
                <Switch
                  checked={settings.whatsappBusiness}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, whatsappBusiness: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    ☁️
                  </div>
                  <div>
                    <p className="font-medium">Salesforce</p>
                    <p className="text-sm text-gray-500">Sincroniza CRM externo</p>
                  </div>
                </div>
                <Switch
                  checked={settings.salesforce}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, salesforce: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <div>
                    <p className="font-medium">Zapier</p>
                    <p className="text-sm text-gray-500">Conecta con 5000+ apps</p>
                  </div>
                </div>
                <Switch
                  checked={settings.zapier}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, zapier: checked })
                  }
                />
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Integraciones
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-2xl font-bold">Plan Enterprise</p>
                    <p className="text-gray-600">Acceso completo a todas las funciones</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-red-600">€499</p>
                    <p className="text-sm text-gray-500">/mes</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Mensajes este mes</p>
                    <p className="text-xl font-bold">12,450 / 50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Minutos de voz</p>
                    <p className="text-xl font-bold">320 / 1,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usuarios</p>
                    <p className="text-xl font-bold">8 / Ilimitado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4532</p>
                    <p className="text-sm text-gray-500">Expira 12/2026</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cambiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Facturación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '01 Feb 2026', amount: '€499', status: 'Pagado' },
                    { date: '01 Ene 2026', amount: '€499', status: 'Pagado' },
                    { date: '01 Dic 2025', amount: '€499', status: 'Pagado' }
                  ].map((invoice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-gray-500">{invoice.status}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold">{invoice.amount}</p>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
