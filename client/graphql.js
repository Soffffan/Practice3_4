const GRAPHQL_URL = "http://localhost:3000/graphql";

async function fetchProducts(fields) {
    const query = `{ products(fields: [${fields.map(f => `"${f}"`).join(", ")}]) { ${fields.join(" ")} } }`;
    const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    const { data } = await res.json();
    return data.products;
}
