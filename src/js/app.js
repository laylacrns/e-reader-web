// Dados armazenados localmente (simulando um banco de dados)
let books = JSON.parse(localStorage.getItem('books')) || [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Função para alternar entre abas
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Remove active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Adiciona active no clicado
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Função para mostrar lista de livros
function displayBooks() {
    const booksList = document.getElementById('books-list');

    if (books.length === 0) {
        booksList.innerHTML = '<p>Nenhum livro carregado ainda</p>';
        return;
    }

    booksList.innerHTML = books.map((book, index) => `
        <div class="book-card" onclick="readBook(${index})">
            <div class="book-title">📖 ${book.name}</div>
            <div class="book-size">${(book.size / 1024).toFixed(2)} KB</div>
        </div>
    `).join('');
}

// Função para fazer upload de livro
function setupUpload() {
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');

    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];

        if (!file) {
            alert('Selecione um arquivo');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const newBook = {
                name: file.name,
                content: e.target.result,
                size: file.size,
                dateAdded: new Date().toLocaleDateString('pt-BR')
            };

            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            
            alert(`Livro "${file.name}" adicionado com sucesso!`);
            fileInput.value = '';
            displayBooks();
        };

        reader.readAsText(file);
    });
}

// Função para ler livro
function readBook(index) {
    const book = books[index];
    alert(`Abrindo: ${book.name}\n\nPrimeiras 100 caracteres:\n${book.content.substring(0, 100)}...`);
}

// Função para mostrar bookmarks
function displayBookmarks() {
    const bookmarksList = document.getElementById('bookmarks-list');

    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<p>Nenhum bookmark salvo</p>';
        return;
    }

    bookmarksList.innerHTML = bookmarks.map((bookmark, index) => `
        <div class="bookmark-item">
            <div class="bookmark-title">📌 ${bookmark.book}</div>
            <div class="bookmark-page">Página: ${bookmark.page}</div>
            <div class="bookmark-page">${bookmark.date}</div>
        </div>
    `).join('');
}

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    displayBooks();
    setupUpload();
    displayBookmarks();
});