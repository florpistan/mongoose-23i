const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.pre('save', function(next) {
  console.log('Antes de insertar el elemento en la db')
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
})

productSchema.virtual('dollarPrice').get(function() {
  return parseFloat((this.price / 201).toFixed(2));
})

const Product = model('Product', productSchema);

module.exports = Product;

//Profundizando: Relaciones entre entidades
//Autenticación - Manejo de errores
//Seguridad básica

//Conectar con Frontend