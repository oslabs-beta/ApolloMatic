const {
  convertType,
  convertSchema,
} = require("../../Algorithm/mongooseToJSON");

// Using Node.js `require()`
const mongoose = require("mongoose");

describe("convertSchema Function", () => {

  
});

describe("convertType Function", () => {
  it("should convert Mongoose data types to GraphQL data types", () => {
    // Test various Mongoose data types and their conversions
    expect(convertType(String)).toBe("String");
    expect(convertType(Number)).toBe("Float");
    expect(convertType(Date)).toBe("Int");
    expect(convertType(Boolean)).toBe("Boolean");
    expect(convertType(mongoose.Schema.Types.BigInt)).toBe("Int");
    expect(convertType(mongoose.Schema.Types.Decimal128)).toBe("Float");
    // Add more test cases for other data types as needed
  });

  it("should handle unknown data types gracefully", () => {
    // Test an unknown data type (e.g., 'CustomType') and ensure it returns an empty string
    expect(convertType("CustomType")).toBe("");
  });
});
