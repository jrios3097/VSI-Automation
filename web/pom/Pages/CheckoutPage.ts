import { test, Locator, Page } from "@playwright/test";

export class CheckoutVSICA {
  page: Page;
  foodMenu: Locator;
  allFoodMenu: Locator;
  product: Locator;
  addToCartBtn: Locator;
  viewCartBtn: Locator;
  goToCheckoutBtn: Locator;
  shippingMethodBtn: Locator;
  cartTitle: Locator;
  shippingAddressTitle: Locator;
  shippingAddressBtn: Locator;
  shippingMethodTitle: Locator;
  paymentBtn: Locator;
  paymentTitle: Locator;
  placeOrderBtn: Locator;
  confirmation: Locator;
  productElement: Locator;
  petDetails: Locator;
  petSelect: Locator;
  removeItem: Locator;

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
    this.goToCheckoutBtn = page
      .locator(".orderSummaryContainer")
      .locator(".totals-buttons")
      .locator(".cart-totals-container")
      .locator("input[value='Go to Checkout']");
    this.shippingMethodBtn = page.getByRole("button", {
      name: "Shipping method",
    });
    this.cartTitle = page.getByRole("heading", { name: "Your Cart" });
    this.shippingAddressTitle = page
      .locator("#ship_info")
      .getByText("Shipping address");
    this.shippingAddressBtn = page.getByRole("button", {
      name: "Shipping address",
    });
    this.shippingMethodTitle = page
      .locator("#shippingRatesContainer")
      .getByText("Shipping method");
    this.paymentBtn = page.getByRole("button", { name: "Payment" });
    this.paymentTitle = page
      .locator("#payment-column")
      .getByText("Payment", { exact: true });
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
    this.confirmation = page.getByRole("heading", {
      name: "Thank you for your order",
    });
    this.productElement = page.locator(".productBrowseContainer").locator("a");
    this.petDetails = page
      .locator("#pet-details-column")
      .getByText("Pet Details");
    this.petSelect = page.locator("div.petArea").first().locator("select");
    this.removeItem = page.locator("button[title='remove item']");
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

  async cleanCart() {
    const contador = await this.removeItem.count();
    console.log("Encontrados: " + contador);
  }

  async addToCart() {
    await this.addToCartBtn.waitFor({ state: "visible" });
    await this.addToCartBtn.click();
    await this.viewCartBtn.waitFor({ state: "visible" });
    await this.viewCartBtn.click();
    await this.page.waitForLoadState("networkidle");
    await this.cartTitle.waitFor({ state: "visible" });
  }

  async selectPet(petName: String) {
    await this.page.waitForLoadState("networkidle");
    let petDetailsTitle = await this.petDetails;
    if (await petDetailsTitle.isVisible) {
      await this.page.waitForLoadState("networkidle");
      await this.petSelect.waitFor({ state: "visible" });
      await this.petSelect.selectOption({ label: `${petName.toString()}` });
      await this.shippingAddressBtn.click();
    } else {
      return true;
    }
  }

  async goToCheckout() {
    await this.goToCheckoutBtn.waitFor({ state: "visible" });
    await this.goToCheckoutBtn.scrollIntoViewIfNeeded();
    await this.goToCheckoutBtn.click({ force: true });
  }

  async completeCheckout() {
    await this.shippingAddressTitle.waitFor({ state: "visible" });
    await this.shippingMethodBtn.waitFor({ state: "visible" });
    await this.shippingMethodBtn.click();
    await this.shippingMethodTitle.waitFor({ state: "visible" });
    await this.paymentBtn.waitFor({ state: "visible" });
    await this.paymentBtn.click();
    await this.paymentTitle.waitFor({ state: "visible" });
    await this.placeOrderBtn.waitFor({ state: "visible" });
    await this.placeOrderBtn.scrollIntoViewIfNeeded();
    await this.placeOrderBtn.click({ force: true });
    await this.confirmation.waitFor({ state: "visible" });
  }
}
