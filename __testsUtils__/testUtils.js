import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";

export function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: /en/i,
  });
  userEvent.click(langButton);
}
