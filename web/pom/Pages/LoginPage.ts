import { test, Locator, Page } from "@playwright/test";

export class VsiLoginPage {
  page: Page;
  loginBtn: Locator;
  usernameInput: Locator;
  passwordInput: Locator;
  searchbox: Locator;
  foodMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole("button", { name: "Sign in" });
    this.usernameInput = page.locator("input[name='username']");
    this.passwordInput = page.locator("input[type='password']");
    this.searchbox = page.getByRole("searchbox", { name: "Search" });
    this.foodMenu = page.getByRole("link", { name: "Food", exact: true });
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.VSIURL!);
  }

  async loginVsica() {
    if (await this.loginBtn.isVisible()) {
      await this.usernameInput.fill(process.env.VSICAUsername!);
      await this.passwordInput.fill(process.env.VSICAPassword!);
      await this.loginBtn.click();
      await this.foodMenu.waitFor({ state: "visible" });
    }
  }
}
