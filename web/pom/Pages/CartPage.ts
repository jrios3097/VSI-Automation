import { test, Locator, Page } from "@playwright/test";

export class CartVSICA{
    page: Page;

    constructor(page:Page){
        this.page = page;
    }
}