const COMPLETE = "completeBookshelf";
const INCOMPLETE = "incompleteBookshelf";

const addBook = function() {
    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(id, title, author, year, isComplete);
    const bookObject = composeBookObject(id, title, author, year, isComplete);

    books.push(bookObject);

    if (isComplete === true) {
        document.getElementById(COMPLETE).append(book);
    } else {
        document.getElementById(INCOMPLETE).append(book);
    }

    updateJson();
}

const createBook = function(id, title, author, year, isComplete) {
    const book = document.createElement("article");
    book.setAttribute("id", id)
    book.classList.add("book_item");

    const bookTitle = document.createElement("h4");
    bookTitle.style.maxWidth = "200px";
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("span");
    bookAuthor.innerText = 'Penulis : '+author;

    const bookYear = document.createElement("span");
    bookYear.innerText = 'Tahun : '+year;

    const br = document.createElement("br");
    const content = document.createElement("div");
    const action = addAction(isComplete, id);

    content.append(bookTitle, bookAuthor, br, bookYear, action);
    book.append(content);

    return book;
}

const addAction = function(isComplete, id) {
    const actions = document.createElement("div");

    const actionDelete = createActionDelete(id);
    const actionRead = createActionRead(id);
    const actionUndo = createActionUndo(id);

    actions.append(actionDelete);

    if (isComplete) {
        actions.append(actionUndo);
    } else {
        actions.append(actionRead);
    }

    return actions;
}

const createActionDelete = function(id) {
    const actionDelete = document.createElement("button");
    actionDelete.classList.add("red");
    actionDelete.innerHTML = "Hapus";

    actionDelete.addEventListener("click", function () {
        let conf = confirm("apakah anda yakin ingin menghapus data buku ini?");

        if (conf === true) {
            const idBook = document.getElementById(id);
            idBook.addEventListener("eventDelete", function (event) {
                event.target.remove();
            });
            idBook.dispatchEvent(new Event("eventDelete"));

            deleteBookFromJson(id);
            updateJson();
            alert("Data buku berhasil dihapus!");
        }
    });

    return actionDelete;
}

const createActionRead = function(id) {
    const action = document.createElement("button");
    action.classList.add("green");
    action.innerHTML = "Selesai";

    action.addEventListener("click", function () {
        const idBook = document.getElementById(id);
        const bookDataId = getData().filter(a => a.id == id);

        const title = bookDataId[0].title;
        const author = bookDataId[0].author;
        const year = bookDataId[0].year;

        idBook.remove();

        const book = createBook(id, title, author, year, true);
        document.getElementById(COMPLETE).append(book);

        deleteBookFromJson(id);
        const bookObject = composeBookObject(id, title, author, year, true);

        books.push(bookObject);
        updateJson();
    })

    return action;
}

const createActionUndo = function(id) {
    const action = document.createElement("button");
    action.classList.add("orange");
    action.innerHTML = "Belum Selsai";

    action.addEventListener("click", function () {
        const idBook = document.getElementById(id);
        const bookDataId = getData().filter(a => a.id == id);

        const title = bookDataId[0].title;
        const author = bookDataId[0].author;
        const year = bookDataId[0].year;

        idBook.remove();

        const book = createBook(id, title, author, year, false);
        document.getElementById(INCOMPLETE).append(book);

        deleteBookFromJson(id);
        const bookObject = composeBookObject(id, title, author, year, false);

        books.push(bookObject);
        updateJson();
    })

    return action;
}

const bookSearch = function() {
    const search = document.getElementById("search");
    const filter = search.value.toUpperCase();
    const titles = document.getElementsByTagName("h4");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".book_item").style.display = "";
        } else {
            titles[i].closest(".book_item").style.display = "none";
        }
    }
}