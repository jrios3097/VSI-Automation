import { test, Locator, Page } from "@playwright/test";

export class CartVSICA {
  page: Page;
  foodMenu: Locator;
  allFoodMenu: Locator;
  product: Locator;
  addToCartBtn: Locator;
  viewCartBtn: Locator;
  productElement: Locator;
  cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.foodMenu = page
      .locator("nav.kb-navbar-categories")
      .locator("ul.kb-navbar-categories-items")
      .locator("div.navOptionMenuLevel1")
      .locator("li[data-cat='Food']")
      .locator("a[data-category='Food']");
    this.allFoodMenu = page.getByRole("link", { name: "All Food" });
    this.product = page.locator(".productBrowseContainer").first();
    this.addToCartBtn = page.locator("button#actionButtonAddToCart");
    this.viewCartBtn = page.getByRole("button", { name: "View Cart" });
    this.productElement = page.locator(".productBrowseContainer").locator("a");
    this.cartTitle = page.getByRole("heading", { name: "Your Cart" });
  }

  async goToProducts() {
    const dropdown = await this.foodMenu.boundingBox();
    if (dropdown) {
      await this.page.mouse.move(dropdown.x, dropdown.y, { steps: 20 });
    }
    await this.allFoodMenu.waitFor({ state: "visible" });
    await this.allFoodMenu.click();
  }

  async searchProduct(product: string) {
    await this.page.waitForLoadState("networkidle");
    for (let i = 0; i < (await this.productElement.count()); i++) {
      const elementText = await this.productElement
        .nth(i)
        .locator("div[data-product-container='category']")
        .locator(".product-card__info-wrapper")
        .locator("p.product-title");
      const productText = await elementText.textContent();
      if (await productText?.includes(product)) {
        await this.productElement.nth(i).click();
        await this.addToCart();
      }
    }
  }

  async addToCart() {
    await this.addToCartBtn.waitFor({ state: "visible" });
    await this.addToCartBtn.click();
    await this.viewCartBtn.waitFor({ state: "visible" });
    await this.viewCartBtn.click();
    await this.page.waitForLoadState("networkidle");
    await this.cartTitle.waitFor({ state: "visible" });
  }
}
