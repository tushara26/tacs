const awsCognito = require("amazon-cognito-identity-js");

// IDと更新トークン（Refresh Token）
const ID = "tac@fideltech.com";
const REFRESH_TOKEN = "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.S3-OIFv9ttI5u18cgrC-Ql-TpCD-hMvOHwfGF9R6EeMvr8ohJOgLnoilLstBuxZ1azabZ8gGJIdoh6ONy0SwxV1dM4KFcB3CDlKyeZVZbP1ca01mjlbtXaWR0fhUTOcc7h_wvpmpORapstn6R5Uq1r3eo8tBiGETUlc-lJ1hx-5h9kp2_TOkOI8HdX2dGN-MIlgxyXV80xp9uB2j11BDcmURij-p8Psz5XaM0hRtAvuD1Kjf0zp6pjKewakFwwSeOMEwEB7U7_QQMFWu1-_YJ56vXaJOSq6qyBhKCqAkoyj66rTkO3k-YqNVCFt0cy2NQ9oY1dpBAvRTsx8hprfhlw.aanvCL49WU3j_EEy.wnvZIkUClEVBxOZ6WwCm8_H_W3KlFij7uPrdncHKMsvw6GJpukny3UbHNwlc_LOuzmxsXN-5Zv8d6m19CRdRT3J1z-VncfpBDmOHOVORq2q5x159clYpMEDrMoHSn-H8bSoDmDVtE2dIRWeocVEqqf0cKvZtnSfmc77zYRFTT_H0jmHTkvM4UbJ2ve4jrcb-EFOztE3opV8aU1A5rZJyMbdDLXtmWuKxugLEOjcBj5OFm3J-2WVteyoP_5U4Q7R9V2vWPM9ACBXPff9VF-FBqNXysrYA3ymzEYD9LayyZFAr4NIvTRabVAYDUXgbDt1FISicipRo9eHBGM9uKNjw3FJYAkpy6M1cCUc2HNciYrNoA7zQgD7l_5NUr_JhiC9Db2F37ibIzI5DXZprEc2dWbd5m6SsM3JA4mHinjT930rSabIRzbETlLp3r7W4nKM6k9lzJGjEGCF6QdmUPU7aUFkyguCvtY31sJCm2lrtC0JvDPSNuYFo7B1PNUXBEUgSqwYCUD6WIDdQ84CFHEI6XwGfGo1X-jlCDUUHolLrw6rZ9lakNrU6iilb13RNLj2fMJ_tPA42hwgqzZAA_JtGqv3RUJPU6i8cqAfrX5mkB1hWYvGG60C6d5Mw6zTIrTXX6C5uHLdhsV-aUQ70pJvGzk56z4Y6rGJiDAbwPJhBShfhpdJJMtP3SljblfvoT5zf0XyRO5vEAMZLoyveARQd-hbKNdrJa3_fs2N1SwLrTrmZnHvPiqoJ0TMns9Z-4BJezjVBXQjpFdbhJuhnBzdcU3elmeLZ6UcfewwfvMA9mV_xa0Z2byXe5EiziN3HWRyrwLU3pqJpgcWfg7OhlfgxtQdjBANSigj03YJpfxNdccmEGtelDx1YSRc0HmHkA8KNoeq2PQsV1a3WK7OifBmVb2-SrFCIh_HSzBQ3Qz_IK31J4oYmJoSliau0U9hncwWJaeEm94H6paVebbIJymsrKMdiDySF6kMoZQ_eD1ihI_gBysFHI2RX-oIdCsKTqn3P75xei1--hjUGJqYnq5z_4pc7x-F3YXwwqe3aEk1tLOy9l_Keh0_CwqLHSuPhtTHTn5GaSHNFPvrg9h7HJuArpMop6U0WCRdUYToaL_3BxqSAuDpaKlsb433ZZw2Rc3DU0UFuNhi7OnjIFVRt7y8geEsg3E8Ea3mNZLsiaeXdjsAsv3Wjo3XmNQc8DYJV-6Tc4H6CjOojyLI28De-JjBk6Ipzh_1m1ms14hUfi0bxY1MioPNYYdzMAqVOz2U2P4kMKa9HNsHs697mgCtETD6MeCiFjNgU99Os3BgsInctNpE5dSJskl21ah-fAmg.Pgsx7-1DRJWNyiYt5ibL2A";

// ユーザープール設定
const userPool = new awsCognito.CognitoUserPool({
	UserPoolId: "us-west-2_NqkuZcXQY",
	ClientId: "4l9rvl4mv5es1eep1qe97cautn",
});

// ユーザー決定
const cognitoUser = new awsCognito.CognitoUser({
	Username: ID,
	Pool: userPool,
});

// Refresh Tokenの設定
const cognitoRefreshToken = new awsCognito.CognitoRefreshToken({
  	RefreshToken: REFRESH_TOKEN,
});

// ユーザープール／ユーザー／更新トークンを使ってIDトークンを再取得
cognitoUser.refreshSession(cognitoRefreshToken, (err, result) => {
	if (err) throw err;
	// 成功時
	// 認証完了トークンを取得。以降はこのトークンで認証済み確認
	console.log("Cognito Access Token : " + result.getAccessToken().getJwtToken());
	console.log("\nClaris ID Token : " + result.idToken.jwtToken);
	console.log("\nClaris ID Refresh Token : " + result.refreshToken.token);
});