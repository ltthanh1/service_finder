const db = require('../models')
const asyncHandler = require('express-async-handler')
const makeid = require('uniqid')
const createComment = asyncHandler(async (req, res) => {
    const { pid, content } = req.body
    const { uid } = req.user
    if (!pid || !content) return res.status(400).json({
        err: 1,
        mes: 'missing input'
    })
    const body = { uid, ...req.body }
    const response = await db.Comment.create({ ...body, id: 'idTest' })
    return res.json({
        success: response ? true : false,
        mes: response ? 'Created comment' : 'Không tìm thấy bài viết!',
    })
})

module.exports = {
    createComment
}