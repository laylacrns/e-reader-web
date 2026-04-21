// Variáveis globais
let currentBook = null;
let currentPage = 0;
let totalPages = 0;
let pages = [];

// Função para dividir texto em páginas
function paginateText(text, charsPerPage = 1500) {
    pages = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
        pages.push(text.substring(i, i + charsPerPage));
    }
    totalPages = pages.length || 1;
}

// Função para carregar livro
function loadBook() {
    // Espera um pouco para os elementos carregarem
    setTimeout(() => {
        const bookIndex = new URLSearchParams(window.location.search).get('book');
        
        if (bookIndex === null) {
            goBack();
            return;
        }

        const books = JSON.parse(localStorage.getItem('books')) || [];
        currentBook = books[parseInt(bookIndex)];

        if (!currentBook) {
            alert('Livro não encontrado');
            goBack();
            return;
        }

        document.getElementById('book-title').textContent = currentBook.name;
        paginateText(currentBook.content);
        currentPage = 0;
        displayPage();
    }, 100);
}

// Função para mostrar página atual
function displayPage() {
    const content = document.getElementById('book-content');
    const pageInfo = document.getElementById('page-info');
    const progressFill = document.getElementById('progress-fill');

    content.textContent = pages[currentPage] || '';
    pageInfo.textContent = `Página ${currentPage + 1} de ${totalPages}`;
    progressFill.style.width = ((currentPage + 1) / totalPages * 100) + '%';

    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage === totalPages - 1;
}

// Função para próxima página
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayPage();
        document.getElementById('book-content').scrollTop = 0;
    }
}

// Função para página anterior
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage();
        document.getElementById('book-content').scrollTop = 0;
    }
}

// Função para criar bookmark
function addBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    const newBookmark = {
        book: currentBook.name,
        page: currentPage + 1,
        date: new Date().toLocaleDateString('pt-BR')
    };

    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    alert(`Bookmark criado na página ${currentPage + 1}`);
}

// Função para voltar
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../';
    }
}

// Setup inicial
document.addEventListener('DOMContentLoaded', () => {
    loadBook();

    document.getElementById('next-btn').addEventListener('click', nextPage);
    document.getElementById('prev-btn').addEventListener('click', prevPage);
    document.getElementById('bookmark-btn').addEventListener('click', addBookmark);
    document.getElementById('back-btn').addEventListener('click', goBack);

    // Navegação com setas do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
    });
});