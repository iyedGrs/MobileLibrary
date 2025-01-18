export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  description: string;
  status: "available" | "borrowed" | "reserved";
  category: string;
  publishedYear: number;
  location?: string;
}

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue";
}
