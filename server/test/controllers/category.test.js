// const { getCategories } = require('../../controllers/category');
// const db = require('../../models/index');
// const asyncHandler = require('express-async-handler');

// Mock the Express request and response objects
// const req = {
//   body: {
//     uid: 'user-id',
//   },
// };
// const res = {
//   json: jest.fn().mockReturnThis(),
// };

// describe('getCategories', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   //tc1
//   test('should get categories and increment visit count for registered user', async () => {
//     // Mock the response from the Category model
//     const mockCategories = [
//       { id: 1, name: 'Category 1' },
//       { id: 2, name: 'Category 2' },
//     ];
//     jest.spyOn(db.Category, 'findAll').mockResolvedValue(mockCategories);

//     // Mock the response from the Visited model for a registered user
//     const mockVisited = { uid: req.body.uid, times: 5 };
//     jest.spyOn(db.Visited, 'findOne').mockResolvedValue(mockVisited);

//     // Call the getCategories function
//     await getCategories(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       categories: mockCategories,
//     });

//     // Verify the visit count increment
//     expect(mockVisited.increment).toHaveBeenCalledWith('times', { by: 1 });
//   });
//   //tc2
//   test('should get categories and create visit record for anonymous user', async () => {
//     // Modify the request to have no user ID
//     const modifiedReq = { ...req, body: {} };

//     // Mock the response from the Category model
//     const mockCategories = [
//       { id: 1, name: 'Category 1' },
//       { id: 2, name: 'Category 2' },
//     ];
//     jest.spyOn(db.Category, 'findAll').mockResolvedValue(mockCategories);

//     // Call the getCategories function
//     await getCategories(modifiedReq, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       categories: mockCategories,
//     });

//     // Verify the visit record creation
//     expect(db.Visited.create).toHaveBeenCalled();
//   });
//   //tc3
//   test('should handle error when getting categories', async () => {
//     // Mock the Category.findAll method to throw an error
//     const errorMessage = 'Failed to retrieve categories';
//     jest
//       .spyOn(db.Category, 'findAll')
//       .mockRejectedValue(new Error(errorMessage));

//     // Call the getCategories function
//     await getCategories(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       categories: 'Cannot get categories',
//     });
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