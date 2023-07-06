const Category = require('../Category');
const Product = require('../Product')
const ProductCurrency = require('../ProductCurrency');

Product.belongsTo(Category, {as: 'categories', foreignKey: 'id'});
Product.belongsTo(ProductCurrency, {as: 'product_currencies', foreignKey: 'id'});

Category.hasMany(Product,  {as: 'products', foreignKey: 'category_id'});