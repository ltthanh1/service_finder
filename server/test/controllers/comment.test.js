// const { createComment } = require('../../controllers/comment');
// const db = require('../../models');
// const asyncHandler = require('express-async-handler');

// // Mock the Express request and response objects
// const req = {
//   body: {
//     pid: 'post-id',
//     content: 'Comment content',
//   },
//   user: {
//     uid: 'user-id',
//   },
// };
// const res = {
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn().mockReturnThis(),
// };

// describe('createComment', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   //TC1
//   test('should create a new comment', async () => {
//     // Mock the response from the Comment model
//     const mockComment = {
//       id: 'comment-id',
//       pid: req.body.pid,
//       content: req.body.content,
//       uid: req.user.uid,
//     };
//     jest.spyOn(db.Comment, 'create').mockResolvedValue(mockComment);

//     // Call the createComment function
//     await createComment(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       mes: 'Created comment',
//     });
//   });
//   //TC2
//   test('should handle missing product ID', async () => {
//     // Modify the request to have a missing product ID
//     const modifiedReq = { ...req, body: { content: req.body.content } };

//     // Call the createComment function
//     await createComment(modifiedReq, res);

//     // Verify the response
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       err: 1,
//       mes: 'Missing product ID',
//     });
//   });
//   //TC3
//   test('should handle error when creating comment', async () => {
//     // Mock the Comment.create method to throw an error
//     const errorMessage = 'Comment creation failed';
//     jest.spyOn(db.Comment, 'create').mockRejectedValue(new Error(errorMessage));

//     // Call the createComment function
//     await createComment(req, res);

//     // Verify the response
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       mes: 'Không tìm thấy bài viết!',
//     });
//   });
// });

const { createComment } = require('../../controllers/comment')
const db = require('../../models/index')
const httpMocks = require('node-mocks-http')
const uniqid = require('uniqid')
jest.mock('../../models')

describe('createComment', () => {
  let req, res, next

  beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
  })

  it('should return 400 if pid or content is missing', async () => {
    req.body = { pid: '', content: '' }
    req.user = { uid: '123' }

    await createComment(req, res, next)

    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({
      err: 1,
      mes: 'Missing product ID'
    })
  })

  it('should create a comment and return success', async () => {
    req.body = { pid: '1', content: 'Test comment' }
    req.user = { uid: '123' }
    const commentId = uniqid()
    db.Comment.create.mockResolvedValue({ id: 'idTest' })

    await createComment(req, res, next)

    expect(db.Comment.create).toHaveBeenCalledWith({
      pid: '1',
      content: 'Test comment',
      uid: '123',
      id: 'idTest'
    })
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({
      success: true,
      mes: 'Created comment'
    })
  })

  it('should return an error if comment creation fails', async () => {
    req.body = { pid: '1', content: 'Test comment' }
    req.user = { uid: '123' }
    db.Comment.create.mockResolvedValue(null)

    await createComment(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({
      success: false,
      mes: 'Không tìm thấy bài viết!'
    })
  })
})
