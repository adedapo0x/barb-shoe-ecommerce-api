const validator = require('express-validator')
const httpRegister = require('../controllers/user.controller')

jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(()=> false),
        array: jest.fn(()=> [{"msg": "Invalid request"}] )
    }))
}))

let mockRequest = {body: {
    firstName: "John", lastName: "Doe", email: "joe123@gmail.com", password: "password123"
    }}
let mockResponse = {
    status: jest.fn(()=> mockResponse),
    json: jest.fn()
}

describe('create users', () => {
    test('should send 400 when there are any input errors', async () => {
        await httpRegister(mockRequest, mockResponse)
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest)
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({errors: [{ msg: "Invalid request"}]})
    })

    test('should return 400 if email already exists')

    test('should return 201 when user is created successfully', async () => {
        await httpRegister(mockRequest, mockResponse)

    })
})


