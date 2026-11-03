import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Article,
  Order,
  OrderStatus,
  Message,
  SiteSettings,
  initialProducts,
  initialArticles,
  initialOrders,
  initialMessages,
  initialSettings,
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AdminUser {
  email: string;
  name: string;
}

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Articles
  articles: Article[];
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Orders (Pickup Only)
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'status'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;

  // Messages
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'created_at' | 'status'>) => void;
  updateMessageStatus: (id: string, status: Message['status']) => void;
  deleteMessage: (id: string) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetAllData: () => void;

  // Auth (Admin)
  currentAdmin: AdminUser | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Selected product modal trigger
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Order modal triggers
  isOrderModalOpen: boolean;
  orderProduct: Product | null;
  openOrderModal: (product?: Product | null) => void;
  closeOrderModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to sanitize product names and descriptions from legacy Sangkuriang/Grade words
const sanitizeLoadedProducts = (items: Product[]): Product[] => {
  return items.map((p) => {
    let cleanName = p.name
      .replace(/Ikan\s*Lele\s*Sangkuriang\s*Segar\s*—\s*(?:Grade\s*)?/gi, 'Ikan Lele ')
      .replace(/Ikan\s*Lele\s*Segar\s*—\s*(?:Ukuran\s*)?/gi, 'Ikan Lele ')
      .replace(/Sangkuriang/gi, '')
      .replace(/Grade/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      ...p,
      name: cleanName,
      grade: p.grade.replace(/Grade\s*/gi, '').trim(),
      description: p.description.replace(/Sangkuriang/gi, 'pilihan').replace(/Grade/gi, 'ukuran'),
    };
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (v3 with clean names)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('lelequ_products_v3');
      if (stored) {
        return sanitizeLoadedProducts(JSON.parse(stored));
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Articles state
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('lelequ_articles_v2');
      return stored ? JSON.parse(stored) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('lelequ_orders_v2');
      return stored ? JSON.parse(stored) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Messages state
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem('lelequ_messages_v2');
      return stored ? JSON.parse(stored) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  // Settings state
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem('lelequ_settings_v3');
      return stored ? JSON.parse(stored) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Admin auth state
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('lelequ_admin_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lelequ_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lelequ_articles_v2', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('lelequ_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lelequ_messages_v2', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('lelequ_settings_v3', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem('lelequ_admin_session', JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem('lelequ_admin_session');
    }
  }, [currentAdmin]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(-4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Produk lele berhasil ditambahkan.');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Data produk berhasil diperbarui.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Produk telah dihapus dari katalog.', 'info');
  };

  // Articles CRUD
  const addArticle = (artData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...artData,
      id: 'art-' + Date.now(),
    };
    setArticles((prev) => [newArticle, ...prev]);
    showToast('Artikel edukasi berhasil diterbitkan.');
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Artikel berhasil diperbarui.');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    showToast('Artikel telah dihapus.', 'info');
  };

  // Orders Management (Pickup Only)
  const addOrder = (orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'status'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-2024-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      order_number: orderNumber,
      status: 'Menunggu Konfirmasi',
      created_at: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Pesanan #${orderNumber} berhasil dibuat! (Pickup Only)`);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Status pesanan diubah menjadi: ${status}`);
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((item) => item.id !== id));
    showToast('Data pesanan telah dihapus.', 'info');
  };

  // Messages CRUD
  const addMessage = (msgData: Omit<Message, 'id' | 'created_at' | 'status'>) => {
    const newMsg: Message = {
      ...msgData,
      id: 'msg-' + Date.now(),
      status: 'unread',
      created_at: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
    setMessages((prev) => [newMsg, ...prev]);
    showToast('Pesan Anda berhasil dikirim ke pengelola LeleQu.');
  };

  const updateMessageStatus = (id: string, status: Message['status']) => {
    setMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Status pesan diubah menjadi: ${status}`);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));
    showToast('Pesan telah dihapus.', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Pengaturan perusahaan berhasil disimpan.');
  };

  const resetAllData = () => {
    setProducts(initialProducts);
    setArticles(initialArticles);
    setOrders(initialOrders);
    setMessages(initialMessages);
    setSettings(initialSettings);
    localStorage.clear();
    showToast('Seluruh data berhasil di-reset ke pengaturan awal.', 'info');
  };

  // Auth Simulation
  const loginAdmin = (email: string, pass: string): boolean => {
    const normalized = email.trim().toLowerCase();
    if (normalized === 'admin@lelequ.com' && pass === 'admin123') {
      const user: AdminUser = {
        name: 'Administrator LeleQu',
        email: 'admin@lelequ.com',
      };
      setCurrentAdmin(user);
      showToast('Login berhasil. Selamat datang di CMS LeleQu!');
      return true;
    }
    if (normalized.includes('@') && pass.length >= 4) {
      const user: AdminUser = {
        name: normalized.split('@')[0],
        email: normalized,
      };
      setCurrentAdmin(user);
      showToast('Login berhasil.');
      return true;
    }
    showToast('Email atau password tidak sesuai.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    showToast('Anda telah logout dari Admin Dashboard.', 'info');
  };

  const openOrderModal = (prod?: Product | null) => {
    setOrderProduct(prod || products[0] || null);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setOrderProduct(null);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        settings,
        updateSettings,
        resetAllData,
        currentAdmin,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast,
        selectedProduct,
        setSelectedProduct,
        isOrderModalOpen,
        orderProduct,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
