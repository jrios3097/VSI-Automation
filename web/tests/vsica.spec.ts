import { test, expect } from "@playwright/test";
import { CheckoutVSICA } from "../pom/Pages/CheckoutPage";
import { CartVSICA } from "../pom/Pages/CartPage";
import { CheckoutChecker } from "../pom/Checker/CheckoutCheker";

test.describe("Vetsource international Canada", () => {
  test(
    "Complete checkout with a Non-RX product",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      await page.goto(process.env.VSIHome!);
      const checkoutPage = await new CheckoutVSICA(page);
      const cartPage = await new CartVSICA(page);
      const checkoutChecker = await new CheckoutChecker(page);
      await cartPage.cleanCart();
      await cartPage.goToProducts();
      const product = process.env.nonRXProduct!;
      await cartPage.searchProduct(product);
      await checkoutPage.goToCheckout();
      await checkoutPage.completeCheckout();
      await checkoutChecker.validateCheckout();
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
      const checkoutChecker = await new CheckoutChecker(page);
      await cartPage.cleanCart();
      await cartPage.goToProducts();
      const product = process.env.RXProduct!;
      await cartPage.searchProduct(product);
      await checkoutPage.goToCheckout();
      const petName = process.env.pet!;
      await checkoutPage.selectPet(petName);
      await checkoutPage.completeCheckout();
      await checkoutChecker.validateCheckout();
    }
  );
  test.only(
    "Payment method disclaimer regarding Terms of Sale & privacy policy",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      await page.goto(process.env.VSIHome!);
      const checkoutPage = await new CheckoutVSICA(page);
      const cartPage = await new CartVSICA(page);
      const checkoutChecker = await new CheckoutChecker(page);
      await cartPage.cleanCart();
      await cartPage.goToProducts();
      const product = process.env.nonRXProduct!;
      await cartPage.searchProduct(product);
      await checkoutPage.goToCheckout();
      await checkoutPage.goToShippingMethodScreen();
      await checkoutPage.goToPaymentScreen();
      
    }
  );
});
