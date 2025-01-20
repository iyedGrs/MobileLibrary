import { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookService";
import { Database } from "../constants/supabase";

type Book = Database['public']['Tables']['books']['Row'];

export const useSupBook = () =>{

    const [books , setBooks] = useState<Book[]>([]);

    useEffect(()=>{
        const loadBooks = async ()=>{
            const data = await fetchBooks();
            setBooks(data);
        }
        loadBooks();
    },[])

    return {books}

}