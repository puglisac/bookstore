## Bookstore
Bookstore is an API for adding books to a database.
## Endpoints
- GET /books  
 Responds with a list of all the books
- POST /books  
 Creates a book and responds with the newly created book
- GET /books/[isbn]  
 Responds with a single book found by its isbn
- PUT /books/[isbn]  
Updates a book and responds with the updated book
- DELETE /books/[isbn]  
Deletes a book and responds with a message of “Book deleted”

## Built Using
- NodeJS - backend
- ExpressJS - framework
- PostgreSQL - database
- Node-pg - connecting to database
- JSONSchema - API validation
- Jest - testing

To run tests:  

```
$ jest 
```