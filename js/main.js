"use strict";

// Constantes para las rutas de los archivos CSV
const DATA_PATH = "./data/";
const FURNITURE_CSV = `${DATA_PATH}furniture-products.csv`;
const HEALTHCARE_CSV = `${DATA_PATH}healthcare-products.csv`;

// Función para obtener los productos de los archivos CSV
async function getProducts(CSVfilePath) {
    try {
        const response = await fetch(CSVfilePath);
        const text = await response.text();
        const rows = text.split("\n").map(row => row.split(";"));
        const products = rows.map(row => ({
            title: row[0],
            description: row[1],
            imgSrc: `./assets/img/${row[2]}`
        }));
        return products;
    } catch (error) {
        console.error("Error al cargar el archivo CSV:", error);
        return [];
    }
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    const productCardDiv = document.createElement("div");
    productCardDiv.className = "product-card";

    const button = document.createElement("button");
    const svgHeart = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    button.innerHTML = svgHeart;

    const productImgDiv = document.createElement("div");
    productImgDiv.className = "product-img";

    const img = document.createElement("img");
    img.src = product.imgSrc;
    img.alt = product.title;

    const productInfoDiv = document.createElement("div");
    productInfoDiv.className = "product-info";

    const h3 = document.createElement("h3");
    h3.textContent = product.title;

    const p = document.createElement("p");
    p.textContent = product.description;

    // Estructura de los elementos
    productImgDiv.appendChild(img);
    productInfoDiv.appendChild(h3);
    productInfoDiv.appendChild(p);
    productCardDiv.appendChild(button);
    productCardDiv.appendChild(productImgDiv);
    productCardDiv.appendChild(productInfoDiv);

    return productCardDiv;
}

// Función para agregar tarjetas de producto a un contenedor
async function addProductsToContainer(containerId, csvFilePath) {
    const products = await getProducts(csvFilePath);
    const container = document.getElementById(containerId);
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// IDs de los contenedores de productos
const FURNITURE_CONTAINER_ID = "furniture-products";
const HEALTHCARE_CONTAINER_ID = "healthcare-products";

// Ejecución
addProductsToContainer(HEALTHCARE_CONTAINER_ID, HEALTHCARE_CSV);
addProductsToContainer(FURNITURE_CONTAINER_ID, FURNITURE_CSV);