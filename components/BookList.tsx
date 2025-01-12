
import React from 'react'
import BookCard from './BookCard'

interface BookListProps {
  title: string,
  books: Book[],
  className?: string
}

const BookList = ({
  title, books, className
}: BookListProps) => {
  return (
    <section className={className}>
        <h1 className='font-bebas-neue text-4xl text-light-100'>
            {title}
        </h1>
        <ul className='book-list'>
          {books.map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
        </ul>
    </section>
  )
}

export default BookList