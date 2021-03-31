const playwright = require('playwright');
const process = require('process');

(async () => {
  // start する前に config を read する。node だからできること。
  // ほかコマンドラインのパラメーターの受け渡しも可能
  // inputjson, url, user, password, browsers, --head, --notification
  // repository でまとめて管理
  let inputjson = ''
  let headlessflag = true
  let baseURL = ''
  let user = ''
  let userpassword = ''
  let notification = false
  let tryBrowserTypes = ''

  for (let i = 0; i < process.argv.length; i++) {
    let arg = process.argv[i];
    console.log(arg);
    if (arg.includes('inputjson')) {
      inputjson = arg.split("=")[1];
      console.log(inputjson)
    }
    if (arg.includes('url')) {
      baseURL = arg.split("=")[1];
    }
    if (arg.includes('user')) {
      user = arg.split("=")[1];
    }
    if (arg.includes('password')) {
      userpassword = arg.split("=")[1];
    }
    if (arg.includes("--head")) {
      headlessflag = false;
    }
    if (arg.includes("--notification")) {
      notification = true;
    }
    if (arg.includes("browsers")) {
      tryBrowserTypes =  arg.split("=")[1]
    }
  }

  if (inputjson !== '') {
    let fileContents = fs.readFileSync(inputfile, 'utf8');
    let config = JSON.parse(fileContents);
    baseURL = config.initialurl
    user = config.user
    userpassword = config.userpassword
    notification = config.notification
  }

  browserTypes = tryBrowserTypes.split(",")

  const { hostname } = new URL(baseURL)
  console.log(hostname)

  for (const browserType of browserTypes){
      let scshocnt = 0
      const browser = await playwright[browserType].launch({
      headless: headlessflag,
      slowMo: 3000
      })
    
      const context = await browser.newContext({
      locale: 'ja-JP',
      ignoreHTTPSErrors: true
      })

      const page = await context.newPage()
    
    const navigationPromise = page.waitForNavigation()
    
    await page.goto(baseURL+'/home/')
    await page.route(baseURL + 'sharing/rest/oauth2/authorize?client_id=arcgisonline&display=default&response_type=token&state=%7B%22returnUrl%22%3A%22' + baseURL+'%2Fhome%2Findex.html%22%2C%22useLandingPage%22%3Afalse%7D&expiration=20160&locale=ja&redirect_uri='+ baseURL + '%2Fhome%2Faccountswitcher-callback.html&force_login=false&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri&redirectToUserOrgUrl=true' + baseURL + '/home/', route => route.abort());
  
    // Click text="OK"
    await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
    scshocnt += 1;

    // ログインメッセージがある場合
    if (notification) {
        await page.click('text="OK"');
    }

    await page.waitForSelector('.js-flat-section > #loginPanel > #oauth #user_username')
    await page.click('.js-flat-section > #loginPanel > #oauth #user_username')
    
    await page.fill('.js-flat-section > #loginPanel > #oauth #user_username', user)
    
    await page.waitForSelector('.js-flat-section > #loginPanel > #oauth #user_password')
    await page.click('.js-flat-section > #loginPanel > #oauth #user_password')
    await page.fill('.js-flat-section > #loginPanel > #oauth #user_password', userpassword)

    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    await page.waitForSelector('.js-flat-section > #loginPanel > #oauth #signIn')
    await page.click('.js-flat-section > #loginPanel > #oauth #signIn')
    
    await navigationPromise
    
    await navigationPromise
    
    await page.waitForSelector('.esri-header-apps > #esri-header-apps-control > span > span > .esri-header-apps-image')
    await page.click('.esri-header-apps > #esri-header-apps-control > span > span > .esri-header-apps-image')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('div > .esri-header-apps > .block:nth-child(13) > .appLink > .appIconImage')
    ])

    await navigationPromise
    
    await navigationPromise

    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='ワークブック' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'ワークブック\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='モデル' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'モデル\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='データセット' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'データセット\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='接続' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'接続\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='ページ' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'ページ\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //div[normalize-space(.)='テーマ' and normalize-space(@role)='link']
    await newPage.click('//div[normalize-space(.)=\'テーマ\' and normalize-space(@role)=\'link\']');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;
    
    // Click span[role="application"] div[role="link"]
    await newPage.click('span[role="application"] div[role="link"]');
    await newPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click img[alt="ヘルプ"]
    await newPage.click('img[alt="ヘルプ"]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click text="Insights について"
    await newPage.click('text="Insights について"');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click img[alt="閉じる"]
    await newPage.click('img[alt="閉じる"]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click img[alt="ヘルプ"]
    await newPage.click('img[alt="ヘルプ"]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click text="Insights へようこそ"
    await newPage.click('text="Insights へようこそ"');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
    await newPage.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
    await newPage.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
    await newPage.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
    await newPage.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
    await newPage.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');
    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Click text="完了"
    await newPage.click('text="完了"');

    await newPage.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true })
    scshocnt += 1;

    // Close page
    await newPage.close();
    await page.close();

    // ---------------------
    await context.close();
    await browser.close();
  }
})()
