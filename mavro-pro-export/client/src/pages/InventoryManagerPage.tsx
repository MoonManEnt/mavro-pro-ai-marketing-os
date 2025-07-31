import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Plus, Edit, Trash2, Search, Filter, BarChart3, ShoppingCart, DollarSign, Clock, Eye, Download, Upload, RefreshCw, Archive, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minStock: number;
  price: number;
  cost: number;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
  lastRestocked: string;
  location: string;
  description: string;
  image?: string;
  persona: string;
}

interface InventoryCategory {
  id: string;
  name: string;
  itemCount: number;
  totalValue: number;
  lowStockCount: number;
}

interface InventoryManagerPageProps {
  currentPersona: string;
}

const InventoryManagerPage: React.FC<InventoryManagerPageProps> = ({ currentPersona }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'categories' | 'suppliers' | 'reports'>('overview');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const generateInventoryData = () => {
      const baseInventory: Record<string, InventoryItem[]> = {
        marco: [
          {
            id: 'inv-001',
            name: 'San Marzano Tomatoes',
            category: 'Ingredients',
            sku: 'ING-001',
            quantity: 24,
            minStock: 10,
            price: 0, // Not applicable for restaurant
            cost: 4.50,
            supplier: 'Italian Imports Co.',
            status: 'in-stock',
            lastRestocked: '2025-01-08',
            location: 'Pantry A1',
            description: 'Premium San Marzano tomatoes from Italy',
            persona: 'marco'
          },
          {
            id: 'inv-002',
            name: 'Parmigiano Reggiano',
            category: 'Ingredients',
            sku: 'ING-002',
            quantity: 3,
            minStock: 5,
            price: 0,
            cost: 28.00,
            supplier: 'Cheese Distributors',
            status: 'low-stock',
            lastRestocked: '2025-01-05',
            location: 'Refrigerator B2',
            description: '24-month aged Parmigiano Reggiano wheel',
            persona: 'marco'
          },
          {
            id: 'inv-003',
            name: 'Extra Virgin Olive Oil',
            category: 'Ingredients',
            sku: 'ING-003',
            quantity: 8,
            minStock: 6,
            price: 0,
            cost: 15.00,
            supplier: 'Mediterranean Foods',
            status: 'in-stock',
            lastRestocked: '2025-01-10',
            location: 'Pantry A2',
            description: 'Cold-pressed Italian olive oil',
            persona: 'marco'
          },
          {
            id: 'inv-004',
            name: 'Fresh Basil',
            category: 'Herbs',
            sku: 'HRB-001',
            quantity: 0,
            minStock: 2,
            price: 0,
            cost: 3.50,
            supplier: 'Local Herb Farm',
            status: 'out-of-stock',
            lastRestocked: '2025-01-07',
            location: 'Herb Cooler',
            description: 'Fresh organic basil leaves',
            persona: 'marco'
          },
          {
            id: 'inv-005',
            name: 'Arborio Rice',
            category: 'Ingredients',
            sku: 'ING-004',
            quantity: 12,
            minStock: 8,
            price: 0,
            cost: 6.00,
            supplier: 'Italian Imports Co.',
            status: 'in-stock',
            lastRestocked: '2025-01-06',
            location: 'Pantry A3',
            description: 'Premium Arborio rice for risotto',
            persona: 'marco'
          },
          {
            id: 'inv-006',
            name: 'Prosciutto di Parma',
            category: 'Meats',
            sku: 'MET-001',
            quantity: 2,
            minStock: 3,
            price: 0,
            cost: 45.00,
            supplier: 'Specialty Meats',
            status: 'low-stock',
            lastRestocked: '2025-01-09',
            location: 'Deli Cooler',
            description: '18-month aged Prosciutto di Parma',
            persona: 'marco'
          }
        ],
        david: [
          {
            id: 'inv-007',
            name: '2025 Tesla Model 3',
            category: 'Electric Vehicles',
            sku: 'EV-T3-001',
            quantity: 3,
            minStock: 2,
            price: 42000,
            cost: 38000,
            supplier: 'Tesla Motors',
            status: 'in-stock',
            lastRestocked: '2025-01-05',
            location: 'Lot A, Section 1',
            description: 'Long Range AWD, Pearl White Multi-Coat',
            persona: 'david'
          },
          {
            id: 'inv-008',
            name: '2025 BMW X5',
            category: 'Luxury SUVs',
            sku: 'LUX-X5-001',
            quantity: 1,
            minStock: 2,
            price: 68000,
            cost: 62000,
            supplier: 'BMW North America',
            status: 'low-stock',
            lastRestocked: '2025-01-08',
            location: 'Showroom Floor',
            description: 'xDrive40i, Mineral Gray Metallic',
            persona: 'david'
          },
          {
            id: 'inv-009',
            name: '2025 Honda Civic',
            category: 'Sedans',
            sku: 'SED-CIV-001',
            quantity: 5,
            minStock: 3,
            price: 28000,
            cost: 25000,
            supplier: 'American Honda',
            status: 'in-stock',
            lastRestocked: '2025-01-10',
            location: 'Lot B, Section 2',
            description: 'Touring Sedan, Sonic Gray Pearl',
            persona: 'david'
          },
          {
            id: 'inv-010',
            name: '2024 Ford F-150',
            category: 'Trucks',
            sku: 'TRK-F15-001',
            quantity: 2,
            minStock: 2,
            price: 45000,
            cost: 41000,
            supplier: 'Ford Motor Company',
            status: 'in-stock',
            lastRestocked: '2025-01-07',
            location: 'Lot C, Section 1',
            description: 'SuperCrew XLT, Oxford White',
            persona: 'david'
          },
          {
            id: 'inv-011',
            name: '2025 Audi A4',
            category: 'Luxury Sedans',
            sku: 'LUX-A4-001',
            quantity: 0,
            minStock: 1,
            price: 55000,
            cost: 50000,
            supplier: 'Audi of America',
            status: 'out-of-stock',
            lastRestocked: '2024-12-20',
            location: 'Lot A, Section 3',
            description: 'Premium Plus, Glacier White Metallic',
            persona: 'david'
          },
          {
            id: 'inv-012',
            name: 'OEM Brake Pads',
            category: 'Parts',
            sku: 'PRT-BRK-001',
            quantity: 45,
            minStock: 20,
            price: 120,
            cost: 85,
            supplier: 'Automotive Parts Plus',
            status: 'in-stock',
            lastRestocked: '2025-01-09',
            location: 'Parts Storage A',
            description: 'OEM brake pads for various models',
            persona: 'david'
          }
        ],
        alex: [
          {
            id: 'inv-013',
            name: 'Whey Protein Powder',
            category: 'Supplements',
            sku: 'SUP-WHP-001',
            quantity: 12,
            minStock: 8,
            price: 65,
            cost: 45,
            supplier: 'Nutrition Warehouse',
            status: 'in-stock',
            lastRestocked: '2025-01-08',
            location: 'Retail Section A',
            description: 'Premium whey protein isolate, vanilla flavor',
            persona: 'alex'
          },
          {
            id: 'inv-014',
            name: 'Resistance Bands Set',
            category: 'Equipment',
            sku: 'EQP-RBS-001',
            quantity: 5,
            minStock: 8,
            price: 35,
            cost: 22,
            supplier: 'Fitness Gear Co.',
            status: 'low-stock',
            lastRestocked: '2025-01-05',
            location: 'Equipment Storage B',
            description: 'Heavy-duty resistance bands with handles',
            persona: 'alex'
          },
          {
            id: 'inv-015',
            name: 'Yoga Mats',
            category: 'Equipment',
            sku: 'EQP-YMT-001',
            quantity: 20,
            minStock: 15,
            price: 25,
            cost: 15,
            supplier: 'Wellness Products',
            status: 'in-stock',
            lastRestocked: '2025-01-10',
            location: 'Retail Section B',
            description: 'Non-slip yoga mats, various colors',
            persona: 'alex'
          },
          {
            id: 'inv-016',
            name: 'Pre-Workout Supplement',
            category: 'Supplements',
            sku: 'SUP-PWO-001',
            quantity: 0,
            minStock: 6,
            price: 45,
            cost: 32,
            supplier: 'Sports Nutrition Ltd.',
            status: 'out-of-stock',
            lastRestocked: '2025-01-03',
            location: 'Retail Section A',
            description: 'Energy boost pre-workout formula',
            persona: 'alex'
          },
          {
            id: 'inv-017',
            name: 'Gym Towels',
            category: 'Accessories',
            sku: 'ACC-TWL-001',
            quantity: 25,
            minStock: 20,
            price: 12,
            cost: 6,
            supplier: 'Gym Essentials',
            status: 'in-stock',
            lastRestocked: '2025-01-07',
            location: 'Laundry Room',
            description: 'Microfiber gym towels, pack of 5',
            persona: 'alex'
          },
          {
            id: 'inv-018',
            name: 'Dumbbells 20lb',
            category: 'Equipment',
            sku: 'EQP-DB20-001',
            quantity: 8,
            minStock: 6,
            price: 85,
            cost: 60,
            supplier: 'Iron Works Equipment',
            status: 'in-stock',
            lastRestocked: '2025-01-09',
            location: 'Free Weight Area',
            description: 'Rubber-coated dumbbells, 20 pounds',
            persona: 'alex'
          }
        ]
      };

      const baseCategories: Record<string, InventoryCategory[]> = {
        marco: [
          { id: 'cat-001', name: 'Ingredients', itemCount: 4, totalValue: 1280, lowStockCount: 1 },
          { id: 'cat-002', name: 'Herbs', itemCount: 1, totalValue: 0, lowStockCount: 0 },
          { id: 'cat-003', name: 'Meats', itemCount: 1, totalValue: 90, lowStockCount: 1 }
        ],
        david: [
          { id: 'cat-004', name: 'Electric Vehicles', itemCount: 1, totalValue: 126000, lowStockCount: 0 },
          { id: 'cat-005', name: 'Luxury SUVs', itemCount: 1, totalValue: 68000, lowStockCount: 1 },
          { id: 'cat-006', name: 'Sedans', itemCount: 1, totalValue: 140000, lowStockCount: 0 },
          { id: 'cat-007', name: 'Trucks', itemCount: 1, totalValue: 90000, lowStockCount: 0 },
          { id: 'cat-008', name: 'Luxury Sedans', itemCount: 1, totalValue: 0, lowStockCount: 0 },
          { id: 'cat-009', name: 'Parts', itemCount: 1, totalValue: 5400, lowStockCount: 0 }
        ],
        alex: [
          { id: 'cat-010', name: 'Supplements', itemCount: 2, totalValue: 780, lowStockCount: 0 },
          { id: 'cat-011', name: 'Equipment', itemCount: 3, totalValue: 1380, lowStockCount: 1 },
          { id: 'cat-012', name: 'Accessories', itemCount: 1, totalValue: 300, lowStockCount: 0 }
        ]
      };

      // Only set data for personas that have inventory
      if (['marco', 'david', 'alex'].includes(currentPersona)) {
        setInventoryItems(baseInventory[currentPersona] || []);
        setCategories(baseCategories[currentPersona] || []);
      } else {
        setInventoryItems([]);
        setCategories([]);
      }
    };

    generateInventoryData();
  }, [currentPersona]);

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'discontinued': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'low-stock': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'out-of-stock': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'discontinued': return <Archive className="w-5 h-5 text-gray-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Don't show inventory manager for personas that don't have inventory
  if (!['marco', 'david', 'alex'].includes(currentPersona)) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Manager</h1>
            <p className="text-gray-600">Inventory management system</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
            <p className="text-gray-600 mb-4">This feature is available for businesses that manage physical inventory</p>
            <p className="text-sm text-gray-500">
              Available for: Restaurant owners, Auto dealers, Fitness centers, and other product-based businesses
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Manager</h1>
          <p className="text-gray-600">Track and manage your inventory</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'inventory', 'categories', 'suppliers', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
              <div className="space-y-4">
                {inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity} (Min: {item.minStock})</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Overview</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.itemCount} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatCurrency(category.totalValue)}</p>
                      {category.lowStockCount > 0 && (
                        <p className="text-sm text-yellow-600">{category.lowStockCount} low stock</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{item.sku}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.quantity} / {item.minStock}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              item.quantity <= item.minStock ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.price > 0 ? formatCurrency(item.price) : '-'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Cost: {formatCurrency(item.cost)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{item.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-purple-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="text-gray-900">{category.itemCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Value:</span>
                      <span className="text-gray-900">{formatCurrency(category.totalValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Low Stock:</span>
                      <span className={`${category.lowStockCount > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {category.lowStockCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Management</h3>
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Supplier management system</p>
              <p className="text-sm text-gray-500">Manage suppliers and purchase orders</p>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Reports</h3>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Inventory analytics and reports</p>
              <p className="text-sm text-gray-500">Generate reports on inventory trends and performance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagerPage;