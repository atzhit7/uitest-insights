const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://insights.arcgis.com/#/
  await page.goto('https://insights.arcgis.com/#/');

  // Click text="サイン イン"
  
  await page.click('text="サイン イン"');
  // assert.equal(page.url(), 'https://www.arcgis.com/sharing/oauth2/authorize?client_id=arcgisInsights&response_type=token&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fwww.arcgis.com%22%7D&expiration=20160&redirect_uri=https%3A%2F%2Finsights.arcgis.com%2F');

  // Fill input[aria-label="ユーザー名"]
  await page.fill('input[aria-label="ユーザー名"]', 'anakano_ej4v');

  // Press Tab
  await page.press('input[aria-label="ユーザー名"]', 'Tab');

  // Fill input[aria-label="パスワード"]
  await page.fill('input[aria-label="パスワード"]', 'noam1125');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://insights.arcgis.com/#' }*/),
    page.press('input[aria-label="パスワード"]', 'Enter')
  ]);

  // Go to https://insights.arcgis.com/#/
  await page.goto('https://insights.arcgis.com/#/');

  // Click text="ワークブック"
  await page.click('text="ワークブック"');

  // Click text=/.*新しいワークブック.*/
  await page.click('text=/.*新しいワークブック.*/');

  page.waitForNavigation();
  // // Go to https://insights.arcgis.com/#/5b67ea6e4fd0461d8b103cfacae91caf
  // await page.goto('https://insights.arcgis.com/#/5b67ea6e4fd0461d8b103cfacae91caf');

  // // Go to https://insights.arcgis.com/#/edit/5b67ea6e4fd0461d8b103cfacae91caf
  // await page.goto('https://insights.arcgis.com/#/edit/5b67ea6e4fd0461d8b103cfacae91caf');

  // Click //div[normalize-space(.)='SharePoint' and normalize-space(@role)='menuitem']
  await page.click('//div[normalize-space(.)=\'SharePoint\' and normalize-space(@role)=\'menuitem\']');

  page.click('text="mydev sharepoint"')

  // // Click text="mydev sharepoint"
  // const [page1] = await Promise.all([
  //   page.waitForEvent('popup'),
  //   page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/dcd6399a-703b-4efb-9193-a625a901d58c/oauth2/v2.0/authorize?response_type=id_token&scope=user.read%20openid%20profile&client_id=d83c947d-c18b-4393-9c0e-615133517239&redirect_uri=https%3A%2F%2Finsights.arcgis.com%2Fmsal-callback.html&state=d2aed92c-4a5b-49b3-a3af-2b35605fc407&nonce=1600569e-0ec5-428c-a66c-f260f3ad779c&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.1.3&client-request-id=d2f72a94-9c48-4a3e-979e-aab3bd45b1e1&response_mode=fragment' }*/),
  // ]);

  const [page1] = await page.waitForEvent('popup');

  // Fill input[aria-label="メール、電話、Skype を入力します。"]
  await page1.fill('input[aria-label="メール、電話、Skype を入力します。"]', 'spodev_admin@laesrij.onmicrosoft.com');

  await page1.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/dcd6399a-703b-4efb-9193-a625a901d58c/oauth2/v2.0/authorize?response_type=id_token&scope=user.read%20openid%20profile&client_id=d83c947d-c18b-4393-9c0e-615133517239&redirect_uri=https%3A%2F%2Finsights.arcgis.com%2Fmsal-callback.html&state=d2aed92c-4a5b-49b3-a3af-2b35605fc407&nonce=1600569e-0ec5-428c-a66c-f260f3ad779c&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.1.3&client-request-id=d2f72a94-9c48-4a3e-979e-aab3bd45b1e1&response_mode=fragment' }*/);
  
  // Fill input[aria-label="spodev_admin@laesrij.onmicrosoft.com のパスワードを入力します"]
  await page1.fill('input[aria-label="spodev_admin@laesrij.onmicrosoft.com のパスワードを入力します"]', 'Natzaoi.1225');

  // Press Enter
  await Promise.all([
    page1.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/dcd6399a-703b-4efb-9193-a625a901d58c/login' }*/),
    page1.press('input[aria-label="spodev_admin@laesrij.onmicrosoft.com のパスワードを入力します"]', 'Enter')
  ]);

  // Click input[type="button"]
  await page1.click('input[type="button"]');
  // assert.equal(page1.url(), 'https://insights.arcgis.com/msal-callback.html#id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJkODNjOTQ3ZC1jMThiLTQzOTMtOWMwZS02MTUxMzM1MTcyMzkiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZGNkNjM5OWEtNzAzYi00ZWZiLTkxOTMtYTYyNWE5MDFkNThjL3YyLjAiLCJpYXQiOjE2MTY1NTc3OTEsIm5iZiI6MTYxNjU1Nzc5MSwiZXhwIjoxNjE2NTYxNjkxLCJhaW8iOiJBVFFBeS84VEFBQUEwSGJTczBXTUlPMzhGaDBwT3RHQkxpdkhUb3V5NHQ3NkU0WDR6Ky9Ub2UvWkpoMjBoVmM2Njk3QkNBbHA3OUFmIiwibmFtZSI6InNwb2Rldi1hZG1pbiIsIm5vbmNlIjoiMTYwMDU2OWUtMGVjNS00MjhjLWE2NmMtZjI2MGYzYWQ3NzljIiwib2lkIjoiMjliYWVlNzQtZGVlOC00ODFjLWI1OTYtNTBkM2I3OGQ2MDAyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic3BvZGV2X2FkbWluQGxhZXNyaWoub25taWNyb3NvZnQuY29tIiwicmgiOiIwLkFYRUFtam5XM0R0dy0wNlJrNllscVFIVmpIMlVQTmlMd1pORG5BNWhVVE5SY2pseEFMUS4iLCJzdWIiOiJuSVlKb21mVkxQRlNnUHRfak1EZG00THRLZzk5Q0pGZ1pQY3hYUTh3R2xVIiwidGlkIjoiZGNkNjM5OWEtNzAzYi00ZWZiLTkxOTMtYTYyNWE5MDFkNThjIiwidXRpIjoiY2NoXy14ZUpJRTJTcV90TFRxaVZBQSIsInZlciI6IjIuMCJ9.Bjp60annVDtz_x-KXdEC1zNBGwFaO_z9odod4i97_6ZeKb33DY3JDCytNuiprYfHx_tdNCe76TaWCd4AQHfU2tE1QPwzv-qYRLrylVhBAD4_Bmc2my9_6rNiY49SWpbs9KfxDLliYlZsHjJ8UyD_dfCv6KdRBrn5UMlGLqCFWxmkiy4I_WSLPiJzWfqYrcaSdF8qcdnm__Cmk_IkZMhccTDW4cePVdAGnvwDCyp3NewGlYi88HFItFfqMIwNo62dUXjZATuk6ta6Q8R2-YssMQfF0HXu920a1lv59X7b9X-LuPA6420lUCImOn31hnCfgLyQDfRLA9jlz1BcDNbqdw&client_info=eyJ1aWQiOiIyOWJhZWU3NC1kZWU4LTQ4MWMtYjU5Ni01MGQzYjc4ZDYwMDIiLCJ1dGlkIjoiZGNkNjM5OWEtNzAzYi00ZWZiLTkxOTMtYTYyNWE5MDFkNThjIn0&state=d2aed92c-4a5b-49b3-a3af-2b35605fc407&session_state=1be4904a-b600-43ea-b5da-bcce6742c34f');

  // Close page
  await page1.close();

  // Click text="EQ"
  await page.click('text="EQ"');

  // Click text="追加"
  await page.click('text="追加"');

  // Click img[alt="データセットを折りたたみ EQ"]
  await page.click('img[alt="データセットを折りたたみ EQ"]');

  // Click //span[normalize-space(@role)='checkbox']/core-icon/img
  await page.click('//span[normalize-space(@role)=\'checkbox\']/core-icon/img');

  // Click img[alt="マップの作成"]
  await page.click('img[alt="マップの作成"]');

  // Click img[alt="折りたたみ"]
  await page.click('img[alt="折りたたみ"]');

  // Click //div[2]/button[normalize-space(@role)='tab']/core-icon
  await page.click('//div[2]/button[normalize-space(@role)=\'tab\']/core-icon');

  // Click text="場所 (単一シンボル)"
  await page.click('text="場所 (単一シンボル)"');

  // Click text="ヒート マップ"
  await page.click('text="ヒート マップ"');

  // Click text="ヒート マップ"
  await page.click('text="ヒート マップ"');

  // Click //iss-style-layer[normalize-space(.)='シンボル設定Shapeシンボル タイプヒート マップ']
  await page.click('//iss-style-layer[normalize-space(.)=\'シンボル設定Shapeシンボル タイプヒート マップ\']');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();