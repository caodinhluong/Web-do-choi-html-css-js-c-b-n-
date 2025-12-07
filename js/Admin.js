/* Admin.js - Dashboard Quản Trị ToyStore - CẬP NHẬT */
(function () {
  'use strict';

  /* =========================
     1) KHỞI TẠO DỮ LIỆU & LOCALSTORAGE
     ========================= */
  const STORAGE_KEYS = {
    PRODUCTS: 'kidtoystore_products',
    CATEGORIES: 'kidtoystore_categories',
    ORDERS: 'kidtoystore_orders',
    USERS: 'kidtoystore_users',
    DASHBOARD_STATS: 'kidtoystore_dashboard_stats',
    REPORTS: 'kidtoystore_reports'
  };

  // Dữ liệu mẫu ban đầu - CẢI THIỆN
  const defaultData = {
    products: [
      {
        id: 1,
        code: "#TOY001",
        name: "Xe Điều Khiển Từ Xa",
        category: "Đồ Chơi Công Nghệ",
        price: 450000,
        stock: 45,
        sold: 142,
        description: "Xe điều khiển từ xa 2.4GHz, pin sạc, điều khiển từ xa",
        createdAt: "2024-01-15",
        image: "car"
      },
      {
        id: 2,
        code: "#TOY002",
        name: "Bộ Xếp Hình Thông Minh",
        category: "Đồ Chơi Giáo Dục",
        price: 320000,
        stock: 28,
        sold: 128,
        description: "200 mảnh ghép, phát triển tư duy cho trẻ 3-8 tuổi",
        createdAt: "2024-02-10",
        image: "puzzle-piece"
      },
      {
        id: 3,
        code: "#TOY003",
        name: "Robot Biến Hình",
        category: "Đồ Chơi Hành Động",
        price: 680000,
        stock: 12,
        sold: 98,
        description: "Robot biến hình thành xe, có đèn và âm thanh",
        createdAt: "2024-03-05",
        image: "robot"
      },
      {
        id: 4,
        code: "#TOY004",
        name: "Búp Bê Biết Nói",
        category: "Đồ Chơi Cho Bé Gái",
        price: 250000,
        stock: 32,
        sold: 87,
        description: "Búp bê biết nói 50 câu, có quần áo thay đổi",
        createdAt: "2024-01-20",
        image: "baby"
      },
      {
        id: 5,
        code: "#TOY005",
        name: "Bộ Lắp Ghép LEGO",
        category: "Đồ Chơi Sáng Tạo",
        price: 1200000,
        stock: 8,
        sold: 76,
        description: "Bộ LEGO 1000 mảnh, dành cho trẻ từ 8 tuổi trở lên",
        createdAt: "2024-02-25",
        image: "cubes"
      }
    ],
    categories: [
      { id: 1, code: "#CAT001", name: "Đồ Chơi Công Nghệ", productCount: 45, description: "Đồ chơi ứng dụng công nghệ hiện đại", status: "active", createdAt: "2023-12-01", icon: "car" },
      { id: 2, code: "#CAT002", name: "Đồ Chơi Giáo Dục", productCount: 38, description: "Đồ chơi phát triển trí tuệ cho trẻ", status: "active", createdAt: "2023-12-05", icon: "puzzle-piece" },
      { id: 3, code: "#CAT003", name: "Đồ Chơi Hành Động", productCount: 52, description: "Đồ chơi mô hình, siêu nhân, robot", status: "active", createdAt: "2023-12-10", icon: "robot" },
      { id: 4, code: "#CAT004", name: "Đồ Chơi Cho Bé Gái", productCount: 41, description: "Búp bê, đồ chơi nấu ăn, trang điểm", status: "active", createdAt: "2023-12-15", icon: "baby" },
      { id: 5, code: "#CAT005", name: "Đồ Chơi Sáng Tạo", productCount: 29, description: "Đồ chơi lắp ghép, xếp hình, vẽ tranh", status: "active", createdAt: "2023-12-20", icon: "cubes" }
    ],
    orders: [
      { id: 1, code: "#TOY-2456", customer: "Nguyễn Văn A", customerPhone: "0912345678", date: "15/05/2024", items: 3, total: 850000, status: "completed", products: ["Xe Điều Khiển Từ Xa", "Búp Bê Biết Nói"], shippingAddress: "123 Đường ABC, Quận 1, TP.HCM", paymentMethod: "COD" },
      { id: 2, code: "#TOY-2455", customer: "Trần Thị B", customerPhone: "0923456789", date: "14/05/2024", items: 5, total: 1250000, status: "processing", products: ["Bộ Xếp Hình Thông Minh", "Robot Biến Hình"], shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM", paymentMethod: "Chuyển khoản" },
      { id: 3, code: "#TOY-2454", customer: "Lê Văn C", customerPhone: "0934567890", date: "13/05/2024", items: 2, total: 560000, status: "pending", products: ["Xe Điều Khiển Từ Xa"], shippingAddress: "789 Đường DEF, Quận 3, TP.HCM", paymentMethod: "COD" },
      { id: 4, code: "#TOY-2453", customer: "Phạm Thị D", customerPhone: "0945678901", date: "12/05/2024", items: 7, total: 2340000, status: "completed", products: ["Bộ Lắp Ghép LEGO", "Robot Biến Hình"], shippingAddress: "321 Đường GHI, Quận 4, TP.HCM", paymentMethod: "Thẻ tín dụng" },
      { id: 5, code: "#TOY-2452", customer: "Hoàng Văn E", customerPhone: "0956789012", date: "11/05/2024", items: 1, total: 720000, status: "cancelled", products: ["Robot Biến Hình"], shippingAddress: "654 Đường JKL, Quận 5, TP.HCM", paymentMethod: "COD" }
    ],
    users: [
      { id: 1, code: "#USER001", name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0912345678", role: "customer", joinDate: "15/03/2024", status: "active", totalOrders: 5, totalSpent: 3250000, address: "123 Đường ABC, Quận 1, TP.HCM" },
      { id: 2, code: "#USER002", name: "Trần Thị B", email: "tranthib@email.com", phone: "0923456789", role: "customer", joinDate: "22/02/2024", status: "active", totalOrders: 3, totalSpent: 2150000, address: "456 Đường XYZ, Quận 2, TP.HCM" },
      { id: 3, code: "#USER003", name: "Lê Văn C", email: "levanc@email.com", phone: "0934567890", role: "customer", joinDate: "10/01/2024", status: "active", totalOrders: 7, totalSpent: 4850000, address: "789 Đường DEF, Quận 3, TP.HCM" },
      { id: 4, code: "#USER004", name: "Phạm Thị D", email: "phamthid@email.com", phone: "0945678901", role: "admin", joinDate: "05/12/2023", status: "active", totalOrders: 12, totalSpent: 0, address: "321 Đường GHI, Quận 4, TP.HCM" },
      { id: 5, code: "#USER005", name: "Hoàng Văn E", email: "hoangvane@email.com", phone: "0956789012", role: "customer", joinDate: "28/11/2023", status: "active", totalOrders: 9, totalSpent: 6250000, address: "654 Đường JKL, Quận 5, TP.HCM" }
    ]
  };

  // State - lấy từ localStorage hoặc dùng mẫu
  const state = {
    products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || defaultData.products,
    categories: JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || defaultData.categories,
    orders: JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || defaultData.orders,
    users: JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || defaultData.users,
    ids: {
      product: Math.max(...(JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || defaultData.products).map(p => p.id)) + 1,
      category: Math.max(...(JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || defaultData.categories).map(c => c.id)) + 1,
      order: Math.max(...(JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || defaultData.orders).map(o => o.id)) + 1,
      user: Math.max(...(JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || defaultData.users).map(u => u.id)) + 1
    }
  };

  /* =========================
     2) LƯU VÀO LOCALSTORAGE
     ========================= */
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(state.categories));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users));

    // Lưu thống kê dashboard
    const dashboardStats = {
      totalRevenue: calculateTotalRevenue(),
      totalOrders: state.orders.length,
      totalProducts: state.products.length,
      totalUsers: state.users.length,
      recentOrders: state.orders.slice(0, 5),
      topProducts: state.products.sort((a, b) => b.sold - a.sold).slice(0, 5)
    };
    localStorage.setItem(STORAGE_KEYS.DASHBOARD_STATS, JSON.stringify(dashboardStats));

    // Lưu báo cáo
    const reports = generateReportsData();
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

    console.log('Dữ liệu đã lưu vào localStorage');
  }

  /* =========================
     3) TIỆN ÍCH CHUNG
     ========================= */
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  }

  function formatDate(date = new Date()) {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  function closeAllModals() {
    $$('.modal').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
  }

  /* =========================
     4) NOTIFICATION SYSTEM - CẢI THIỆN
     ========================= */
  function showNotification(message, type = 'success') {
    // Xóa notification cũ nếu có
    const oldToast = $('.notification-toast');
    if (oldToast) oldToast.remove();

    const notification = document.createElement('div');
    notification.className = `notification-toast toast-${type}`;
    notification.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
      </div>
      <div class="toast-message">${message}</div>
      <button class="toast-close"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(notification);

    // Animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Close button
    notification.querySelector('.toast-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  /* =========================
     5) CHART SYSTEM - ĐÃ TÁCH RIÊNG
     ========================= */
  let revenueChart = null;
  let categoryChart = null;
  let ordersChart = null;
  let salesChart = null;

  function initCharts() {
    console.log('Đang khởi tạo biểu đồ...');

    // Chart 1: Doanh thu theo tháng (Dashboard)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
      if (revenueChart) revenueChart.destroy();

      const revenueData = generateRevenueData();
      revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: revenueData.labels,
          datasets: [{
            label: 'Doanh thu (triệu VNĐ)',
            data: revenueData.data,
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4e73df',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleFont: { size: 14 },
              bodyFont: { size: 13 },
              padding: 12,
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.parsed.y.toLocaleString('vi-VN')} triệu VNĐ`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 },
                callback: function (value) {
                  return value.toLocaleString('vi-VN') + ' tr';
                }
              },
              title: {
                display: true,
                text: 'Triệu VNĐ',
                font: { size: 13, weight: 'bold' }
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 }
              },
              title: {
                display: true,
                text: 'Tháng',
                font: { size: 13, weight: 'bold' }
              }
            }
          }
        }
      });
    }

    // Chart 2: Doanh thu theo danh mục (Reports)
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      if (categoryChart) categoryChart.destroy();

      const categoryData = generateCategoryData();
      categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
          labels: categoryData.labels,
          datasets: [{
            data: categoryData.data,
            backgroundColor: [
              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
              '#e74a3b', '#6f42c1', '#20c9a6', '#858796',
              '#5a5c69', '#3a3b45'
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                font: {
                  size: 13
                },
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${formatCurrency(value * 1000000)} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Chart 3: Tỷ lệ đơn hàng theo trạng thái (Reports)
    const ordersCtx = document.getElementById('ordersChart');
    if (ordersCtx) {
      if (ordersChart) ordersChart.destroy();

      const ordersData = generateOrdersData();
      ordersChart = new Chart(ordersCtx, {
        type: 'bar',
        data: {
          labels: ordersData.labels,
          datasets: [{
            label: 'Số lượng đơn',
            data: ordersData.data,
            backgroundColor: [
              'rgba(78, 115, 223, 0.8)',
              'rgba(28, 200, 138, 0.8)',
              'rgba(246, 194, 62, 0.8)',
              'rgba(231, 74, 59, 0.8)',
              'rgba(111, 66, 193, 0.8)'
            ],
            borderColor: [
              '#4e73df',
              '#1cc88a',
              '#f6c23e',
              '#e74a3b',
              '#6f42c1'
            ],
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 },
                stepSize: 1
              },
              title: {
                display: true,
                text: 'Số lượng đơn',
                font: { size: 13, weight: 'bold' }
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 }
              },
              title: {
                display: true,
                text: 'Trạng thái',
                font: { size: 13, weight: 'bold' }
              }
            }
          }
        }
      });
    }

    // Chart 4: Top sản phẩm bán chạy (Dashboard - Sales)
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
      if (salesChart) salesChart.destroy();

      const salesData = generateSalesData();
      salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: {
          labels: salesData.labels,
          datasets: [{
            label: 'Số lượng đã bán',
            data: salesData.data,
            backgroundColor: 'rgba(28, 200, 138, 0.7)',
            borderColor: '#1cc88a',
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 }
              },
              title: {
                display: true,
                text: 'Số lượng bán',
                font: { size: 13, weight: 'bold' }
              }
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 12 }
              }
            }
          }
        }
      });
    }

    console.log('Khởi tạo biểu đồ thành công');
  }

  function generateRevenueData() {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const data = months.map(() => Math.floor(Math.random() * 80) + 40);

    return {
      labels: months,
      data: data
    };
  }

  function generateCategoryData() {
    const categories = [...new Set(state.products.map(p => p.category))];
    const data = categories.map(category => {
      const productsInCategory = state.products.filter(p => p.category === category);
      return productsInCategory.reduce((sum, p) => sum + (p.price * p.sold), 0) / 1000000;
    });

    return {
      labels: categories,
      data: data
    };
  }

  function generateOrdersData() {
    const statusMap = {
      'pending': 'Chờ xác nhận',
      'processing': 'Đang xử lý',
      'completed': 'Đã giao',
      'cancelled': 'Đã hủy',
      'shipping': 'Đang giao'
    };

    const labels = Object.values(statusMap);
    const data = Object.keys(statusMap).map(status =>
      state.orders.filter(o => o.status === status).length
    );

    return {
      labels: labels,
      data: data
    };
  }

  function generateSalesData() {
    const topProducts = state.products
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 8);

    return {
      labels: topProducts.map(p => p.name.substring(0, 20) + (p.name.length > 20 ? '...' : '')),
      data: topProducts.map(p => p.sold)
    };
  }

  function generateReportsData() {
    return {
      revenueByMonth: generateRevenueData(),
      revenueByCategory: generateCategoryData(),
      ordersByStatus: generateOrdersData(),
      topProducts: state.products.sort((a, b) => b.sold - a.sold).slice(0, 10),
      monthlySummary: {
        revenue: calculateTotalRevenue(),
        orders: state.orders.length,
        newCustomers: state.users.filter(u => {
          const joinDate = new Date(u.joinDate.split('/').reverse().join('-'));
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return joinDate > monthAgo;
        }).length
      }
    };
  }

  /* =========================
     6) TÍNH TOÁN THỐNG KÊ
     ========================= */
  function calculateTotalRevenue() {
    return state.orders
      .filter(o => o.status === 'completed')
      .reduce((sum, order) => sum + order.total, 0);
  }

  function updateDashboardStats() {
    const totalRevenue = calculateTotalRevenue();
    const totalOrders = state.orders.length;
    const totalProducts = state.products.length;
    const totalUsers = state.users.length;

    // Cập nhật thẻ thống kê
    const statsCards = $$('.stat-card');
    if (statsCards.length >= 4) {
      statsCards[0].querySelector('p').textContent = formatCurrency(totalRevenue);
      statsCards[1].querySelector('p').textContent = totalOrders.toLocaleString('vi-VN');
      statsCards[2].querySelector('p').textContent = totalProducts.toLocaleString('vi-VN');
      statsCards[3].querySelector('p').textContent = totalUsers.toLocaleString('vi-VN');
    }

    // Cập nhật sản phẩm bán chạy ở dashboard
    renderTopProductsDashboard();
  }
  /* =========================
     7) RENDER FUNCTIONS - CẢI THIỆN
     ========================= */
  function renderProductsTable(list = state.products) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
            <div class="empty-state">
                <i class="fas fa-cube fa-3x"></i>
                <h4>Không có sản phẩm nào</h4>
                <p>Hãy thêm sản phẩm mới để bắt đầu</p>
                <button class="btn-primary" id="addFirstProduct">
                <i class="fas fa-plus"></i> Thêm sản phẩm đầu tiên
                </button>
            </div>
            </td>
        </tr>
        `;
      $('#addFirstProduct')?.addEventListener('click', openAddProduct);
      return;
    }

    list.forEach(product => {
      const stockStatus = product.stock <= (product.minStock || 10) ? 'low' :
        product.stock < 20 ? 'warning' : 'normal';
      const statusText = product.status === 'active' ? 'Đang bán' :
        product.status === 'inactive' ? 'Ngừng bán' : 'Hết hàng';
      const statusClass = product.status === 'active' ? 'status-completed' :
        product.status === 'inactive' ? 'status-pending' : 'status-cancelled';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
            <div class="code-cell">
                ${product.code}
                ${product.featured ? '<span class="featured-badge">Nổi bật</span>' : ''}
            </div>
        </td>
        <td>
            <div class="product-cell">
            <div class="product-img-small">
                ${product.image && product.image !== 'cube' ?
          `<img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">` :
          `<i class="fas fa-${product.image || 'cube'}"></i>`
        }
            </div>
            <div class="product-info">
                <strong>${product.name}</strong>
                ${product.oldPrice ? `<small style="color: #ef4444; text-decoration: line-through;">${formatCurrency(product.oldPrice)}</small>` : ''}
            </div>
            </div>
        </td>
        <td>${product.category}</td>
        <td>
            <div class="price-cell">
                <strong>${formatCurrency(product.price)}</strong>
                ${product.oldPrice ? `<span class="discount">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>` : ''}
            </div>
        </td>
        <td>
            <span class="stock-badge ${stockStatus}">
            ${product.stock}
            </span>
        </td>
        <td>${product.sold}</td>
        <td>
            <span class="order-status ${statusClass}">${statusText}</span>
        </td>
        <td>
            <div class="table-actions">
            <button class="btn-action btn-view" data-action="viewProduct" data-id="${product.id}" title="Xem chi tiết">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-action btn-edit" data-action="editProduct" data-id="${product.id}" title="Sửa">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" data-action="deleteProduct" data-id="${product.id}" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
            </div>
        </td>
        `;
      tbody.appendChild(row);
    });
  }

  function renderCategoriesTable(list = state.categories) {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">
            <div class="empty-state">
              <i class="fas fa-list fa-3x"></i>
              <h4>Không có danh mục nào</h4>
              <p>Hãy thêm danh mục mới để bắt đầu</p>
              <button class="btn-primary" id="addFirstCategory">
                <i class="fas fa-plus"></i> Thêm danh mục đầu tiên
              </button>
            </div>
          </td>
        </tr>
      `;
      $('#addFirstCategory')?.addEventListener('click', openAddCategory);
      return;
    }

    list.forEach(category => {
      const statusClass = category.status === 'active' ? 'status-completed' : 'status-cancelled';
      const statusText = category.status === 'active' ? 'Hiển thị' : 'Ẩn';
      const productCount = state.products.filter(p => p.category === category.name).length;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${category.code}</td>
        <td>
          <div class="category-cell">
            <div class="category-icon">
              <i class="fas fa-${category.icon || 'folder'}"></i>
            </div>
            <div class="category-info">
              <strong>${category.name}</strong>
              <small>${(category.description || '').substring(0, 50)}...</small>
            </div>
          </div>
        </td>
        <td>
          <span class="product-count-badge">${productCount} sản phẩm</span>
        </td>
        <td>${category.description || 'Không có mô tả'}</td>
        <td><span class="order-status ${statusClass}">${statusText}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-action btn-edit" data-action="editCategory" data-id="${category.id}" title="Sửa">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" data-action="deleteCategory" data-id="${category.id}" title="Xóa">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderOrdersTable(list = state.orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">
            <div class="empty-state">
              <i class="fas fa-shopping-cart fa-3x"></i>
              <h4>Không có đơn hàng nào</h4>
              <p>Chưa có đơn hàng nào được tạo</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    list.forEach(order => {
      const statusClass = order.status === 'completed' ? 'status-completed' :
        order.status === 'processing' ? 'status-processing' :
          order.status === 'pending' ? 'status-pending' : 'status-cancelled';
      const statusText = order.status === 'completed' ? 'Đã giao' :
        order.status === 'processing' ? 'Đang xử lý' :
          order.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.code}</td>
        <td>
          <div class="customer-cell">
            <strong>${order.customer}</strong>
            <small><i class="fas fa-phone"></i> ${order.customerPhone}</small>
          </div>
        </td>
        <td>${order.date}</td>
        <td>${order.items}</td>
        <td>${formatCurrency(order.total)}</td>
        <td><span class="order-status ${statusClass}">${statusText}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-action btn-view" data-action="viewOrder" data-id="${order.id}" title="Xem chi tiết">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-action btn-edit" data-action="editOrder" data-id="${order.id}" title="Cập nhật trạng thái">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" data-action="deleteOrder" data-id="${order.id}" title="Xóa">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderUsersTable(list = state.users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">
            <div class="empty-state">
              <i class="fas fa-users fa-3x"></i>
              <h4>Không có người dùng nào</h4>
              <p>Hãy thêm người dùng mới để bắt đầu</p>
              <button class="btn-primary" id="addFirstUser">
                <i class="fas fa-plus"></i> Thêm người dùng đầu tiên
              </button>
            </div>
          </td>
        </tr>
      `;
      $('#addFirstUser')?.addEventListener('click', openAddUser);
      return;
    }

    list.forEach(user => {
      const roleClass = user.role === 'admin' ? 'status-processing' : 'status-completed';
      const roleText = user.role === 'admin' ? 'Quản trị' : user.role === 'staff' ? 'Nhân viên' : 'Khách hàng';
      const statusText = user.status === 'active' ? 'Hoạt động' : 'Không hoạt động';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.code}</td>
        <td>
          <div class="user-cell">
            <div class="user-avatar-small">
              ${user.name.charAt(0)}
            </div>
            <div class="user-info">
              <strong>${user.name}</strong>
              <small>${user.email}</small>
            </div>
          </div>
        </td>
        <td>${user.email}</td>
        <td>${user.phone || 'Chưa cập nhật'}</td>
        <td><span class="order-status ${roleClass}">${roleText}</span></td>
        <td>${user.joinDate}</td>
        <td>
          <div class="table-actions">
            <button class="btn-action btn-view" data-action="viewUser" data-id="${user.id}" title="Xem chi tiết">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-action btn-edit" data-action="editUser" data-id="${user.id}" title="Sửa">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" data-action="deleteUser" data-id="${user.id}" title="Xóa">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    if (!tbody) return;

    const recentOrders = state.orders.slice(0, 5);
    tbody.innerHTML = '';

    recentOrders.forEach(order => {
      const statusClass = order.status === 'completed' ? 'status-completed' :
        order.status === 'processing' ? 'status-processing' :
          order.status === 'pending' ? 'status-pending' : 'status-cancelled';
      const statusText = order.status === 'completed' ? 'Đã giao' :
        order.status === 'processing' ? 'Đang xử lý' :
          order.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.code}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>${formatCurrency(order.total)}</td>
        <td><span class="order-status ${statusClass}">${statusText}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-action btn-view" data-action="viewOrder" data-id="${order.id}" title="Xem chi tiết">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-action btn-edit" data-action="editOrder" data-id="${order.id}" title="Cập nhật trạng thái">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderTopProducts() {
    const container = $('.top-products-list');
    if (!container) return;

    const topProducts = state.products
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    container.innerHTML = '';
    topProducts.forEach((product, index) => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <div class="product-rank">${index + 1}</div>
        <div class="product-img">
            <i class="fas fa-${product.image || 'cube'}"></i>
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <small>${formatCurrency(product.price * product.sold)}</small>
        </div>
        `;
      container.appendChild(item);
    });
  }

  function renderTopProductsDashboard() {
    const container = $('.top-products-list');
    if (!container) return;

    const topProducts = state.products
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    container.innerHTML = '';
    topProducts.forEach((product, index) => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
      <div class="product-rank">${index + 1}</div>
      <div class="product-img">
        <i class="fas fa-${product.image || 'cube'}"></i>
      </div>
      <div class="product-info">
        <h4>${product.name}</h4>
      </div>
      <div class="product-sales">
        <p>${product.sold} lượt</p>
        <span><i class="fas fa-chart-line"></i> ${Math.floor(Math.random() * 20) + 5}%</span>
      </div>
    `;
      container.appendChild(item);
    });
  }

  function populateCategorySelect() {
    const select = document.getElementById('productCategory');
    if (!select) return;

    select.innerHTML = '<option value="">Chọn danh mục</option>';
    state.categories.forEach(category => {
      if (category.status === 'active') {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
      }
    });
  }

  /* =========================
     8) CRUD OPERATIONS - VỚI DIALOG CHUYÊN NGHIỆP
     ========================= */

  // PRODUCT DIALOGS
  function viewProduct(id) {
    const product = state.products.find(p => p.id === id);
    if (!product) {
      showNotification('Không tìm thấy sản phẩm!', 'error');
      return;
    }

    // Handle product image
    const imageContainer = $('#detailProductImageContainer');
    const productImage = $('#detailProductImage');
    const productIcon = $('#detailProductIcon');

    if (product.image && product.image !== 'cube') {
      productImage.src = product.image;
      productImage.style.display = 'block';
      productIcon.style.display = 'none';
    } else {
      productImage.style.display = 'none';
      productIcon.style.display = 'flex';
      // Update icon based on product image field
      const iconElement = productIcon.querySelector('i');
      iconElement.className = `fas fa-${product.image || 'cube'}`;
    }

    // Populate basic information
    $('#detailProductName').textContent = product.name;
    $('#detailProductCode').textContent = product.code;
    $('#detailProductCategory').textContent = product.category;
    $('#detailProductPrice').textContent = formatCurrency(product.price);
    $('#detailProductStock').textContent = product.stock;
    $('#detailProductSold').textContent = product.sold;

    // Status badge
    const statusElement = $('#detailProductStatus');
    const statusText = product.status === 'active' ? 'Đang bán' :
      product.status === 'inactive' ? 'Ngừng bán' : 'Hết hàng';
    const statusClass = product.status === 'active' ? 'status-completed' :
      product.status === 'inactive' ? 'status-pending' : 'status-cancelled';
    statusElement.textContent = statusText;
    statusElement.className = `status-badge ${statusClass}`;

    // Additional information
    $('#detailProductCreatedAt').textContent = product.createdAt || 'N/A';
    $('#detailProductUpdatedAt').textContent = product.updatedAt || product.createdAt || 'N/A';

    // Calculate statistics
    const totalProducts = state.products.length;
    const salesRate = totalProducts > 0 ? ((product.sold / totalProducts) * 100).toFixed(1) : 0;
    $('#detailProductSalesRate').textContent = `${salesRate}%`;

    const revenue = product.price * product.sold;
    $('#detailProductRevenue').textContent = formatCurrency(revenue);

    // Calculate rank
    const sortedBySales = [...state.products].sort((a, b) => b.sold - a.sold);
    const rank = sortedBySales.findIndex(p => p.id === product.id) + 1;
    $('#detailProductRank').textContent = `Top ${rank}/${totalProducts}`;

    // Description
    $('#detailProductDescription').textContent = product.description || '';

    // Update subtitle
    $('#detailProductSubtitle').textContent = `Mã: ${product.code} • Danh mục: ${product.category}`;

    // Setup edit button
    $('#editProductFromDetail').onclick = function () {
      closeModal('productDetailModal');
      openEditProduct(id);
    };

    openModal('productDetailModal');
  }

  function openAddProduct() {
    clearProductForm();
    $('#productModalTitle').textContent = 'Thêm Sản Phẩm Mới';
    $('#productModalSubtitle').textContent = 'Điền thông tin chi tiết cho sản phẩm';
    openModal('addProductModal');
  }

  function openEditProduct(id) {
    const product = state.products.find(p => p.id === id);
    if (!product) {
      showNotification('Không tìm thấy sản phẩm!', 'error');
      return;
    }

    $('#productModalTitle').textContent = 'Chỉnh Sửa Sản Phẩm';
    $('#productModalSubtitle').textContent = `Đang chỉnh sửa: ${product.name}`;

    $('#productId').value = product.id;
    $('#productName').value = product.name;
    $('#productCode').value = product.code;
    $('#productCategory').value = product.category;
    $('#productPrice').value = product.price;
    $('#productOldPrice').value = product.oldPrice || '';
    $('#productStock').value = product.stock;
    $('#productMinStock').value = product.minStock || 10;
    $('#productDescription').value = product.description || '';
    $('#productStatus').value = product.status || 'active';
    $('#productFeatured').checked = product.featured || false;

    // Handle image preview if exists
    if (product.image && product.image !== 'cube') {
      const imagePreview = $('#imagePreview');
      const previewImg = $('#previewImg');
      const placeholder = $('#imageUploadArea').querySelector('.image-upload-placeholder');

      previewImg.src = product.image;
      imagePreview.style.display = 'block';
      placeholder.style.display = 'none';
    }

    openModal('addProductModal');
  }

  function clearProductForm() {
    $('#productId').value = '';
    $('#productName').value = '';
    $('#productCategory').value = '';
    $('#productCode').value = '';
    $('#productPrice').value = '';
    $('#productOldPrice').value = '';
    $('#productStock').value = '';
    $('#productMinStock').value = '10';
    $('#productDescription').value = '';
    $('#productStatus').value = 'active';
    $('#productFeatured').checked = false;

    // Clear image
    const imagePreview = $('#imagePreview');
    const imageUploadArea = $('#imageUploadArea');
    const placeholder = imageUploadArea.querySelector('.image-upload-placeholder');

    imagePreview.style.display = 'none';
    placeholder.style.display = 'block';
    $('#productImage').value = '';
  }

  function saveProduct() {
    const id = parseInt($('#productId').value);
    const name = $('#productName').value.trim();
    const code = $('#productCode').value.trim() || generateProductCode();
    const category = $('#productCategory').value;
    const price = parseFloat($('#productPrice').value);
    const oldPrice = parseFloat($('#productOldPrice').value) || 0;
    const stock = parseInt($('#productStock').value);
    const minStock = parseInt($('#productMinStock').value) || 10;
    const description = $('#productDescription').value.trim();
    const status = $('#productStatus').value;
    const featured = $('#productFeatured').checked;

    // Enhanced Validation
    if (!name) {
      showNotification('Vui lòng nhập tên sản phẩm!', 'error');
      $('#productName').focus();
      return;
    }

    if (!category) {
      showNotification('Vui lòng chọn danh mục!', 'error');
      $('#productCategory').focus();
      return;
    }

    if (!price || price <= 0) {
      showNotification('Giá bán phải lớn hơn 0!', 'error');
      $('#productPrice').focus();
      return;
    }

    if (oldPrice > 0 && oldPrice <= price) {
      showNotification('Giá gốc phải cao hơn giá bán!', 'error');
      $('#productOldPrice').focus();
      return;
    }

    if (stock < 0) {
      showNotification('Số lượng tồn kho không được âm!', 'error');
      $('#productStock').focus();
      return;
    }

    // Check for duplicate code
    const existingProduct = state.products.find(p => p.code === code && p.id !== id);
    if (existingProduct) {
      showNotification('Mã sản phẩm đã tồn tại!', 'error');
      $('#productCode').focus();
      return;
    }

    // Handle image
    let image = 'cube'; // default icon
    const imageFile = $('#productImage').files[0];
    if (imageFile) {
      // In a real app, you'd upload to server. For demo, we'll use object URL
      image = URL.createObjectURL(imageFile);
    }

    if (id) {
      // Update existing product
      const index = state.products.findIndex(p => p.id === id);
      if (index !== -1) {
        const oldImage = state.products[index].image;
        state.products[index] = {
          ...state.products[index],
          name,
          code,
          category,
          price,
          oldPrice: oldPrice || undefined,
          stock,
          minStock,
          description,
          status,
          featured,
          image: imageFile ? image : (state.products[index].image || 'cube'),
          updatedAt: formatDate()
        };

        // Clean up old object URL if it was created by us
        if (oldImage && oldImage.startsWith('blob:') && oldImage !== image) {
          URL.revokeObjectURL(oldImage);
        }

        showNotification('Cập nhật sản phẩm thành công!', 'success');
      }
    } else {
      // Add new product
      const newProduct = {
        id: state.ids.product++,
        code,
        name,
        category,
        price,
        oldPrice: oldPrice || undefined,
        stock,
        minStock,
        sold: 0,
        description,
        status,
        featured,
        image,
        createdAt: formatDate()
      };
      state.products.unshift(newProduct);
      showNotification('Thêm sản phẩm mới thành công!', 'success');
    }

    // Update product count in category
    updateCategoryProductCounts();

    // Save and refresh
    saveToStorage();
    renderProductsTable();
    renderTopProductsDashboard();
    updateDashboardStats();
    closeModal('addProductModal');
  }

  function generateProductCode() {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TOY${timestamp}${random}`;
  }

  function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
      showNotification('Vui lòng chọn file hình ảnh!', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showNotification('Kích thước file không được vượt quá 5MB!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = $('#imagePreview');
      const previewImg = $('#previewImg');
      const placeholder = $('#imageUploadArea').querySelector('.image-upload-placeholder');

      if (previewImg && imagePreview && placeholder) {
        previewImg.src = e.target.result;
        imagePreview.style.display = 'block';
        placeholder.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  }
  function showDeleteProductDialog(id) {
    const product = state.products.find(p => p.id === id);
    if (!product) return;

    $('#deleteConfirmTitle').textContent = 'Xác nhận xóa sản phẩm';
    $('#deleteConfirmMessage').innerHTML = `
      <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      <div class="delete-preview">
        <div class="preview-item">
          <i class="fas fa-cube"></i>
          <div>
            <strong>${product.name}</strong>
            <small>${product.code} - ${product.category}</small>
          </div>
        </div>
      </div>
      <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Hành động này không thể hoàn tác.</p>
    `;

    $('#confirmDeleteBtn').onclick = function () {
      deleteProduct(id);
      closeModal('deleteConfirmModal');
    };

    openModal('deleteConfirmModal');
  }

  function deleteProduct(id) {
    const index = state.products.findIndex(p => p.id === id);
    if (index !== -1) {
      state.products.splice(index, 1);
      showNotification('Đã xóa sản phẩm thành công!', 'success');

      saveToStorage();
      renderProductsTable();
      renderTopProducts();
      updateDashboardStats();
    }
  }

  // CATEGORY DIALOGS
  function openAddCategory() {
    clearCategoryForm();
    $('#categoryModalTitle').textContent = 'Thêm Danh Mục Mới';
    openModal('addCategoryModal');
  }

  function openEditCategory(id) {
    const category = state.categories.find(c => c.id === id);
    if (!category) {
      showNotification('Không tìm thấy danh mục!', 'error');
      return;
    }

    $('#categoryModalTitle').textContent = 'Sửa Danh Mục';
    $('#categoryId').value = category.id;
    $('#categoryName').value = category.name;
    $('#categoryDescription').value = category.description || '';
    $('#categoryStatus').value = category.status;

    openModal('addCategoryModal');
  }

  function clearCategoryForm() {
    $('#categoryId').value = '';
    $('#categoryName').value = '';
    $('#categoryDescription').value = '';
    $('#categoryStatus').value = 'active';
  }

  function saveCategory() {
    const id = parseInt($('#categoryId').value);
    const name = $('#categoryName').value.trim();
    const description = $('#categoryDescription').value.trim();
    const status = $('#categoryStatus').value;

    if (!name) {
      showNotification('Vui lòng nhập tên danh mục!', 'error');
      return;
    }

    if (id) {
      // Update existing category
      const index = state.categories.findIndex(c => c.id === id);
      if (index !== -1) {
        const oldName = state.categories[index].name;
        state.categories[index] = {
          ...state.categories[index],
          name,
          description,
          status
        };

        // Update all products in this category
        if (oldName !== name) {
          state.products.forEach(product => {
            if (product.category === oldName) {
              product.category = name;
            }
          });
        }

        showNotification('Cập nhật danh mục thành công!', 'success');
      }
    } else {
      // Add new category
      const newCategory = {
        id: state.ids.category++,
        code: `#CAT${String(state.ids.category).padStart(3, '0')}`,
        name,
        productCount: 0,
        description,
        status,
        icon: 'folder',
        createdAt: formatDate()
      };
      state.categories.unshift(newCategory);
      showNotification('Thêm danh mục mới thành công!', 'success');
    }

    saveToStorage();
    renderCategoriesTable();
    renderProductsTable();
    populateCategorySelect();
    closeModal('addCategoryModal');
  }

  function showDeleteCategoryDialog(id) {
    const category = state.categories.find(c => c.id === id);
    if (!category) return;

    // Check if category has products
    const hasProducts = state.products.some(p => p.category === category.name);

    $('#deleteConfirmTitle').textContent = 'Xác nhận xóa danh mục';

    if (hasProducts) {
      $('#deleteConfirmMessage').innerHTML = `
        <p>Không thể xóa danh mục <strong>"${category.name}"</strong>!</p>
        <div class="delete-preview warning">
          <i class="fas fa-exclamation-circle"></i>
          <div>
            <p>Danh mục này đang có <strong>${state.products.filter(p => p.category === category.name).length} sản phẩm</strong>.</p>
            <p>Vui lòng di chuyển hoặc xóa tất cả sản phẩm trước khi xóa danh mục.</p>
          </div>
        </div>
      `;
      $('#confirmDeleteBtn').style.display = 'none';
      $('#cancelDeleteBtn').textContent = 'Đã hiểu';
    } else {
      $('#deleteConfirmMessage').innerHTML = `
        <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
        <div class="delete-preview">
          <div class="preview-item">
            <i class="fas fa-folder"></i>
            <div>
              <strong>${category.name}</strong>
              <small>${category.code}</small>
            </div>
          </div>
        </div>
        <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Hành động này không thể hoàn tác.</p>
      `;
      $('#confirmDeleteBtn').style.display = 'block';
      $('#confirmDeleteBtn').onclick = function () {
        deleteCategory(id);
        closeModal('deleteConfirmModal');
      };
      $('#cancelDeleteBtn').textContent = 'Hủy';
    }

    openModal('deleteConfirmModal');
  }

  function deleteCategory(id) {
    const index = state.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      state.categories.splice(index, 1);
      showNotification('Đã xóa danh mục thành công!', 'success');

      saveToStorage();
      renderCategoriesTable();
      populateCategorySelect();
    }
  }

  // USER DIALOGS
  function openAddUser() {
    clearUserForm();
    $('#userModalTitle').textContent = 'Thêm Người Dùng Mới';
    openModal('addUserModal');
  }

  function openEditUser(id) {
    const user = state.users.find(u => u.id === id);
    if (!user) {
      showNotification('Không tìm thấy người dùng!', 'error');
      return;
    }

    $('#userModalTitle').textContent = 'Sửa Thông Tin Người Dùng';
    $('#userId').value = user.id;
    $('#userFullName').value = user.name;
    $('#userEmail').value = user.email;
    $('#userPhone').value = user.phone || '';
    $('#userRole').value = user.role;
    $('#userStatus').value = user.status;

    openModal('addUserModal');
  }

  function clearUserForm() {
    $('#userId').value = '';
    $('#userFullName').value = '';
    $('#userEmail').value = '';
    $('#userPhone').value = '';
    $('#userRole').value = 'customer';
    $('#userStatus').value = 'active';
  }

  function saveUser() {
    const id = parseInt($('#userId').value);
    const name = $('#userFullName').value.trim();
    const email = $('#userEmail').value.trim();
    const phone = $('#userPhone').value.trim();
    const role = $('#userRole').value;
    const status = $('#userStatus').value;

    if (!name || !email) {
      showNotification('Vui lòng nhập đầy đủ họ tên và email!', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Email không hợp lệ!', 'error');
      return;
    }

    if (id) {
      const index = state.users.findIndex(u => u.id === id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          name,
          email,
          phone,
          role,
          status
        };
        showNotification('Cập nhật thông tin người dùng thành công!', 'success');
      }
    } else {
      const newUser = {
        id: state.ids.user++,
        code: `#USER${String(state.ids.user).padStart(3, '0')}`,
        name,
        email,
        phone,
        role,
        status,
        joinDate: formatDate(),
        totalOrders: 0,
        totalSpent: 0,
        address: ''
      };
      state.users.unshift(newUser);
      showNotification('Thêm người dùng mới thành công!', 'success');
    }

    saveToStorage();
    renderUsersTable();
    updateDashboardStats();
    closeModal('addUserModal');
  }

  function showDeleteUserDialog(id) {
    const user = state.users.find(u => u.id === id);
    if (!user) return;

    if (user.role === 'admin') {
      $('#deleteConfirmTitle').textContent = 'Không thể xóa';
      $('#deleteConfirmMessage').innerHTML = `
        <p>Không thể xóa tài khoản quản trị viên!</p>
        <div class="delete-preview warning">
          <i class="fas fa-exclamation-circle"></i>
          <div>
            <p>Tài khoản <strong>"${user.name}"</strong> có vai trò Quản trị viên.</p>
            <p>Vui lòng chuyển vai trò trước khi xóa tài khoản.</p>
          </div>
        </div>
      `;
      $('#confirmDeleteBtn').style.display = 'none';
      $('#cancelDeleteBtn').textContent = 'Đã hiểu';
    } else {
      $('#deleteConfirmTitle').textContent = 'Xác nhận xóa người dùng';
      $('#deleteConfirmMessage').innerHTML = `
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
        <div class="delete-preview">
          <div class="preview-item">
            <div class="user-avatar-small">${user.name.charAt(0)}</div>
            <div>
              <strong>${user.name}</strong>
              <small>${user.email} - ${user.role === 'admin' ? 'Quản trị' : 'Khách hàng'}</small>
            </div>
          </div>
        </div>
        <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Hành động này không thể hoàn tác.</p>
      `;
      $('#confirmDeleteBtn').style.display = 'block';
      $('#confirmDeleteBtn').onclick = function () {
        deleteUser(id);
        closeModal('deleteConfirmModal');
      };
      $('#cancelDeleteBtn').textContent = 'Hủy';
    }

    openModal('deleteConfirmModal');
  }

  function deleteUser(id) {
    const index = state.users.findIndex(u => u.id === id);
    if (index !== -1) {
      state.users.splice(index, 1);
      showNotification('Đã xóa người dùng thành công!', 'success');

      saveToStorage();
      renderUsersTable();
      updateDashboardStats();
    }
  }

  // ORDER DIALOGS
  function viewOrder(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) {
      showNotification('Không tìm thấy đơn hàng!', 'error');
      return;
    }

    // Header information
    $('#detailOrderCode').textContent = order.code;
    $('#detailOrderDate').textContent = order.date;
    $('#detailOrderTotal').textContent = formatCurrency(order.total);
    $('#detailOrderSubtitle').textContent = `Khách hàng: ${order.customer} • ${order.date}`;

    // Status
    const statusElement = $('#detailOrderStatus');
    const statusText = order.status === 'completed' ? 'Đã giao' :
      order.status === 'processing' ? 'Đang xử lý' :
        order.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy';
    const statusClass = order.status === 'completed' ? 'status-completed' :
      order.status === 'processing' ? 'status-processing' :
        order.status === 'pending' ? 'status-pending' : 'status-cancelled';
    statusElement.textContent = statusText;
    statusElement.className = `order-status ${statusClass}`;

    // Customer information
    $('#detailOrderCustomer').textContent = order.customer;
    $('#detailOrderPhone').textContent = order.customerPhone;
    $('#detailOrderPayment').textContent = order.paymentMethod || 'COD';

    // Shipping address
    $('#detailOrderAddress').textContent = order.shippingAddress;

    // Order items count
    $('#detailOrderItems').textContent = order.items;
    $('#summaryItems').textContent = order.items;
    $('#summaryTotal').textContent = formatCurrency(order.total);

    // Products list with enhanced display
    const productsList = $('#detailOrderProducts');
    productsList.innerHTML = '';

    order.products.forEach((productName, index) => {
      // Find product details from state
      const product = state.products.find(p => p.name === productName);
      const itemDiv = document.createElement('div');
      itemDiv.className = 'order-item';

      itemDiv.innerHTML = `
        <div class="order-item-icon">
          ${product && product.image && product.image !== 'cube' ?
          `<img src="${product.image}" alt="${productName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">` :
          `<i class="fas fa-${product ? product.image || 'cube' : 'cube'}"></i>`
        }
        </div>
        <div class="order-item-details">
          <div class="order-item-name">${productName}</div>
          <div class="order-item-meta">
            ${product ? `Mã: ${product.code} • Danh mục: ${product.category}` : 'Chi tiết sản phẩm'}
          </div>
        </div>
        <div class="order-item-price">
          ${product ? formatCurrency(product.price) : 'N/A'}
        </div>
      `;

      productsList.appendChild(itemDiv);
    });

    // Setup action buttons
    $('#editOrderStatusFromDetail').onclick = function () {
      closeModal('orderDetailModal');
      showEditOrderStatusDialog(id);
    };

    $('#printOrderDetail').onclick = function () {
      // Basic print functionality
      window.print();
    };

    openModal('orderDetailModal');
  }

  function viewUser(id) {
    const user = state.users.find(u => u.id === id);
    if (!user) {
      showNotification('Không tìm thấy người dùng!', 'error');
      return;
    }

    // Profile header
    $('#detailUserInitial').textContent = user.name.charAt(0).toUpperCase();
    $('#detailUserName').textContent = user.name;
    $('#detailUserSubtitle').textContent = `Mã: ${user.code} • Tham gia: ${user.joinDate}`;

    // Role badge
    const roleElement = $('#detailUserRole');
    const roleText = user.role === 'admin' ? 'Quản trị viên' :
      user.role === 'staff' ? 'Nhân viên' : 'Khách hàng';
    const roleClass = user.role === 'admin' ? 'status-processing' :
      user.role === 'staff' ? 'status-pending' : 'status-completed';
    roleElement.textContent = roleText;
    roleElement.className = `role-badge ${roleClass}`;

    // Status indicator
    const statusElement = $('#detailUserStatus');
    const statusText = user.status === 'active' ? 'Hoạt động' :
      user.status === 'inactive' ? 'Không hoạt động' : 'Bị khóa';
    const statusClass = user.status === 'active' ? 'status-completed' :
      user.status === 'inactive' ? 'status-pending' : 'status-cancelled';
    statusElement.textContent = statusText;
    statusElement.className = `status-indicator ${statusClass}`;

    // Stats summary
    $('#detailUserOrders').textContent = user.totalOrders || 0;
    $('#detailUserSpent').textContent = formatCurrency(user.totalSpent || 0);

    // Personal information
    $('#detailUserFullName').textContent = user.name;
    $('#detailUserEmail').textContent = user.email;
    $('#detailUserPhone').textContent = user.phone || 'Chưa cập nhật';
    $('#detailUserJoinDate').textContent = user.joinDate;

    // Statistics
    $('#detailUserTotalOrders').textContent = user.totalOrders || 0;
    $('#detailUserTotalSpent').textContent = formatCurrency(user.totalSpent || 0);

    // Calculate last order
    const userOrders = state.orders.filter(o => o.customer === user.name);
    const lastOrder = userOrders.length > 0 ? userOrders.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')))[0] : null;
    $('#detailUserLastOrder').textContent = lastOrder ? lastOrder.date : 'Chưa có đơn hàng';

    // Calculate average order value
    const avgOrder = user.totalOrders > 0 ? user.totalSpent / user.totalOrders : 0;
    $('#detailUserAvgOrder').textContent = formatCurrency(avgOrder);

    // Recent orders section
    const recentOrdersSection = $('#userRecentOrdersSection');
    const recentOrdersList = $('#detailUserRecentOrders');

    if (userOrders.length > 0) {
      recentOrdersSection.style.display = 'block';
      recentOrdersList.innerHTML = '';

      const recentOrders = userOrders.slice(0, 3); // Show last 3 orders
      recentOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'user-order-item';

        const statusClass = order.status === 'completed' ? 'status-completed' :
          order.status === 'processing' ? 'status-processing' :
            order.status === 'pending' ? 'status-pending' : 'status-cancelled';
        const statusText = order.status === 'completed' ? 'Đã giao' :
          order.status === 'processing' ? 'Đang xử lý' :
            order.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy';

        orderItem.innerHTML = `
          <div class="user-order-code">${order.code}</div>
          <div class="user-order-date">${order.date}</div>
          <div class="user-order-total">${formatCurrency(order.total)}</div>
          <span class="order-status ${statusClass}">${statusText}</span>
        `;

        recentOrdersList.appendChild(orderItem);
      });
    } else {
      recentOrdersSection.style.display = 'none';
    }

    // Setup action buttons
    $('#editUserFromDetail').onclick = function () {
      closeModal('userDetailModal');
      openEditUser(id);
    };

    $('#sendMessageToUser').onclick = function () {
      showNotification(`Tính năng gửi tin nhắn cho ${user.name} đang được phát triển!`, 'info');
    };

    openModal('userDetailModal');
  }

  function showEditOrderStatusDialog(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    $('#statusOrderCode').textContent = order.code;
    $('#statusOrderCustomer').textContent = order.customer;
    $('#orderStatusSelect').value = order.status;

    $('#saveStatusBtn').onclick = function () {
      editOrderStatus(id, $('#orderStatusSelect').value);
      closeModal('editOrderStatusModal');
    };

    openModal('editOrderStatusModal');
  }

  function editOrderStatus(id, newStatus) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    order.status = newStatus;
    showNotification(`Đã cập nhật trạng thái đơn hàng ${order.code}`, 'success');

    saveToStorage();
    renderOrdersTable();
    renderRecentOrders();
  }

  function showDeleteOrderDialog(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    $('#deleteConfirmTitle').textContent = 'Xác nhận xóa đơn hàng';
    $('#deleteConfirmMessage').innerHTML = `
      <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>
      <div class="delete-preview">
        <div class="preview-item">
          <i class="fas fa-shopping-cart"></i>
          <div>
            <strong>${order.code}</strong>
            <small>${order.customer} - ${formatCurrency(order.total)}</small>
          </div>
        </div>
      </div>
      <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Hành động này không thể hoàn tác.</p>
    `;

    $('#confirmDeleteBtn').onclick = function () {
      deleteOrder(id);
      closeModal('deleteConfirmModal');
    };

    openModal('deleteConfirmModal');
  }

  function deleteOrder(id) {
    const index = state.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      state.orders.splice(index, 1);
      showNotification('Đã xóa đơn hàng thành công!', 'success');

      saveToStorage();
      renderOrdersTable();
      renderRecentOrders();
      updateDashboardStats();
    }
  }

  function updateCategoryProductCounts() {
    state.categories.forEach(category => {
      category.productCount = state.products.filter(p => p.category === category.name).length;
    });
  }

  /* =========================
     9) SEARCH & FILTER
     ========================= */
  function initSearch() {
    const searchInput = $('#searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      const activePage = $('.page-content.active')?.id;

      if (!activePage) return;

      switch (activePage) {
        case 'products':
          searchProducts(searchTerm);
          break;
        case 'categories':
          searchCategories(searchTerm);
          break;
        case 'orders':
          searchOrders(searchTerm);
          break;
        case 'users':
          searchUsers(searchTerm);
          break;
      }
    });
  }

  function searchProducts(term) {
    if (!term) {
      renderProductsTable();
      return;
    }

    const filtered = state.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.code.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      (product.description || '').toLowerCase().includes(term)
    );

    renderProductsTable(filtered);
  }

  function searchCategories(term) {
    if (!term) {
      renderCategoriesTable();
      return;
    }

    const filtered = state.categories.filter(category =>
      category.name.toLowerCase().includes(term) ||
      (category.description || '').toLowerCase().includes(term)
    );

    renderCategoriesTable(filtered);
  }

  function searchOrders(term) {
    if (!term) {
      renderOrdersTable();
      return;
    }

    const filtered = state.orders.filter(order =>
      order.code.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.customerPhone.toLowerCase().includes(term)
    );

    renderOrdersTable(filtered);
  }

  function searchUsers(term) {
    if (!term) {
      renderUsersTable();
      return;
    }

    const filtered = state.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.code.toLowerCase().includes(term)
    );

    renderUsersTable(filtered);
  }

  function initOrderFilter() {
    const filterSelect = $('#orderStatusFilter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', function (e) {
      const status = e.target.value;
      filterOrdersByStatus(status);
    });
  }

  function filterOrdersByStatus(status) {
    if (status === 'all') {
      renderOrdersTable();
      return;
    }

    const filtered = state.orders.filter(order => order.status === status);
    renderOrdersTable(filtered);
  }

  /* =========================
     10) DARK MODE
     ========================= */
  function initDarkMode() {
    const toggle = $('#darkModeToggle');
    if (!toggle) return;

    const isDarkMode = localStorage.getItem('kidtoystore_darkmode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    }

    toggle.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('kidtoystore_darkmode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('kidtoystore_darkmode', 'false');
      }
    });
  }

  /* =========================
     11) ROUTING & NAVIGATION
     ========================= */
  function initRouting() {
    const menuItems = $$('.menu-item[data-page]');
    const pages = $$('.page-content');
    const pageTitle = $('#pageTitle');

    menuItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();

        const pageName = this.getAttribute('data-page');
        const pageTitleText = this.querySelector('span').textContent;

        // Update active states
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        pages.forEach(page => page.classList.remove('active'));
        const targetPage = $(`#${pageName}`);
        if (targetPage) targetPage.classList.add('active');

        // Update page title
        if (pageTitle) {
          pageTitle.textContent = pageTitleText;
        }

        // Initialize charts if on dashboard or reports
        if (pageName === 'dashboard' || pageName === 'reports') {
          setTimeout(() => {
            initCharts();
            updateDashboardStats();
          }, 100);
        }
      });
    });
  }

  /* =========================
     12) EVENT DELEGATION - CẬP NHẬT VỚI DIALOG
     ========================= */
  function initEventDelegation() {
    // User dropdown toggle
    const userAccount = $('#userAccount');
    const userMenu = $('#userMenu');

    if (userAccount && userMenu) {
      // Add click event to the entire user account area
      userAccount.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = userAccount.classList.contains('active');
        userAccount.classList.toggle('active');
        userMenu.classList.toggle('active');

        // Debug log
        console.log('User dropdown clicked, active:', !isActive);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!userAccount.contains(e.target)) {
          userAccount.classList.remove('active');
          userMenu.classList.remove('active');
        }
      });
    } else {
      console.error('User account elements not found:', { userAccount, userMenu });
    }

    // Table action buttons với dialog
    document.addEventListener('click', function (e) {
      const actionBtn = e.target.closest('.btn-action');
      if (!actionBtn) return;

      const action = actionBtn.getAttribute('data-action');
      const id = parseInt(actionBtn.getAttribute('data-id'));

      if (!action || isNaN(id)) return;

      e.stopPropagation();

      switch (action) {
        // Product actions
        case 'viewProduct':
          viewProduct(id);
          break;
        case 'editProduct':
          openEditProduct(id);
          break;
        case 'deleteProduct':
          showDeleteProductDialog(id);
          break;

        // Category actions
        case 'editCategory':
          openEditCategory(id);
          break;
        case 'deleteCategory':
          showDeleteCategoryDialog(id);
          break;

        // User actions
        case 'viewUser':
          viewUser(id);
          break;
        case 'editUser':
          openEditUser(id);
          break;
        case 'deleteUser':
          showDeleteUserDialog(id);
          break;

        // Order actions
        case 'viewOrder':
          viewOrder(id);
          break;
        case 'editOrder':
          showEditOrderStatusDialog(id);
          break;
        case 'deleteOrder':
          showDeleteOrderDialog(id);
          break;
      }
    });

    // Add buttons
    $('#addProductBtn')?.addEventListener('click', openAddProduct);
    $('#addCategoryBtn')?.addEventListener('click', openAddCategory);
    $('#addUserBtn')?.addEventListener('click', openAddUser);

    // Save buttons
    $('#saveProductBtn')?.addEventListener('click', saveProduct);
    $('#saveCategoryBtn')?.addEventListener('click', saveCategory);
    $('#saveUserBtn')?.addEventListener('click', saveUser);

    // Export report
    $('#exportReportBtn')?.addEventListener('click', function () {
      const data = generateReportsData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `baocao_toystore_${formatDate(new Date()).replace(/\//g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showNotification('Đã xuất báo cáo thành công!', 'success');
    });

    // User menu items
    $$('.user-menu-item').forEach(item => {
      item.addEventListener('click', function (e) {
        const action = this.id;
        switch (action) {
          case 'logoutBtn':
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
              // Clear localStorage and redirect to login
              localStorage.clear();
              window.location.href = 'login.html';
            }
            break;
          default:
            // For other menu items, show a message for now
            const menuText = this.querySelector('span').textContent;
            showNotification(`${menuText} - Tính năng đang được phát triển`, 'info');
            break;
        }
      });
    });

    // Close modal buttons
    $$('.modal-close, .btn-secondary').forEach(btn => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) closeModal(modal.id);
      });
    });

    // Cancel delete button
    $('#cancelDeleteBtn')?.addEventListener('click', function () {
      closeModal('deleteConfirmModal');
    });

    // Close modals when clicking outside
    $$('.modal').forEach(modal => {
      modal.addEventListener('click', function (e) {
        if (e.target === this) {
          closeModal(this.id);
        }
      });
    });

    // Image upload functionality
    const imageUploadArea = $('#imageUploadArea');
    const productImageInput = $('#productImage');
    const imagePreview = $('#imagePreview');
    const previewImg = $('#previewImg');
    const removeImageBtn = $('#removeImageBtn');
    const placeholder = imageUploadArea?.querySelector('.image-upload-placeholder');

    if (imageUploadArea && productImageInput) {
      // Click to upload
      imageUploadArea.addEventListener('click', function (e) {
        if (e.target !== removeImageBtn) {
          productImageInput.click();
        }
      });

      // File selection
      productImageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
          handleImageUpload(file);
        }
      });

      // Drag and drop
      imageUploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        imageUploadArea.classList.add('drag-over');
      });

      imageUploadArea.addEventListener('dragleave', function (e) {
        e.preventDefault();
        imageUploadArea.classList.remove('drag-over');
      });

      imageUploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        imageUploadArea.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          handleImageUpload(file);
        } else {
          showNotification('Vui lòng chọn file hình ảnh!', 'error');
        }
      });

      // Remove image
      if (removeImageBtn) {
        removeImageBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          imagePreview.style.display = 'none';
          if (placeholder) placeholder.style.display = 'block';
          productImageInput.value = '';
          previewImg.src = '';
        });
      }
    }

    // Generate product code
    $('#generateCodeBtn')?.addEventListener('click', function () {
      $('#productCode').value = generateProductCode();
    });

    // Preview product
    $('#previewProductBtn')?.addEventListener('click', function () {
      const name = $('#productName').value.trim();
      const price = $('#productPrice').value;
      const category = $('#productCategory').value;

      if (!name || !price || !category) {
        showNotification('Vui lòng điền đầy đủ thông tin cơ bản trước khi xem trước!', 'warning');
        return;
      }

      // For demo, just show a notification. In real app, open preview modal
      showNotification('Tính năng xem trước đang được phát triển!', 'info');
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  /* =========================
     13) INITIALIZATION
     ========================= */
  // Trong hàm init()
  function init() {
    console.log('Đang khởi tạo Admin Dashboard...');

    // Initialize all components
    initRouting();
    initEventDelegation();
    initSearch();
    initOrderFilter();
    initDarkMode();

    // Initial render
    renderProductsTable();
    renderCategoriesTable();
    renderOrdersTable();
    renderUsersTable();
    renderRecentOrders();
    renderTopProductsDashboard(); // Đổi từ renderTopProducts()
    populateCategorySelect();
    updateDashboardStats();

    // Initialize charts after a short delay
    setTimeout(() => {
      initCharts();
      console.log('Dashboard đã sẵn sàng!');
    }, 500);

    // Save initial data to localStorage
    saveToStorage();

    showNotification('Hệ thống quản trị đã sẵn sàng! Chào mừng bạn trở lại!', 'success');
  }

  /* =========================
     14) EXPORT TO WINDOW
     ========================= */
  window.AdminDashboard = {
    init,
    state,
    saveToStorage,
    showNotification,
    formatCurrency,
    formatDate,
    initCharts
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();