import { test, expect } from "@playwright/test";
import { CheckoutVSICA } from "../pom/Pages/CheckoutPage";
import { CartVSICA } from "../pom/Pages/CartPage";

test.describe("Vetsource international Canada", () => {
  test.skip(
    "Clean cart",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      // await page.goto(process.env.VSIHome!);
      await page.goto(
        "https://cavca.international.devstack.vetsource.dev/shoppingCartView.pml"
      );
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
      const cartPage = await new CartVSICA(page);
      await cartPage.goToProducts();
      const product = process.env.nonRXProduct!;
      await cartPage.searchProduct(product);
      await checkoutPage.goToCheckout();
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
      const cartPage = await new CartVSICA(page);
      await cartPage.goToProducts();
      const product = process.env.RXProduct!;
      await cartPage.searchProduct(product);
      await checkoutPage.goToCheckout();
      const petName = process.env.pet!;
      await checkoutPage.selectPet(petName);
      await checkoutPage.completeCheckout();
    }
  );
});
