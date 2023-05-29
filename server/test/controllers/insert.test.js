
const db = require('../../models/index')
const httpMocks = require('node-mocks-http')
const { insertData, insertRented } = require('../../controllers/insert') // Replace with the actual file name
const { role, category, user, foodType } = require('../../ultils/insertdata')
jest.mock('../../models')


describe('insertRented', () => {
    it('should insert data into database', async () => {
        const req = {}
        const res = {
            json: jest.fn()
        }
        await insertRented(req, res)
        expect(res.json).toHaveBeenCalledWith('Done')
    })
})

describe('insertData', () => {
    it('bulk create data', async () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()

        const bulkCreateSpy = jest.spyOn(db.User, 'bulkCreate')
        const bulkCreateRoleSpy = jest.spyOn(db.Role, 'bulkCreate')
        const bulkCreateCategorySpy = jest.spyOn(db.Category, 'bulkCreate')
        const bulkCreateFoodTypeSpy = jest.spyOn(db.Foodtype, 'bulkCreate')

        await insertData(req, res)

        expect(bulkCreateSpy).toHaveBeenCalledWith(user)
        expect(bulkCreateRoleSpy).toHaveBeenCalledWith(role)
        expect(bulkCreateCategorySpy).toHaveBeenCalledWith(category)
        expect(bulkCreateFoodTypeSpy).toHaveBeenCalledWith(foodType)

        expect(res._getJSONData()).toEqual('Done')
    })

})