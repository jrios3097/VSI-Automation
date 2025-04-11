import { test, expect } from "@playwright/test";
import { CheckoutVSICA } from "../pom/Pages/CheckoutPage";

test.describe("Vetsource international Canada", () => {
  test.only(
    "Clean cart",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      // await page.goto(process.env.VSIHome!);
      await page.goto("https://cavca.international.devstack.vetsource.dev/shoppingCartView.pml");
      await page.pause();
      const checkoutPage = await new CheckoutVSICA(page);
      await checkoutPage.cleanCart();
    }
  );
  test(
    "Complete checkout with a Non-RX product",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      await page.goto(process.env.VSIHome!);
      const checkoutPage = await new CheckoutVSICA(page);
      await checkoutPage.goToProducts();
      const product = process.env.nonRXProduct!;
      await checkoutPage.searchProduct(product);
      await checkoutPage.completeCheckout();
    }
  );
  test(
    "Complete checkout with a RX product",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      await page.goto(process.env.VSIHome!);
      const checkoutPage = await new CheckoutVSICA(page);
      await checkoutPage.goToProducts();
      const product = process.env.RXProduct!;
      await checkoutPage.searchProduct(product);
      await checkoutPage.goToCheckout();
      const petName = process.env.pet!;
      await checkoutPage.selectPet(petName);
      await checkoutPage.completeCheckout();
    }
  );
});
