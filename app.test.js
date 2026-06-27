const request = require('supertest');
const app = require('./app');

describe('CRUD API Items Endpoint', () => {
  
  // Test READ (All)
  describe('GET /items', () => {
    it('should return all items', async () => {
      const res = await request(app).get('/items');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Test READ (Single)
  describe('GET /items/:id', () => {
    it('should return a single item if it exists', async () => {
      const res = await request(app).get('/items/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Item One');
    });

    it('should return 404 if item does not exist', async () => {
      const res = await request(app).get('/items/999');
      expect(res.statusCode).toBe(404);
    });
  });

  // Test CREATE
  describe('POST /items', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/items')
        .send({ name: 'Item Three' });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Item Three');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/items')
        .send({});
      expect(res.statusCode).toBe(400);
    });
  });

  // Test UPDATE
  describe('PUT /items/:id', () => {
    it('should update an existing item', async () => {
      const res = await request(app)
        .put('/items/1')
        .send({ name: 'Updated Item One' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Item One');
    });
  });

  // Test DELETE
  describe('DELETE /items/:id', () => {
    it('should delete an item and return 204', async () => {
      const res = await request(app).delete('/items/2');
      expect(res.statusCode).toBe(204);

      // Verify it was actually deleted
      const checkRes = await request(app).get('/items/2');
      expect(checkRes.statusCode).toBe(404);
    });
  });
});