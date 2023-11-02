class BookModel {
  bookId: number;
  name?: string;
  author?: string;
  description?: string;
  ISBN?: string;
  listedPrice?: number;
  salePrice?: number;
  stockQuantity?: number;
  avgRating?: number;

  constructor(
    bookId: number,
    name: string,
    author: string,
    description: string,
    ISBN: string,
    listedPrice: number,
    salePrice: number,
    stockQuantity: number,
    avgRating: number
  ) {
    this.bookId = bookId;
    this.name = name;
    this.author = author;
    this.description = description;
    this.ISBN = ISBN;
    this.listedPrice = listedPrice;
    this.salePrice = salePrice;
    this.stockQuantity = stockQuantity;
    this.avgRating = avgRating;
  }
}

export default BookModel;
