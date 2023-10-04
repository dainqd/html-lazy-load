let itemsContainer = document.getElementById('items');
let currentPage = 1;
let isLoading = false;

function loadMoreItems() {
    if (isLoading) return;
    isLoading = true;

    // Gọi API từ JSONPlaceholder
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=10`)
        .then(response => response.json())
        .then(data => {
            for (let item of data) {
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.textContent = `Photo ID: ${item.id}`;
                itemsContainer.appendChild(newItem);
            }

            isLoading = false;
            currentPage++;
        })
        .catch(error => console.error('Error:', error));
}

function onScroll() {
    if (itemsContainer.scrollHeight - itemsContainer.scrollTop <= itemsContainer.clientHeight + 100) {
        loadMoreItems();
    }
}

itemsContainer.addEventListener('scroll', onScroll);

// Initial load
loadMoreItems();
