import { test, expect } from "@playwright/test";
import { CheckoutVSICA } from "../pom/Pages/CheckoutPage";

test.describe("Vetsource international Canada", () => {
  test(
    "Login",
    {
      tag: "@vsica",
    },
    async ({ page }) => {
      await page.goto(process.env.VSIHome!);
      const checkoutPage = await new CheckoutVSICA(page);
      await checkoutPage.addToCart();
      
    }
  );
});
