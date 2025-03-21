import { test, Locator, Page } from "@playwright/test";

export class CheckoutVSICA {
  page: Page;
  foodMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.foodMenu = page.getByRole("link", { name: "Food", exact: true });
  }

  async addToCart() {
    await this.foodMenu.waitFor({ state: "visible" });
    await this.foodMenu.hover();
  }
}
