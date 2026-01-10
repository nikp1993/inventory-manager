import { jest } from "@jest/globals";

await jest.unstable_mockModule("../../config/db.js", () => ({
    query: jest.fn(),
}));

const db = await import("../../config/db.js");
const {
    getAllItems,
    createItem,
    updateItemById,
    deleteItemById
} = await import("./items.service.js");

describe("Items Service - Unit Tests", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getAllItems returns items", async () => {
        db.query.mockResolvedValue({
            rows: [{ id: 1, name: "Apple", quantity: 10 }, { id: 2, name: "Banana", quantity: 5 }, { id: 3, name: "Orange", quantity: 8 }]
        });

        const result = await getAllItems(1);

        expect(db.query).toHaveBeenCalledWith(
            "SELECT id, itemName AS name, quantity, createdBy FROM items WHERE createdBy=$1 ORDER BY id",
            [1]
        );
        expect(result).toEqual([
            { id: 1, name: "Apple", quantity: 10 },
            { id: 2, name: "Banana", quantity: 5 },
            { id: 3, name: "Orange", quantity: 8 }
        ]);
    });

    test("createItem inserts and returns item", async () => {
        db.query.mockResolvedValue({
            rows: [{ id: 1, name: "Banana", quantity: 5 }]
        });

        const item = await createItem({ name: "Banana", quantity: 5, createdBy: 1 });

        expect(item.name).toBe("Banana");
        expect(item.quantity).toBe(5);
    });

    test("updateItemById updates item", async () => {
        db.query.mockResolvedValue({
            rows: [{ id: 1, name: "Orange", quantity: 8 }]
        });

        const item = await updateItemById(1, {
            name: "Orange",
            quantity: 8
        }, 1);

        expect(item.id).toBe(1);
        expect(item.name).toBe("Orange");
        expect(item.quantity).toBe(8);
    });

    test("deleteItemById deletes item", async () => {
        db.query.mockResolvedValue({
            rows: [{ id: 1 }]
        });

        const result = await deleteItemById(1, 1);

        expect(result.id).toBe(1);
    });
});
