import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare,
  Users,
  Workflow, 
  Target,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import logoXatrion from 'figma:asset/b8726f80d46050369f14866341b4c83d00a50a7c.png';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  hasHotLeads: boolean;
}

export function Sidebar({ activeModule, onModuleChange, hasHotLeads }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox Unificado', icon: MessageSquare },
    { id: 'crm', label: 'CRM & Leads', icon: Users },
    { id: 'workflows', label: 'Automatizaciones', icon: Workflow },
    { id: 'retention', label: 'Retención', icon: Target },
    { id: 'analytics', label: 'Analítica', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings },
    { id: 'superadmin', label: 'Superadmin', icon: Shield },
  ];

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gray-900 text-white h-screen flex flex-col relative"
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-10 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center relative">
        <motion.div
          animate={hasHotLeads ? {
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0)',
              '0 0 0 10px rgba(239, 68, 68, 0.3)',
              '0 0 0 20px rgba(239, 68, 68, 0)',
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="rounded-lg"
        >
          <img 
            src={logoXatrion} 
            alt="Xatrion Logo" 
            className={`transition-all ${isCollapsed ? 'h-8' : 'h-12'} w-auto`}
          />
        </motion.div>
        {hasHotLeads && !isCollapsed && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all relative group
                ${isActive 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-gray-800"
        >
          <div className="text-xs text-gray-500">
            <p>Xatrion Platform v2.0</p>
            <p className="mt-1">© 2026 All rights reserved</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}