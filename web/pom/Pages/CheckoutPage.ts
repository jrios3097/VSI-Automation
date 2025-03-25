import { test, Locator, Page } from "@playwright/test";

export class CheckoutVSICA {
  page: Page;
  foodMenu: Locator;
  allFoodMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.foodMenu = page
      .locator("nav.kb-navbar-categories")
      .locator("ul.kb-navbar-categories-items")
      .locator("div.navOptionMenuLevel1")
      .locator("li[data-cat='Food']")
      .locator("a[data-category='Food']");
    this.allFoodMenu = page.getByRole("link", { name: "All Food" });
  }

  async addToCart() {
    const dropdown = await this.foodMenu.boundingBox();
    if (dropdown) {
      await this.page.mouse.move(dropdown.x, dropdown.y, { steps: 20 });
    }
    await this.allFoodMenu.waitFor({ state: "visible" });
    await this.allFoodMenu.click();
  }
}
