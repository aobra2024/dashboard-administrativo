"use client"

import { useState } from 'react'
import { 
  Menu, 
  Home, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  User,
  Calendar,
  Circle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  LogOut,
  X,
  BarChart3,
  TrendingUp,
  Clock,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  Shield,
  Database,
  Palette,
  Globe,
  Lock,
  UserPlus,
  Activity,
  DollarSign,
  ShoppingCart,
  Target
} from 'lucide-react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Novo usuário cadastrado', time: '2 min atrás', read: false },
    { id: 2, message: 'Relatório mensal disponível', time: '1 hora atrás', read: false },
    { id: 3, message: 'Sistema atualizado', time: '3 horas atrás', read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Dados mockados para a tabela
  const [mockData, setMockData] = useState([
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'active', date: '2024-01-15', role: 'Admin' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'inactive', date: '2024-01-14', role: 'User' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', status: 'active', date: '2024-01-13', role: 'Editor' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', status: 'pending', date: '2024-01-12', role: 'User' },
    { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', status: 'active', date: '2024-01-11', role: 'Admin' },
    { id: 6, name: 'Lucia Ferreira', email: 'lucia@email.com', status: 'inactive', date: '2024-01-10', role: 'Editor' },
    { id: 7, name: 'Roberto Alves', email: 'roberto@email.com', status: 'active', date: '2024-01-09', role: 'User' },
    { id: 8, name: 'Fernanda Rocha', email: 'fernanda@email.com', status: 'pending', date: '2024-01-08', role: 'User' },
  ])

  // Dados mockados para relatórios
  const [reports] = useState([
    { id: 1, title: 'Relatório de Vendas - Janeiro', type: 'Vendas', date: '2024-01-31', status: 'completed', size: '2.4 MB' },
    { id: 2, title: 'Análise de Usuários - Q4 2023', type: 'Usuários', date: '2024-01-15', status: 'completed', size: '1.8 MB' },
    { id: 3, title: 'Performance do Sistema', type: 'Sistema', date: '2024-01-10', status: 'processing', size: '3.2 MB' },
    { id: 4, title: 'Relatório Financeiro', type: 'Financeiro', date: '2024-01-05', status: 'completed', size: '4.1 MB' },
  ])

  // Dados mockados para agenda
  const [events] = useState([
    { id: 1, title: 'Reunião de Equipe', time: '09:00', date: '2024-01-20', type: 'meeting' },
    { id: 2, title: 'Apresentação do Projeto', time: '14:30', date: '2024-01-20', type: 'presentation' },
    { id: 3, title: 'Call com Cliente', time: '16:00', date: '2024-01-21', type: 'call' },
    { id: 4, title: 'Workshop de Treinamento', time: '10:00', date: '2024-01-22', type: 'training' },
  ])

  // Filtrar dados
  const filteredData = mockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Paginação
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: Users, label: 'Usuários', key: 'users' },
    { icon: FileText, label: 'Relatórios', key: 'reports' },
    { icon: Calendar, label: 'Agenda', key: 'calendar' },
    { icon: Settings, label: 'Configurações', key: 'settings' },
  ]

  const statsCards = [
    { 
      title: 'Total de Usuários', 
      value: '2,847', 
      change: '+12%', 
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      title: 'Receita Mensal', 
      value: 'R$ 45.2k', 
      change: '+8%', 
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      title: 'Vendas Hoje', 
      value: '127', 
      change: '+23%', 
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      title: 'Taxa de Conversão', 
      value: '3.2%', 
      change: '+5%', 
      icon: Target,
      gradient: 'from-orange-500 to-red-500'
    },
  ]

  // Funções dos botões
  const handleSectionChange = (section) => {
    setActiveSection(section)
    setShowUserMenu(false)
    setShowNotifications(false)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setShowNotifications(false)
  }

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      alert('Logout realizado com sucesso!')
    }
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const handleAddUser = () => {
    setShowAddUserModal(true)
  }

  const handleEditUser = (user) => {
    alert(`Editando usuário: ${user.name}`)
  }

  const handleDeleteUser = (user) => {
    if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
      setMockData(mockData.filter(u => u.id !== user.id))
    }
  }

  const handleViewUser = (user) => {
    alert(`Visualizando detalhes de: ${user.name}\nEmail: ${user.email}\nFunção: ${user.role}\nStatus: ${user.status}`)
  }

  const handleExportData = () => {
    alert('Exportando dados... (CSV será baixado)')
  }

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      alert('Selecione pelo menos um usuário')
      return
    }
    
    if (action === 'delete') {
      if (confirm(`Excluir ${selectedUsers.length} usuário(s) selecionado(s)?`)) {
        setMockData(mockData.filter(u => !selectedUsers.includes(u.id)))
        setSelectedUsers([])
      }
    } else if (action === 'activate') {
      setMockData(mockData.map(u => 
        selectedUsers.includes(u.id) ? { ...u, status: 'active' } : u
      ))
      setSelectedUsers([])
    }
  }

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Renderizar conteúdo baseado na seção ativa
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'users':
        return renderUsers()
      case 'reports':
        return renderReports()
      case 'calendar':
        return renderCalendar()
      case 'settings':
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => handleSectionChange('users')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Análise de Performance</h3>
          <button
            onClick={() => handleSectionChange('reports')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Ver relatórios completos"
          >
            <BarChart3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <p className="text-blue-600 font-medium">Gráfico de Performance</p>
            <p className="text-blue-400 text-sm">Clique para ver relatórios detalhados</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleSectionChange('users')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left"
            >
              <UserPlus className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Adicionar Usuário</span>
            </button>
            <button
              onClick={() => handleSectionChange('reports')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-left"
            >
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Gerar Relatório</span>
            </button>
            <button
              onClick={() => handleSectionChange('calendar')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left"
            >
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Ver Agenda</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Usuário João Silva fez login</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Novo relatório gerado</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Sistema atualizado</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Sistema</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CPU</span>
              <span className="text-sm font-medium text-green-600">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Memória</span>
              <span className="text-sm font-medium text-blue-600">62%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Disco</span>
              <span className="text-sm font-medium text-orange-600">78%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderUsers = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gerenciar Usuários</h3>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="pending">Pendente</option>
            </select>
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedUsers.length} usuário(s) selecionado(s)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Ativar
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(paginatedData.map(u => u.id))
                    } else {
                      setSelectedUsers([])
                    }
                  }}
                  checked={selectedUsers.length === paginatedData.length && paginatedData.length > 0}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Função
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-medium">{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status === 'active' ? 'Ativo' : user.status === 'inactive' ? 'Inativo' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      title="Visualizar"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-1 text-green-600 hover:text-green-800 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Relatórios Disponíveis</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            Novo Relatório
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                  <p className="text-sm text-gray-500">{report.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status === 'completed' ? 'Concluído' : 'Processando'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                <span>{report.size}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                  <Eye className="w-4 h-4" />
                  Ver
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors">
                  <Download className="w-4 h-4" />
                  Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas de Relatórios</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total de Relatórios</span>
              <span className="font-semibold text-gray-900">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Concluídos este mês</span>
              <span className="font-semibold text-green-600">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Em processamento</span>
              <span className="font-semibold text-yellow-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Agendados</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Relatório de Vendas</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-left">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Análise de Usuários</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left">
              <Activity className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Performance do Sistema</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Agenda</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            Novo Evento
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Janeiro 2024</h4>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                <div className="p-2 font-medium text-gray-600">Dom</div>
                <div className="p-2 font-medium text-gray-600">Seg</div>
                <div className="p-2 font-medium text-gray-600">Ter</div>
                <div className="p-2 font-medium text-gray-600">Qua</div>
                <div className="p-2 font-medium text-gray-600">Qui</div>
                <div className="p-2 font-medium text-gray-600">Sex</div>
                <div className="p-2 font-medium text-gray-600">Sáb</div>
                
                {Array.from({ length: 31 }, (_, i) => (
                  <div key={i} className={`p-2 rounded hover:bg-blue-100 cursor-pointer ${
                    i + 1 === 20 ? 'bg-blue-500 text-white' : 'text-gray-700'
                  }`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Próximos Eventos</h4>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'presentation' ? 'bg-green-500' :
                      event.type === 'call' ? 'bg-orange-500' : 'bg-purple-500'
                    }`}></div>
                    <h5 className="font-medium text-gray-900 text-sm">{event.title}</h5>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas da Agenda</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Eventos hoje</span>
              <span className="font-semibold text-blue-600">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Esta semana</span>
              <span className="font-semibold text-green-600">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Este mês</span>
              <span className="font-semibold text-purple-600">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Eventos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Reuniões</span>
              </div>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Apresentações</span>
              </div>
              <span className="font-semibold text-gray-900">6</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Calls</span>
              </div>
              <span className="font-semibold text-gray-900">4</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Treinamentos</span>
              </div>
              <span className="font-semibold text-gray-900">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Perfil do Usuário</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Upload className="w-4 h-4" />
                    Alterar Foto
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@empresa.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    defaultValue="(11) 99999-9999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <input
                    type="text"
                    defaultValue="Administrador"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Segurança</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Lock className="w-4 h-4" />
                Alterar Senha
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferências</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notificações por Email</p>
                  <p className="text-sm text-gray-500">Receber atualizações por email</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notificações Push</p>
                  <p className="text-sm text-gray-500">Receber notificações no navegador</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Tema Escuro</p>
                  <p className="text-sm text-gray-500">Usar tema escuro na interface</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sistema</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left">
                <Database className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Backup de Dados</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-left">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Logs de Segurança</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="text-purple-800 font-medium">Configurações de API</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Zona de Perigo</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-left">
                <Trash2 className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Limpar Cache</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-left">
                <X className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Resetar Configurações</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AdminPanel
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSectionChange(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.key 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={handleUserMenuToggle}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@empresa.com</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={() => {
                      handleSectionChange('settings')
                      setShowUserMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Meu Perfil
                  </button>
                  <button
                    onClick={() => {
                      handleSectionChange('settings')
                      setShowUserMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeSection === 'dashboard' ? 'Dashboard' : 
                 activeSection === 'users' ? 'Usuários' :
                 activeSection === 'reports' ? 'Relatórios' :
                 activeSection === 'calendar' ? 'Agenda' :
                 activeSection === 'settings' ? 'Configurações' : 'Dashboard'}
              </h1>
              <p className="text-gray-600">
                {activeSection === 'dashboard' ? 'Bem-vindo de volta! Aqui está o resumo de hoje.' :
                 activeSection === 'users' ? 'Gerencie usuários e permissões do sistema.' :
                 activeSection === 'reports' ? 'Visualize e gere relatórios detalhados.' :
                 activeSection === 'calendar' ? 'Organize sua agenda e eventos.' :
                 activeSection === 'settings' ? 'Configure suas preferências e sistema.' : 'Bem-vindo de volta!'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notificações</h3>
                      <button
                        onClick={clearAllNotifications}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Limpar todas
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Nenhuma notificação
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <button
                            key={notif.id}
                            onClick={() => markNotificationAsRead(notif.id)}
                            className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                              !notif.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="text-sm text-gray-900">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleUserMenuToggle}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <User className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-6">
          {renderContent()}
        </main>
      </div>

      {/* Modal de Adicionar Usuário */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Adicionar Usuário</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newUser = {
                id: mockData.length + 1,
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                status: 'active',
                date: new Date().toISOString().split('T')[0]
              }
              setMockData([...mockData, newUser])
              setShowAddUserModal(false)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                  <select 
                    name="role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="User">Usuário</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}