import { jest } from "@jest/globals";

await jest.unstable_mockModule("bcrypt", () => ({
    __esModule: true,
    hash: jest.fn(),
    compare: jest.fn()
}));

await jest.unstable_mockModule("jsonwebtoken", () => ({
    __esModule: true,
    default: {
        sign: jest.fn(),
    },
}));

await jest.unstable_mockModule("../../config/db.js", () => ({
    __esModule: true,
    query: jest.fn(),
}));

const bcrypt = await import("bcrypt");
const jwt = (await import("jsonwebtoken")).default;
const db = await import("../../config/db.js");
const {
    loginUser,
    registerUser
} = await import("./auth.service.js");

describe("Auth Service - Unit Tests", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("registerUser hashes password and inserts user", async () => {
        bcrypt.hash.mockResolvedValue("hashedPassword");

        db.query.mockResolvedValue({});

        await registerUser({
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            password: "password"
        });

        expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
        expect(db.query).toHaveBeenCalled();
    });

    test("loginUser returns JWT token for valid credentials", async () => {
        db.query.mockResolvedValue({
            rows: [{
                id: 1,
                email: "john@test.com",
                password: "hashedPassword"
            }]
        });

        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("fake-jwt-token");

        const token = await loginUser({
            email: "john@test.com",
            password: "password"
        });

        expect(token).toBe("fake-jwt-token");
    });

    test("loginUser throws error for invalid password", async () => {
        db.query.mockResolvedValue({
            rows: [{
                id: 1,
                email: "john@test.com",
                password: "hashedPassword"
            }]
        });

        bcrypt.compare.mockResolvedValue(false);

        await expect(
            loginUser({ email: "john@test.com", password: "wrong" })
        ).rejects.toThrow("Invalid credentials");
    });
});
