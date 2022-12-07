async function readJSON() {
    return fetch("/obj.json")
    .then(res => res.json())
    .then((pics) => { return pics; });
}

async function getProducts() {
    const photos = await this.readJSON();
    return photos;
}
