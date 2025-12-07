// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity controls
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const qtyInput = control.querySelector('.qty-input');
        
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
                updateCartTotals();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
            updateCartTotals();
        });
        
        qtyInput.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateCartTotals();
        });
    });
    
    // Remove item functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.style.opacity = '0';
            setTimeout(() => {
                row.remove();
                updateCartTotals();
            }, 300);
        });
    });
    
    // Voucher application
    const applyVoucherBtn = document.querySelector('.apply-voucher');
    
    applyVoucherBtn.addEventListener('click', function() {
        const voucherSelect = document.querySelector('.voucher-select');
        const selectedVoucher = voucherSelect.value;
        
        if (selectedVoucher) {
            alert(`Phiếu quà tặng ${selectedVoucher} đã được áp dụng!`);
            // Here you would typically make an API call to apply the voucher
        } else {
            alert('Vui lòng chọn phiếu quà tặng!');
        }
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    checkoutBtn.addEventListener('click', function() {
        // Validate form before checkout
        const requiredFields = document.querySelectorAll('input[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc2626';
            } else {
                field.style.borderColor = '#e2e8f0';
            }
        });
        
        if (isValid) {
            alert('Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã mua sắm tại ToyStore.');
            // Here you would typically redirect to payment or order confirmation
        } else {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        }
    });
    
    // Update cart totals function
    function updateCartTotals() {
        // This is a simplified version - in a real app you would calculate based on actual prices
        console.log('Cart totals updated');
        // You would typically make API calls to update the cart on the server
    }
    
    // Form validation
    const forms = document.querySelectorAll('input, select, textarea');
    
    forms.forEach(form => {
        form.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
});