import {useSyncExternalStore} from 'react';


let cache = null;

function suscribirse(callback) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function obtenerSnapshot() {
    const valor = localStorage.getItem("carrito") || "[]"
  if (cache !== valor) cache=valor   
  return cache
}

function obtenerSnapshotServidor(){
    return "[]"
}

export function useCarrito() {
  const carrito = useSyncExternalStore(
    suscribirse,
    obtenerSnapshot,
    obtenerSnapshotServidor
    )
  return JSON.parse(carrito)
}

export function actualizarCarrito(nuevoCarrito) {
  cache =JSON.stringify(nuevoCarrito)  
  localStorage.setItem("carrito", cache)
  window.dispatchEvent(new Event("storage"))
}