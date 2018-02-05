import { createFunctionSpy, AsyncTest, TestCase, Expect, Test, TestFixture } from "alsatian";

@TestFixture("example tests")
export default class ExampleTests {

    @Test("two plus two make four")
    public twoPlusTwoMakeFour(): void {
        Expect(2 + 2).toBe(4);
        Expect({ a: 'a' }).toEqual({ a: 'a' });     // ok
        Expect({ a: 'a' }).not.toEqual({ a: 'b' }); // ok
        Expect({ a: 'a' }).not.toEqual({ a: 'a' }); // incorrect
    }
}
