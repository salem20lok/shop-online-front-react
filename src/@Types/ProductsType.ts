export default interface ProductsType {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  tva: number;
  sales: number;
  images: string[];
  category: string;
  user: string;
}
