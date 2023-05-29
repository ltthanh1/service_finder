// const { getFoodtype } = require('../../controllers/foodtype');
// const db = require('../../models');
// const asyncHandler = require('express-async-handler');

// // Mock the Express request and response objects
// const req = {};
// const res = {
//   json: jest.fn().mockReturnThis(),
// };

// describe('getFoodtype', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   //tc1
//   test('should return food types', async () => {
//     // Mock the response from the database
//     const mockFoodtypes = [
//       { id: 1, name: 'Food Type 1' },
//       { id: 2, name: 'Food Type 2' },
//     ];
//     jest.spyOn(db.Foodtype, 'findAll').mockResolvedValue(mockFoodtypes);

//     // Call the getFoodtype function
//     await getFoodtype(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       foodtypes: mockFoodtypes,
//     });
//   });
//   //tc2
//   test('should handle error when database query fails', async () => {
//     // Mock the database query to throw an error
//     const errorMessage = 'Database query failed';
//     jest
//       .spyOn(db.Foodtype, 'findAll')
//       .mockRejectedValue(new Error(errorMessage));

//     // Call the getFoodtype function
//     await getFoodtype(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       foodtypes: 'Cannot get foodtype',
//     });
//   });
// });


const request = require('supertest')
const express = require('express')
const { getFoodtype } = require('../../controllers/foodtype') // Replace with the actual file name
const db = require('../../models/index')

const app = express()
app.use(express.json())
app.get('/foodtype', getFoodtype)

describe('getFoodtype', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return foodtypes and success true', async () => {
    const mockFoodtypes = [
      { id: 1, name: 'Pizza' },
      { id: 2, name: 'Burger' },
    ]

    db.Foodtype.findAll = jest.fn().mockResolvedValue(mockFoodtypes)

    const response = await request(app).get('/foodtype')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      foodtypes: mockFoodtypes,
    })
    expect(db.Foodtype.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return success false and error message when unable to get foodtypes', async () => {
    db.Foodtype.findAll = jest.fn().mockResolvedValue(null)

    const response = await request(app).get('/foodtype')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: false,
      foodtypes: 'Cannot get foodtype',
    })
    expect(db.Foodtype.findAll).toHaveBeenCalledTimes(1)
  })
})


