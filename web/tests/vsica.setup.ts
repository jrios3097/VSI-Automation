import { test as setup } from "@playwright/test";
import { VsiLoginPage } from "../pom/Pages/LoginPage";
import path from "path";

const authFile = path.join(
  __dirname,
  "../playwright/.auth/vsica-storageState.json"
);

setup("Login", async ({ page }) => {
  const loginPage = new VsiLoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginVsica();
  await page.context().storageState({ path: authFile });
});
