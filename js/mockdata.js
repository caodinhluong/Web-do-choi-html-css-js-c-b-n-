// Helper functions for generating random codes
function generateProductCode() {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TOY${timestamp}${random}`;
}

function generateCategoryCode(id) {
    return `#CAT${String(id).padStart(3, '0')}`;
}

function generateUserCode(id) {
    return `#USER${String(id).padStart(3, '0')}`;
}

function generateOrderCode() {
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `#TOY-${random}`;
}

// Mock data for ToyStore Admin Dashboard
const mockData = {
    products: [
        {
            id: 1,
            code: generateProductCode(),
            name: "Xe Điều Khiển Từ Xa",
            category: "Đồ Chơi Công Nghệ",
            price: 450000,
            stock: 45,
            sold: 142,
            description: "Xe điều khiển từ xa 2.4GHz, pin sạc, điều khiển từ xa",
            createdAt: "2024-01-15",
            image: "img/sp3.png",
            status: "active"
        },
        {
            id: 2,
            code: generateProductCode(),
            name: "TRANG ÂU DÍU",
            category: "Đồ Chơi Giáo Dục",
            price: 320000,
            stock: 28,
            sold: 128,
            description: "Tớ là Lươn nè",
            createdAt: "2024-02-10",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 3,
            code: generateProductCode(),
            name: "Robot Biến Hình",
            category: "Đồ Chơi Hành Động",
            price: 680000,
            stock: 12,
            sold: 98,
            description: "Robot biến hình thành xe, có đèn và âm thanh",
            createdAt: "2024-03-05",
            image: "img/sp6.png",
            status: "active"
        },
        {
            id: 4,
            code: generateProductCode(),
            name: "Búp Bê Biết Nói",
            category: "Đồ Chơi Cho Bé Gái",
            price: 250000,
            stock: 32,
            sold: 87,
            description: "Búp bê biết nói 50 câu, có quần áo thay đổi",
            createdAt: "2024-01-20",
            image: "img/sp2.png",
            status: "active"
        },
        {
            id: 5,
            code: generateProductCode(),
            name: "Bộ Lắp Ghép LEGO",
            category: "Đồ Chơi Sáng Tạo",
            price: 1200000,
            stock: 8,
            sold: 76,
            description: "Bộ LEGO 1000 mảnh, dành cho trẻ từ 8 tuổi trở lên",
            createdAt: "2024-02-25",
            image: "img/sp1.png",
            status: "active"
        },
        {
            id: 6,
            code: generateProductCode(),
            name: "Ô Tô Điều Khiển Từ Xa Cao Cấp",
            category: "Đồ Chơi Công Nghệ",
            price: 850000,
            stock: 15,
            sold: 95,
            description: "Ô tô điều khiển từ xa với camera, tốc độ cao, pin lithium",
            createdAt: "2024-03-10",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 7,
            code: generateProductCode(),
            name: "Búp Bê Công Chúa",
            category: "Đồ Chơi Cho Bé Gái",
            price: 350000,
            stock: 25,
            sold: 67,
            description: "Búp bê công chúa với váy đẹp, tóc dài, có phụ kiện",
            createdAt: "2024-03-15",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 8,
            code: generateProductCode(),
            name: "Robot Học Tập",
            category: "Đồ Chơi Giáo Dục",
            price: 550000,
            stock: 20,
            sold: 43,
            description: "Robot thông minh dạy toán, tiếng Anh cho trẻ em",
            createdAt: "2024-03-20",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 9,
            code: generateProductCode(),
            name: "Siêu Nhân Transformer",
            category: "Đồ Chơi Hành Động",
            price: 720000,
            stock: 18,
            sold: 89,
            description: "Mô hình siêu nhân biến hình, có đèn LED và âm thanh",
            createdAt: "2024-03-25",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 10,
            code: generateProductCode(),
            name: "Bộ Vẽ Tranh Sáng Tạo",
            category: "Đồ Chơi Sáng Tạo",
            price: 280000,
            stock: 30,
            sold: 112,
            description: "Bộ vẽ tranh với 50 màu, giấy vẽ, bút chì màu",
            createdAt: "2024-04-01",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 11,
            code: generateProductCode(),
            name: "Máy Bay Không Người Lái",
            category: "Đồ Chơi Công Nghệ",
            price: 950000,
            stock: 12,
            sold: 34,
            description: "Drone điều khiển từ xa, camera HD, bay cao 50m",
            createdAt: "2024-04-05",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 12,
            code: generateProductCode(),
            name: "Bộ Đồ Chơi Nấu Ăn",
            category: "Đồ Chơi Cho Bé Gái",
            price: 420000,
            stock: 22,
            sold: 78,
            description: "Bộ bếp mini với dụng cụ nấu ăn, thực phẩm giả",
            createdAt: "2024-04-10",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 13,
            code: generateProductCode(),
            name: "Bộ Thí Nghiệm Khoa Học",
            category: "Đồ Chơi Giáo Dục",
            price: 650000,
            stock: 16,
            sold: 56,
            description: "Bộ thí nghiệm hóa học, vật lý cho trẻ em 10 tuổi",
            createdAt: "2024-04-15",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 14,
            code: generateProductCode(),
            name: "Xe Tăng Điều Khiển",
            category: "Đồ Chơi Hành Động",
            price: 580000,
            stock: 14,
            sold: 71,
            description: "Mô hình xe tăng điều khiển từ xa, bắn đạn nước",
            createdAt: "2024-04-20",
            image: "img/trangaudiu.png",
            status: "active"
        },
        {
            id: 15,
            code: generateProductCode(),
            name: "Bộ Xây Dựng Kiến Trúc",
            category: "Đồ Chơi Sáng Tạo",
            price: 880000,
            stock: 10,
            sold: 45,
            description: "Bộ xây dựng mô hình nhà, cầu, tòa nhà cao tầng",
            createdAt: "2024-04-25",
            image: "img/trangaudiu.png",
            status: "active"
        }
    ],
    categories: [
        { id: 1, code: generateCategoryCode(1), name: "Đồ Chơi Công Nghệ", productCount: 45, description: "Đồ chơi ứng dụng công nghệ hiện đại", status: "active", createdAt: "2023-12-01", icon: "car" },
        { id: 2, code: generateCategoryCode(2), name: "Đồ Chơi Giáo Dục", productCount: 38, description: "Đồ chơi phát triển trí tuệ cho trẻ", status: "active", createdAt: "2023-12-05", icon: "puzzle-piece" },
        { id: 3, code: generateCategoryCode(3), name: "Đồ Chơi Hành Động", productCount: 52, description: "Đồ chơi mô hình, siêu nhân, robot", status: "active", createdAt: "2023-12-10", icon: "robot" },
        { id: 4, code: generateCategoryCode(4), name: "Đồ Chơi Cho Bé Gái", productCount: 41, description: "Búp bê, đồ chơi nấu ăn, trang điểm", status: "active", createdAt: "2023-12-15", icon: "baby" },
        { id: 5, code: generateCategoryCode(5), name: "Đồ Chơi Sáng Tạo", productCount: 29, description: "Đồ chơi lắp ghép, xếp hình, vẽ tranh", status: "active", createdAt: "2023-12-20", icon: "cubes" }
    ],
    orders: [
        { id: 1, code: generateOrderCode(), customer: "Nguyễn Văn A", customerPhone: "0912345678", date: "15/05/2024", items: 3, total: 850000, status: "completed", products: ["Xe Điều Khiển Từ Xa", "Búp Bê Biết Nói"], shippingAddress: "123 Đường ABC, Quận 1, TP.HCM", paymentMethod: "COD" },
        { id: 2, code: generateOrderCode(), customer: "Trần Thị B", customerPhone: "0923456789", date: "14/05/2024", items: 5, total: 1250000, status: "processing", products: ["Bộ Xếp Hình Thông Minh", "Robot Biến Hình"], shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM", paymentMethod: "Chuyển khoản" },
        { id: 3, code: generateOrderCode(), customer: "Lê Văn C", customerPhone: "0934567890", date: "13/05/2024", items: 2, total: 560000, status: "pending", products: ["Xe Điều Khiển Từ Xa"], shippingAddress: "789 Đường DEF, Quận 3, TP.HCM", paymentMethod: "COD" },
        { id: 4, code: generateOrderCode(), customer: "Phạm Thị D", customerPhone: "0945678901", date: "12/05/2024", items: 7, total: 2340000, status: "completed", products: ["Bộ Lắp Ghép LEGO", "Robot Biến Hình"], shippingAddress: "321 Đường GHI, Quận 4, TP.HCM", paymentMethod: "Thẻ tín dụng" },
        { id: 5, code: generateOrderCode(), customer: "Hoàng Văn E", customerPhone: "0956789012", date: "11/05/2024", items: 1, total: 720000, status: "cancelled", products: ["Robot Biến Hình"], shippingAddress: "654 Đường JKL, Quận 5, TP.HCM", paymentMethod: "COD" }
    ],
    users: [
        { id: 1, code: generateUserCode(1), name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0912345678", role: "customer", joinDate: "15/03/2024", status: "active", totalOrders: 5, totalSpent: 3250000, address: "123 Đường ABC, Quận 1, TP.HCM" },
        { id: 2, code: generateUserCode(2), name: "Trần Thị B", email: "tranthib@email.com", phone: "0923456789", role: "customer", joinDate: "22/02/2024", status: "active", totalOrders: 3, totalSpent: 2150000, address: "456 Đường XYZ, Quận 2, TP.HCM" },
        { id: 3, code: generateUserCode(3), name: "levanc@email.com", email: "levanc@email.com", phone: "0934567890", role: "customer", joinDate: "10/01/2024", status: "active", totalOrders: 7, totalSpent: 4850000, address: "789 Đường DEF, Quận 3, TP.HCM" },
        { id: 4, code: generateUserCode(4), name: "Phạm Thị D", email: "phamthid@email.com", phone: "0945678901", role: "admin", joinDate: "05/12/2023", status: "active", totalOrders: 12, totalSpent: 0, address: "321 Đường GHI, Quận 4, TP.HCM" },
        { id: 5, code: generateUserCode(5), name: "Hoàng Văn E", email: "hoangvane@email.com", phone: "0956789012", role: "customer", joinDate: "28/11/2023", status: "active", totalOrders: 9, totalSpent: 6250000, address: "654 Đường JKL, Quận 5, TP.HCM" }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockData;
} else {
    window.mockData = mockData;
}