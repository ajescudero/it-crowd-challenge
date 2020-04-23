export function get() {
    return JSON.parse(localStorage.getItem("cities")) || [];
}

export function set(item) {
    if (typeof item === "object") {
        localStorage.setItem('cities', JSON.stringify(item));
    } else {
        localStorage.setItem('cities', item);
    }
}