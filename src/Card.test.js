import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// SMOKE TEST.
test("it renders without crashing", () => {
    render(<Card />);
});

test("matches snapshot", function () {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
