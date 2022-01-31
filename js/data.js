const KEY = "BOOKSHELF_APPS";

let books = [];

function updateJson() {
        localStorage.setItem(KEY, JSON.stringify(books));
}

function fetchJson() {
    let data = JSON.parse(localStorage.getItem(KEY));

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("onjsonfetched"));
}

const getData = function() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

function composeBookObject(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete,
    };
}

function renderFromBooks() {
    for (book of books) {
        const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETE).append(newBook);
        } else {
            document.getElementById(INCOMPLETE).append(newBook);
        }
    }
}

function deleteBookFromJson(idBook) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == idBook) {
            books.splice(i, 1);
            break;
        }
    }
}