import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import Input from "../inputs/input-field/InputFiled";

describe("InputField Component Test Suite", () => {
  it("should render a text input type by default", () => {
    render(<Input placeholder="Enter ..." />);
    const input = screen.getByPlaceholderText("Enter ...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("text");
  });

  it("should render a number input when type is set to number", () => {
    render(<Input type="number" placeholder="Enter number" />);
    const input = screen.getByPlaceholderText(
      "Enter number"
    ) as HTMLInputElement;
    expect(input.type).toBe("number");
    expect(input.inputMode).toBe("numeric");
  });

  it("should apply correct direction based on type", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input).toHaveAttribute("dir", "ltr");
  });

  it("should blur on wheel scroll for number input", () => {
    render(<Input type="number" placeholder="Scroll test" />);
    const input = screen.getByPlaceholderText(
      "Scroll test"
    ) as HTMLInputElement;
    const blurSpy = vi.spyOn(input, "blur");
    fireEvent.wheel(input);
    expect(blurSpy).toHaveBeenCalled();
  });

  it("should accept custom className and variant styling", () => {
    render(
      <Input
        className="custom-class"
        variants="contained"
        placeholder="Styled"
      />
    );
    const input = screen.getByPlaceholderText("Styled");
    expect(input).toHaveClass("input");
    expect(input).toHaveClass("remove-arrow");
    expect(input).toHaveClass("input-contained");
    expect(input).toHaveClass("custom-class");
  });

  it("should respond to value changes", () => {
    render(<Input placeholder="Typing test" />);
    const input = screen.getByPlaceholderText(
      "Typing test"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");
  });
});
