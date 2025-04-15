import { Locator, Page, expect } from "@playwright/test";

export class CheckoutChecker {
  page: Page;
  confirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmation = page
      .locator("div.orderconfirmation-header")
      .locator("h3");
  }

  async validateCheckout() {
    await this.confirmation.waitFor({ state: "visible" });
    const text = await this.confirmation.innerText();
    expect(text).toContain("Thank you for your order");
  }

  async validateTermsOfSaleDisclaimer(){

  }

  async validatePrivacyPolicyDisclaimer(){
    
  }
}
