import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
    render(<Carousel />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();
});

it("doesn't show left arrow on first img or right arrow on last image", function () {
    const { queryByTestId, getByTestId } = render(<Carousel />);

    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(getByTestId("right-arrow")).toBeInTheDocument();

    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
