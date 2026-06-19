export default {
  name: "producto",
  title: "Producto",
  type: "document",
  fields: [
    {
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "descripcion",
      title: "Descripción",
      type: "text",
    },
    {
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Camisetas", value: "camisetas" },
          { title: "Sudaderas", value: "sudaderas" },
          { title: "Pantalones", value: "pantalones" },
          { title: "Gorras", value: "gorras" },
          { title: "Gafas", value: "gafas" },
          { title: "Relojes", value: "relojes" },
        ],
      },
    },
    {
      name: "imagen",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "badge",
      title: "Etiqueta (opcional, ej: Nuevo, Hot)",
      type: "string",
    },
    {
      name: "tallas",
      title: "Tallas y precios",
      type: "array",
      of: [
        {
          type: "object",
          name: "talla",
          fields: [
            { name: "talla", title: "Talla", type: "string" },
            { name: "precio", title: "Precio", type: "number" },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
}