// ✨ Extraordinary User Management System JavaScript ✨

class UserManagementSystem {
    constructor() {
        this.users = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.currentView = 'grid';
        this.searchTerm = '';
        this.sortBy = 'name';
        this.isLoading = false;
        this.easterEggCount = 0;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupEasterEggs();
        this.loadUsers();
        this.updateStats();
        this.startFunAnimations();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce(() => {
            this.searchTerm = searchInput.value.toLowerCase();
            this.currentPage = 1;
            this.renderUsers();
        }, 300));

        // Add user button
        document.getElementById('addUserBtn').addEventListener('click', () => {
            this.openAddModal();
        });

        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderUsers();
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.view-btn').classList.add('active');
                this.currentView = e.target.closest('.view-btn').dataset.view;
                this.renderUsers();
            });
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('userForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Delete modal events
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());

        // Pagination
        document.getElementById('prevBtn').addEventListener('click', () => this.previousPage());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextPage());

        // Easter egg close
        document.querySelector('.egg-close').addEventListener('click', () => {
            document.getElementById('easterEgg').classList.remove('show');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.openAddModal();
                        break;
                    case 'f':
                        e.preventDefault();
                        searchInput.focus();
                        break;
                    case 'Escape':
                        this.closeModal();
                        this.closeDeleteModal();
                        break;
                }
            }
        });
    }

    setupEasterEggs() {
        // Konami Code Easter Egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.triggerEasterEgg();
                konamiCode = [];
            }
        });

        // Click counter easter egg
        document.addEventListener('click', () => {
            this.easterEggCount++;
            if (this.easterEggCount === 42) {
                this.showToast('🎉 You clicked 42 times! The answer to life, the universe, and everything!', 'info');
                this.easterEggCount = 0;
            }
        });

        // Secret message in console
        console.log('%c✨ Welcome to the Extraordinary User Management System! ✨', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('%c🎮 Try the Konami Code for a surprise!', 'color: #f093fb; font-size: 14px;');
        console.log('%c💡 Pro tip: Use Ctrl+N to add users, Ctrl+F to search!', 'color: #4facfe; font-size: 14px;');
    }

    startFunAnimations() {
        // Floating shapes animation
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 0.5}s`;
        });

        // Logo pulse animation
        const logoIcon = document.querySelector('.logo-icon');
        setInterval(() => {
            logoIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1)';
            }, 200);
        }, 3000);

        // Sparkle animation
        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach((sparkle, index) => {
            sparkle.style.animationDelay = `${index * 0.5}s`;
        });
    }

    async loadUsers() {
        this.setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            
            this.users = await response.json();
            this.renderUsers();
            this.updateStats();
            this.showToast('✨ Users loaded successfully!', 'success');
        } catch (error) {
            console.error('Error loading users:', error);
            this.showToast('😔 Failed to load users. Make sure the backend is running!', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.isLoading = loading;
        const loadingContainer = document.getElementById('loadingContainer');
        const usersGrid = document.getElementById('usersGrid');
        
        if (loading) {
            loadingContainer.style.display = 'flex';
            usersGrid.style.display = 'none';
        } else {
            loadingContainer.style.display = 'none';
            usersGrid.style.display = 'grid';
        }
    }

    renderUsers() {
        const usersGrid = document.getElementById('usersGrid');
        const emptyState = document.getElementById('emptyState');
        
        // Filter and sort users
        let filteredUsers = this.users.filter(user => 
            user.name.toLowerCase().includes(this.searchTerm) ||
            user.email.toLowerCase().includes(this.searchTerm)
        );

        // Sort users
        filteredUsers.sort((a, b) => {
            switch(this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'email':
                    return a.email.localeCompare(b.email);
                case 'email-desc':
                    return b.email.localeCompare(a.email);
                case 'created':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'created-desc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return 0;
            }
        });

        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        // Show/hide empty state
        if (filteredUsers.length === 0) {
            usersGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        } else {
            usersGrid.style.display = this.currentView === 'grid' ? 'grid' : 'block';
            emptyState.style.display = 'none';
        }

        // Render users
        usersGrid.innerHTML = paginatedUsers.map((user, index) => 
            this.createUserCard(user, startIndex + index)
        ).join('');

        // Update pagination
        this.updatePagination(filteredUsers.length);
        
        // Add entrance animations
        const cards = usersGrid.querySelectorAll('.user-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    createUserCard(user, index) {
        const avatar = this.generateAvatar(user.name);
        const createdAt = new Date(user.createdAt).toLocaleDateString();
        const updatedAt = new Date(user.updatedAt).toLocaleDateString();
        
        return `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-avatar">${avatar}</div>
                <div class="user-info">
                    <h3>${this.escapeHtml(user.name)}</h3>
                    <div class="user-email">${this.escapeHtml(user.email)}</div>
                    <div class="user-meta">
                        <span>Created: ${createdAt}</span>
                        <span>Updated: ${updatedAt}</span>
                    </div>
                </div>
                <div class="user-actions">
                    <button class="action-btn edit" onclick="userManagement.editUser(${user.id})" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="userManagement.deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    generateAvatar(name) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
        const color = colors[name.length % colors.length];
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        return initials;
    }

    updatePagination(totalUsers) {
        const totalPages = Math.ceil(totalUsers / this.itemsPerPage);
        const paginationInfo = document.getElementById('paginationInfo');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pageNumbers = document.getElementById('pageNumbers');

        // Update info
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalUsers);
        paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${totalUsers} users`;

        // Update buttons
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages;

        // Generate page numbers
        pageNumbers.innerHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => this.goToPage(i);
            pageNumbers.appendChild(pageBtn);
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderUsers();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.getFilteredUsers().length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    getFilteredUsers() {
        return this.users.filter(user => 
            user.name.toLowerCase().includes(this.searchTerm) ||
            user.email.toLowerCase().includes(this.searchTerm)
        );
    }

    openAddModal() {
        document.getElementById('modalTitle').textContent = 'Add New User';
        document.getElementById('userForm').reset();
        document.getElementById('userModal').classList.add('show');
        document.getElementById('userName').focus();
        
        // Add fun animation
        const modal = document.querySelector('.modal-container');
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.style.transform = 'scale(1)';
        }, 50);
    }

    openEditModal(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        document.getElementById('modalTitle').textContent = 'Edit User';
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userForm').dataset.userId = userId;
        document.getElementById('userModal').classList.add('show');
        
        // Add fun animation
        const modal = document.querySelector('.modal-container');
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.style.transform = 'scale(1)';
        }, 50);
    }

    closeModal() {
        document.getElementById('userModal').classList.remove('show');
        document.getElementById('userForm').reset();
        delete document.getElementById('userForm').dataset.userId;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim()
        };

        // Validation
        if (!userData.name || !userData.email) {
            this.showToast('Please fill in all fields!', 'warning');
            return;
        }

        if (!this.isValidEmail(userData.email)) {
            this.showToast('Please enter a valid email address!', 'warning');
            return;
        }

        const userId = e.target.dataset.userId;
        const isEdit = !!userId;

        try {
            this.setLoading(true);
            const url = isEdit ? `http://localhost:8080/api/users/${userId}` : 'http://localhost:8080/api/users';
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Failed to save user');

            const savedUser = await response.json();
            
            if (isEdit) {
                const index = this.users.findIndex(u => u.id === userId);
                this.users[index] = savedUser;
                this.showToast('🎉 User updated successfully!', 'success');
            } else {
                this.users.unshift(savedUser);
                this.showToast('🎉 User added successfully!', 'success');
            }

            this.closeModal();
            this.renderUsers();
            this.updateStats();
            
            // Fun celebration animation
            this.celebrate();
            
        } catch (error) {
            console.error('Error saving user:', error);
            this.showToast('😔 Failed to save user. Please try again!', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        document.getElementById('userToDelete').innerHTML = `
            <strong>${this.escapeHtml(user.name)}</strong><br>
            <small>${this.escapeHtml(user.email)}</small>
        `;
        document.getElementById('deleteModal').classList.add('show');
        this.userToDelete = userId;
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('show');
        this.userToDelete = null;
    }

    async confirmDelete() {
        if (!this.userToDelete) return;

        try {
            this.setLoading(true);
            const response = await fetch(`http://localhost:8080/api/users/${this.userToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete user');

            this.users = this.users.filter(u => u.id !== this.userToDelete);
            this.renderUsers();
            this.updateStats();
            this.showToast('🗑️ User deleted successfully!', 'success');
            
            // Fun deletion animation
            this.animateDeletion();
            
        } catch (error) {
            console.error('Error deleting user:', error);
            this.showToast('😔 Failed to delete user. Please try again!', 'error');
        } finally {
            this.setLoading(false);
            this.closeDeleteModal();
        }
    }

    updateStats() {
        document.getElementById('totalUsers').textContent = this.users.length;
        document.getElementById('lastUpdate').textContent = 'Just Now';
        
        // Animate the stats
        const stats = document.querySelectorAll('.stat-card span');
        stats.forEach(stat => {
            stat.style.transform = 'scale(1.2)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        });
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }

    triggerEasterEgg() {
        const egg = document.getElementById('easterEgg');
        egg.classList.add('show');
        
        // Add confetti effect
        this.createConfetti();
        
        setTimeout(() => {
            egg.classList.remove('show');
        }, 5000);
    }

    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }

    celebrate() {
        // Add celebration animation to the add button
        const addBtn = document.getElementById('addUserBtn');
        addBtn.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            addBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        // Create mini confetti
        this.createConfetti();
    }

    animateDeletion() {
        // Add deletion animation
        const cards = document.querySelectorAll('.user-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(0.8) rotate(-5deg)';
                card.style.opacity = '0';
            }, index * 100);
        });
    }

    editUser(userId) {
        this.openEditModal(userId);
    }

    deleteUser(userId) {
        this.deleteUser(userId);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application with fun loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const loadingText = document.querySelector('.loading-text');
    const loadingMessages = [
        'Loading amazing users... ✨',
        'Preparing the magic... 🌟',
        'Almost there... 🚀',
        'Getting everything ready... 🎉'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        loadingText.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 2000);

    // Initialize the system
    window.userManagement = new UserManagementSystem();
    
    // Clear the message interval after initialization
    setTimeout(() => {
        clearInterval(messageInterval);
    }, 8000);

    // Add fun welcome message
    setTimeout(() => {
        window.userManagement.showToast('🎉 Welcome to the Extraordinary User Management System!', 'info');
    }, 1000);
});

// Global functions for onclick handlers
function openAddModal() {
    window.userManagement.openAddModal();
}

// Add some fun console messages
console.log('%c🎮 Easter Eggs Found:', 'color: #f093fb; font-size: 16px; font-weight: bold;');
console.log('%c1. Konami Code (↑↑↓↓←→←→BA)', 'color: #4facfe; font-size: 14px;');
console.log('%c2. Click 42 times', 'color: #43e97b; font-size: 14px;');
console.log('%c3. Check the console for more secrets!', 'color: #fa709a; font-size: 14px;'); 