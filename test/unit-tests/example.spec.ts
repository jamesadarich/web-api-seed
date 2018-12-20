import { AsyncTest, createFunctionSpy, Expect, Test, TestCase, TestFixture } from "alsatian";

@TestFixture("example tests")
export default class ExampleTests {

    @Test("two plus two make four")
    public twoPlusTwoMakeFour(): void {
        Expect(2 + 2).toBe(4);
    }
}
