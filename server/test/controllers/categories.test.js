// const db = require('../models');
// const app = require('../app');
// const request = require('supertest');

// describe('getCategories', () => {
//   it('should return categories', async () => {
//     const mockCategories = [
//       { id: 1, name: 'Category 1' },
//       { id: 2, name: 'Category 2' },
//       { id: 3, name: 'Category 3' },
//     ];
//     jest.spyOn(db.Category, 'findAll').mockResolvedValue(mockCategories);

//     const res = await request(app).get('/categories');

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.success).toBe(true);
//     expect(res.body.categories).toEqual(mockCategories);
//   });

//   it('should return error if cannot get categories', async () => {
//     jest
//       .spyOn(db.Category, 'findAll')
//       .mockRejectedValue(new Error('Database error'));

//     const res = await request(app).get('/categories');

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.success).toBe(false);
//     expect(res.body.categories).toBe('Cannot get categories');
//   });
// });

const { getCategories } = require('../../controllers/category') // Replace with the actual file name
const db = require('../../models/index');
const httpMocks = require('node-mocks-http')

jest.mock('../../models')

describe('getCategories', () => {
  it('should return categories and success status', async () => {
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()

    const mockCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]

    db.Category.findAll.mockResolvedValue(mockCategories)
    db.Visited.findOne.mockResolvedValue(null)
    db.Visited.create.mockResolvedValue(true)

    await getCategories(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({
      success: true,
      categories: mockCategories,
    })

    expect(db.Category.findAll).toHaveBeenCalled()
    expect(db.Visited.findOne).toHaveBeenCalled()
    expect(db.Visited.create).toHaveBeenCalled()
  })

  it('should return error message and false status when categories not found', async () => {
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()

    db.Category.findAll.mockResolvedValue(null)
    db.Visited.findOne.mockResolvedValue(null)
    db.Visited.create.mockResolvedValue(true)

    await getCategories(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({
      success: false,
      categories: 'Cannot get categories',
    })

    expect(db.Category.findAll).toHaveBeenCalled()
    expect(db.Visited.findOne).toHaveBeenCalled()
    expect(db.Visited.create).toHaveBeenCalled()
  })
})
