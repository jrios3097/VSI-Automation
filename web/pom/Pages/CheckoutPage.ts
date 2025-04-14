import { test, Locator, Page } from "@playwright/test";

export class CheckoutVSICA {
  page: Page;
  goToCheckoutBtn: Locator;
  shippingMethodBtn: Locator;
  shippingAddressTitle: Locator;
  shippingAddressBtn: Locator;
  shippingMethodTitle: Locator;
  paymentBtn: Locator;
  paymentTitle: Locator;
  placeOrderBtn: Locator;
  confirmation: Locator;
  petDetails: Locator;
  petSelect: Locator;
  removeItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToCheckoutBtn = page
      .locator(".orderSummaryContainer")
      .locator(".totals-buttons")
      .locator(".cart-totals-container")
      .locator("input[value='Go to Checkout']");
    this.shippingMethodBtn = page.getByRole("button", {
      name: "Shipping method",
    });
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
    this.petDetails = page
      .locator("#pet-details-column")
      .getByText("Pet Details");
    this.petSelect = page.locator("div.petArea").first().locator("select");
    this.removeItem = page.locator("button[title='remove item']");
  }

  async cleanCart() {
    const contador = await this.removeItem.count();
    console.log("Encontrados: " + contador);
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
