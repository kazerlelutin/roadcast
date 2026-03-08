import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'bun:test';
import { routerState } from './router.state';

Given('the application is loaded', async function () {

  // test for pass in context
  this.apiUrl = 'test444'
  // Application is already loaded in the browser
});

Given('the router is initialized', async function () {
  expect(routerState).toBeDefined();
  expect(routerState.currentPage).toBe('/');
});

When('I visit the home page', async function () {
  routerState.currentPage = '/';
});

Then('I should see the home page content', async function () {
  const template = document.getElementById('home-template');
  expect(template).toBeDefined();
});

Then('the page title should be {string}', async function (title: string) {
  expect(document.title).toBe(title);
});

Then('the URL should be {string}', async function (url: string) {
  expect(window.location.pathname).toBe(url);
});

When('I click on the {string} link', async function (linkText: string) {
  const link = document.querySelector(`a[href*="${linkText.toLowerCase()}"]`) as HTMLAnchorElement;
  expect(link).toBeDefined();
  link?.click();
});

Then('the history should be updated', async function () {
  expect(window.history.state).toBeDefined();
});
