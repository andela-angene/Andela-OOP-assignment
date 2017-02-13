(function(){
  describe("BookReader Class", function() {

    it("The bookReader should be a type of `object`, and an instance of the `BookReader` class", function() {
      var tonyBooks = new BookReader('tony', 'themantis', 'Anthony Ngene', 'Books are the best.');
      expect(typeof tonyBooks).toEqual(typeof {});
      expect(tonyBooks instanceof BookReader).toBeTruthy();
      expect(tonyBooks.username).toBe('tony');
    });

    it("The bookReader should have default properties if no parameter(s) was passed.", function() {
      var reader = new BookReader();
      expect(reader.username).toEqual('johndoe');
      expect(reader.about).toBe('I love books!');
      reader.logout();
      reader.login('12345');
      expect(reader.isLoggedIn).toBeTruthy();
    });

    it("The bookReader should have correct login/logout methods", function(){
      var reader = new BookReader('james', 'lovelyducks');
      expect(reader.isLoggedIn).toBeTruthy();
      reader.logout();
      expect(reader.isLoggedIn).toBe(false);
      reader.login('randomWord!');
      expect(reader.isLoggedIn).toBe(false);
      reader.login('lovelyducks');
      expect(reader.isLoggedIn).toBeTruthy();
    });

    it("The bookReader be able to add a book to the books collection", function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      expect(reader.book[0].name).toBe('Thingsfall apart');
      //Don't allow invalid addition
      expect(reader.addBook('any book')).toBe(false);
    });

    it('The bookReader should be able to list books and check if a book is available', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      reader.addBook(['Low Men in Yellow Coats', 'short story', 45]);
      expect(reader.listBooks()).toBe('2 books available');
      expect(reader.isBookAvailable(1)).toBeTruthy();
      expect(reader.isBookAvailable(2)).toBeTruthy();
      expect(reader.isBookAvailable(500)).toBe(false);
    });

    it('The bookReader should be able to select a book', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      reader.addBook(['Low Men in Yellow Coats', 'short story', 45]);
      expect(reader.selectBook(1).name).toBe('Thingsfall apart');
    });

    it('The bookReader should be able to "read book" i.e update the status of a book', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      reader.addBook(['Low Men in Yellow Coats', 'short story', 45]);
      expect(reader.readBook(2, 101)).toBe('On page ' + reader.selectBook(2).status);
      reader.finishBook(2);
      expect(reader.selectBook(2).status).toBe('finished');
    });

    it('The bookReader should be able to remove a book from the collection', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      reader.addBook(['Low Men in Yellow Coats', 'short story', 45]);
      expect(reader.listBooks()).toBe('2 books available');
      reader.removeBook(1);
      expect(reader.listBooks()).toBe('1 book available');
    });

    it('The bookReader should now allow editing of the collection if the user is not logged in', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      reader.logout();
      expect(reader.removeBook(1)).toBe('Please login first.');
      expect(reader.addBook(['Low Men in Yellow Coats', 'short story', 45])).toBe('Please login first.');
      reader.login('lovelyducks');
      expect(reader.addBook(['Low Men in Yellow Coats', 'short story', 45])).toBe('Low Men in Yellow Coats was added');
    });

    it('The bookReader should have a favorite books collection', function(){
      var reader = new BookReader('james', 'lovelyducks');
      reader.addBook(['Thingsfall apart', 'novel', 'finished']);
      expect(reader.favorite.length).toBe(0);
      reader.addFavorite('Great Expectation');
      expect(reader.favorite.length).toBe(1);
    });

  });
})();