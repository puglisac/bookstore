process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db");
const Book = require("./models/book");

describe("book routes test", function() {
	beforeEach(async function() {
		await db.query(`DELETE FROM books`);

		const b1 = await Book.create({
			isbn: "test",
			amazon_url: "http://a.co/eobPtX2",
			author: "test author",
			language: "english",
			pages: 100,
			publisher: "test pub",
			title: "test book",
			year: 2017
		});
	});
	describe("GET /books/", function() {
		test("can get all books", async function() {
			let resp = await request(app).get("/books/");
			expect(resp.status).toEqual(200);
			expect(resp.body).toEqual({
				books: [
					{
						isbn: "test",
						amazon_url: "http://a.co/eobPtX2",
						author: "test author",
						language: "english",
						pages: 100,
						publisher: "test pub",
						title: "test book",
						year: 2017
					}
				]
			});
		});
	});
	describe("POST /books/", function() {
		test("can create a book", async function() {
			let resp = await request(app).post("/books/").send({
				isbn: "test2",
				amazon_url: "http://a.co/eobPtX2",
				author: "test author2",
				language: "english",
				pages: 100,
				publisher: "test pub2",
				title: "test book2",
				year: 2017
			});
			expect(resp.status).toEqual(201);
			expect(resp.body).toEqual({
				book: {
					isbn: "test2",
					amazon_url: "http://a.co/eobPtX2",
					author: "test author2",
					language: "english",
					pages: 100,
					publisher: "test pub2",
					title: "test book2",
					year: 2017
				}
			});
		});
		test("cannot create a book without proper input", async function() {
			let resp = await request(app).post("/books/").send({
				isbn: "test2",
				amazon_url: "http://a.co/eobPtX2",
				author: "test author2",
				language: "english",
				pages: 100,
				publisher: "test pub2",
				title: "test book2"
			});
			expect(resp.status).toEqual(400);
		});
	});

	describe("GET /books/:isbn", function() {
		test("can get book details", async function() {
			let resp = await request(app).get(`/books/test`);
			expect(resp.status).toEqual(200);
			expect(resp.body).toEqual({
				book: {
					isbn: "test",
					amazon_url: "http://a.co/eobPtX2",
					author: "test author",
					language: "english",
					pages: 100,
					publisher: "test pub",
					title: "test book",
					year: 2017
				}
			});
		});
	});
	describe("PUT /books/:isbn", function() {
		test("can edit book details", async function() {
			let resp = await request(app).put(`/books/test`).send({
				amazon_url: "http://a.co/eobPtX2",
				author: "new author",
				language: "french",
				pages: 200,
				publisher: "new pub",
				title: "new title",
				year: 2010
			});
			expect(resp.status).toEqual(200);
			expect(resp.body).toEqual({
				book: {
					isbn: "test",
					amazon_url: "http://a.co/eobPtX2",
					author: "new author",
					language: "french",
					pages: 200,
					publisher: "new pub",
					title: "new title",
					year: 2010
				}
			});
		});
		test("cannot edit book without correct input", async function() {
			let resp = await request(app).put(`/books/test`).send({
				amazon_url: "http://a.co/eobPtX2",
				author: "new author",
				language: "french",
				pages: 200,
				publisher: "new pub",
				title: "new title"
			});
			expect(resp.status).toEqual(400);
		});
	});
	describe("DELETE /books/:isbn", function() {
		test("can delete book", async function() {
			let resp = await request(app).delete(`/books/test`);
			expect(resp.status).toEqual(200);
			expect(resp.body).toEqual({
				message: "Book deleted"
			});
		});
	});
});

afterAll(async function() {
	await db.end();
});
